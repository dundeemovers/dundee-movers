/**
 * Coverage & Regional Transit Data
 * Defines regional districts, transit corridors, and operational logistics for Tayside and the UK.
 */

export const COVERAGE_DATA = {
  dundee: {
    title: 'Dundee City & Surrounds (DD1 – DD5)',
    time: '15–30 Mins Local Response • Daily Van Slots',
    corridorPath: '/areas/broughty-ferry',
    corridorLabel: 'Explore Broughty Ferry & DD5 Area Hub ➔',
    districts: [
      { name: 'City Centre & Waterfront (DD1)', notes: 'Customer reserves curb space; high-floor flat stair gear supplied.' },
      { name: 'West End & University (DD2)', notes: 'Specialists in traditional high-floor flats, spiral staircases, and student moves.' },
      { name: 'Stobswell & Coldside (DD3)', notes: 'Fast local transit for traditional flats, terraces, and family homes.' },
      { name: 'Craigie & Pitkerro (DD4)', notes: 'Residential family home relocations, bungalows, and moves to local self-storage.' },
      { name: 'Broughty Ferry & Barnhill (DD5)', notes: 'Multi-bedroom detached villas, coastal seafront properties, and estate packing.' }
    ]
  },
  fife: {
    title: 'Fife, St Andrews & Perth (KY16, KY10 & PH1–PH3)',
    time: '20–35 Mins via Tay Road Bridge (A92)',
    corridorPath: '/areas/st-andrews',
    corridorLabel: 'Explore St Andrews & Fife Area Hub ➔',
    districts: [
      { name: 'St Andrews & University Halls (KY16)', notes: 'Student flat moves, academic relocations, library collections & coastal homes.' },
      { name: 'Tayport & Newport-on-Tay (DD6)', notes: 'Instant cross-river removals directly across the Tay Road Bridge.' },
      { name: 'Cupar & North East Fife (KY15)', notes: 'Country estates, farmhouses, traditional cottages, and village relocations.' },
      { name: 'Perth & Strathmore (PH1 – PH3)', notes: 'Connecting Dundee to Perthshire residential properties and office suites.' }
    ]
  },
  angus: {
    title: 'Angus & Tayside Region (DD7 – DD11)',
    time: '20–40 Mins via A92 / A90 Dual Corridors',
    corridorPath: '/areas/arbroath-angus',
    corridorLabel: 'Explore Arbroath & Angus Area Hub ➔',
    districts: [
      { name: 'Arbroath & Coastal Towns (DD11)', notes: 'Daily removal routes along the A92 corridor for townhouses and harbor flats.' },
      { name: 'Forfar & Strathmore (DD8)', notes: 'Full rural and town house removals with full furniture dismantling & protective packing.' },
      { name: 'Montrose & Brechin (DD10 / DD9)', notes: 'Direct removals connecting Angus to Aberdeen, Stonehaven, and Central Scotland.' },
      { name: 'Carnoustie & Monifieth (DD7 / DD5)', notes: 'Commuter family homes, detached houses, and full household moves.' }
    ]
  },
  ukwide: {
    title: 'Whole UK Express Long-Distance Transit',
    time: 'Direct Non-Shared Door-to-Door Delivery',
    corridorPath: '/routes/dundee-to-london',
    corridorLabel: 'Explore Dundee to London Corridor ➔',
    districts: [
      { name: 'Dundee ➔ London & South England', notes: 'Dedicated direct Luton vans. Your items travel alone with guaranteed next-day delivery.' },
      { name: 'Dundee ➔ Manchester, Leeds & Midlands', notes: 'Express relocations to the Midlands & North West England with zero depot transfers.' },
      { name: 'Dundee ➔ Edinburgh & Lothians', notes: 'Same-day express moves via M90 and Queensferry Crossing (morning load, afternoon delivery).' },
      { name: 'Dundee ➔ Glasgow & Central Belt', notes: 'Direct non-stop transit via A9 and M80 connecting Tayside to Greater Glasgow.' }
    ]
  }
};

/**
 * Evaluates user entered postcodes to return regional coverage details, transit time, and guidance.
 */
export function getPostcodeCoverageResult(inputVal) {
  const clean = (inputVal || '').trim().toUpperCase();
  if (!clean) return null;

  // Dundee Core Zone (DD1 - DD5)
  if (/^DD[1-5](\b|\s|[0-9])/i.test(clean)) {
    return {
      type: 'available',
      badge: '✓',
      title: `Dundee Core Zone (${clean}) — Daily Slots Available!`,
      desc: 'Local response within 15–30 mins. Includes high-floor flat lifting gear and direct curb loading support.',
      ctaText: `Get Quote for ${clean} ➔`
    };
  }

  // Fife & St Andrews Zone
  if (/^(KY16|KY10|KY15|KY14|DD6)/i.test(clean)) {
    return {
      type: 'available',
      badge: '✓',
      title: `North East Fife & St Andrews Zone (${clean}) — Daily Coverage!`,
      desc: '20–35 min direct transit via Tay Road Bridge. University student packages and full family home moving.',
      ctaText: `Get Quote for ${clean} ➔`
    };
  }

  // Angus & Perthshire Zone
  if (/^DD[7-9]|^DD1[0-1]|^PH[1-3]/i.test(clean)) {
    return {
      type: 'available',
      badge: '✓',
      title: `Angus & Perthshire Regional Corridor (${clean}) — Daily Coverage!`,
      desc: 'Daily departures along A90 & A92 corridors. Rural cottages, farmsteads, and town properties.',
      ctaText: `Get Quote for ${clean} ➔`
    };
  }

  // Edinburgh & Lothians
  if (/^EH[0-9]/i.test(clean)) {
    return {
      type: 'uk',
      badge: '🚚',
      title: `Edinburgh & Lothians Express Corridor (${clean}) — Same-Day Runs!`,
      desc: '1 hr 20 min transit via Queensferry Crossing. Morning loading in Dundee, afternoon delivery in Edinburgh.',
      ctaText: `Get Quote for ${clean} ➔`
    };
  }

  // Any other UK Postcode
  if (/^[A-Z]{1,2}[0-9]/i.test(clean)) {
    return {
      type: 'uk',
      badge: '🚚',
      title: `Direct Door-to-Door UK Relocation (${clean}) — Dedicated Non-Stop Run!`,
      desc: 'Your Luton van is 100% exclusive to your home with zero shared courier freight and fully insured transit included.',
      ctaText: `Get Tailored UK Quote for ${clean} ➔`
    };
  }

  return {
    type: 'invalid',
    badge: '⚠️',
    title: 'Invalid Postcode',
    desc: 'Please enter a valid UK postcode (e.g. DD1, DD5, KY16, EH1, SW1).'
  };
}
