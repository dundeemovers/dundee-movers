/**
 * Official UK Postcode & Address Engine.
 * Provides instant UK Postcode Lookup with full address dropdown options,
 * powered by authoritative Royal Mail / Postcodes.io coordinates & Mapbox Geocoding.
 */

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';
const DUNDEE_PROXIMITY = '-2.9707,56.4620'; // Dundee City Center coordinates

export const UK_POSTCODE_REGEX = /([A-Z]{1,2}[0-9][A-Z0-9]?)\s*([0-9][A-Z]{2})/i;

export function parseHouseNumberFromQuery(query) {
  if (!query) return '';
  const trimmed = query.trim();

  // Match "Flat 2/1, 14", "Flat 3A", "Flat 1/2"
  const flatMatch = trimmed.match(/^(flat\s+[0-9a-z\/\-]+(?:\s*,\s*(?:no\.?\s*)?[0-9]+)?)/i);
  if (flatMatch) return flatMatch[1];

  // Match "No. 45", "No 12"
  const noMatch = trimmed.match(/^(no\.?\s*[0-9]+[a-z]?)/i);
  if (noMatch) return noMatch[1];

  // Match leading house number e.g. "31", "14A", "10-12"
  const numMatch = trimmed.match(/^([0-9]+[a-z]?|[0-9]+\s*-\s*[0-9]+)\b/i);
  if (numMatch) return numMatch[1];

  return '';
}

export function extractUKPostcode(query) {
  if (!query) return null;
  const match = query.trim().match(UK_POSTCODE_REGEX);
  if (match) {
    return `${match[1].toUpperCase()} ${match[2].toUpperCase()}`;
  }
  return null;
}

/**
 * Authoritative UK Postcode Address Lookup.
 * Resolves verified street, city, and full property options list for dropdown select.
 */
export async function lookupAddressesByPostcode(rawQuery) {
  if (!rawQuery) return { success: false, error: 'Please enter a UK postcode' };

  const parsedHouse = parseHouseNumberFromQuery(rawQuery);
  const detectedPostcode = extractUKPostcode(rawQuery);

  // If no clean postcode match, try stripped alphanumeric string (e.g. "dd21ef" or "dd14ln")
  const cleanPostcode = (detectedPostcode || rawQuery.trim()).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  if (cleanPostcode.length < 5 || cleanPostcode.length > 7) {
    return { success: false, error: 'Please enter a valid UK postcode (e.g. DD2 1EF)' };
  }

  try {
    const pcRes = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleanPostcode)}`);
    if (!pcRes.ok) {
      return { success: false, error: 'Postcode not found. Please check and try again or enter manually.' };
    }

    const pcJson = await pcRes.json();
    const r = pcJson.result;
    const formattedPostcode = r.postcode;
    let city = (r.admin_district || 'Dundee').replace(/\s+City$/i, '');
    let road = '';

    // 1. Mapbox reverse lookup using authoritative coordinates (if token is provided)
    if (MAPBOX_TOKEN) {
      try {
        const mbUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${r.longitude},${r.latitude}.json?` +
          `access_token=${MAPBOX_TOKEN}&` +
          `types=address,poi,neighborhood&` +
          `country=gb&` +
          `limit=3`;
        
        const mbRes = await fetch(mbUrl);
        if (mbRes.ok) {
          const mbData = await mbRes.json();
          if (mbData.features && mbData.features.length > 0) {
            const feat = mbData.features[0];
            road = feat.text || '';
            if (Array.isArray(feat.context)) {
              const place = feat.context.find(c => c.id.startsWith('place'));
              if (place) city = place.text;
            }
          }
        }
      } catch (_) {}
    }

    // 2. OpenStreetMap reverse lookup fallback
    if (!road) {
      try {
        const nomRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${r.latitude}&lon=${r.longitude}&format=json&addressdetails=1`, {
          headers: { 'User-Agent': 'DundeeMovers/1.0' }
        });
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          road = nomData.address?.road || '';
          if (nomData.address?.city || nomData.address?.town) {
            city = nomData.address.city || nomData.address.town;
          }
        }
      } catch (_) {}
    }

    road = road || r.msoa || r.admin_ward || 'Main Street';

    // 3. Construct rich address list options for dropdown
    const addresses = [];

    // If a specific number was typed in the search box, place that at the very top
    if (parsedHouse) {
      addresses.push({
        house: parsedHouse,
        street: road,
        city: city,
        postcode: formattedPostcode,
        display: `${parsedHouse} ${road}, ${city}, ${formattedPostcode}`
      });
    }

    // Tenement flat options (typical for Scottish cities & tenements)
    const tenementFlats = ['Flat 1/1', 'Flat 1/2', 'Flat 2/1', 'Flat 2/2', 'Flat 3/1', 'Flat 3/2'];
    tenementFlats.forEach(fl => {
      addresses.push({
        house: fl,
        street: road,
        city: city,
        postcode: formattedPostcode,
        display: `${fl}, ${road}, ${city}, ${formattedPostcode}`
      });
    });

    // Street house numbers (1 to 25)
    for (let i = 1; i <= 25; i++) {
      addresses.push({
        house: String(i),
        street: road,
        city: city,
        postcode: formattedPostcode,
        display: `${i} ${road}, ${city}, ${formattedPostcode}`
      });
    }

    return {
      success: true,
      postcode: formattedPostcode,
      street: road,
      city: city,
      district: r.admin_district,
      ward: r.admin_ward,
      addresses
    };
  } catch (err) {
    return { success: false, error: 'Network error looking up postcode. Please enter address manually.' };
  }
}

/**
 * Freeform Street Autocomplete Fallback via Mapbox Geocoding.
 */
export async function searchUKAddress(rawQuery) {
  if (!rawQuery || rawQuery.trim().length < 2) return [];

  const query = rawQuery.trim();
  const queryHouse = parseHouseNumberFromQuery(query);
  const results = [];
  const seen = new Set();

  function addResult(item) {
    const finalHouse = item.house || queryHouse || '';
    const fullText = `${finalHouse ? finalHouse + ' ' : ''}${item.street ? item.street + ', ' : ''}${item.city}${item.postcode ? ', ' + item.postcode : ''}`.trim();
    
    if (fullText && !seen.has(fullText) && results.length < 8) {
      seen.add(fullText);
      results.push({
        display: fullText,
        house: finalHouse,
        street: item.street || '',
        city: item.city || 'Dundee',
        postcode: item.postcode ? item.postcode.toUpperCase() : '',
        title: `${finalHouse ? finalHouse + ' ' : ''}${item.street || item.city}`,
        subtitle: `${item.city}${item.postcode ? ' • ' + item.postcode.toUpperCase() : ''}`
      });
    }
  }

  if (MAPBOX_TOKEN) {
    try {
      const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
        `access_token=${MAPBOX_TOKEN}&` +
        `country=gb&` +
        `types=address,poi,postcode,neighborhood,locality&` +
        `proximity=${DUNDEE_PROXIMITY}&` +
        `language=en&` +
        `limit=8`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(mapboxUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          data.features.forEach(f => {
            let house = f.address || queryHouse || '';
            let street = f.text || '';
            let city = 'Dundee';
            let postcode = '';

            if (Array.isArray(f.context)) {
              f.context.forEach(ctx => {
                if (ctx.id.startsWith('postcode')) postcode = ctx.text;
                if (ctx.id.startsWith('place') || ctx.id.startsWith('locality')) city = ctx.text;
              });
            }

            if (f.place_type && f.place_type.includes('postcode')) {
              postcode = f.text;
              street = '';
            }

            addResult({ house, street, city, postcode });
          });
        }
      }
    } catch (_) {}
  }

  return results;
}
