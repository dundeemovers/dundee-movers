/**
 * Smart Move Quote Pricing Engine for Dundee Movers CRM.
 * Calculates transparent, realistic Scottish moving rates based on:
 * - Base callout & vehicle allocation
 * - Estimated volume (m³)
 * - Tenement flight / stair access penalties
 * - Distance estimation
 */

export function calculateSuggestedPrice(lead) {
  let baseRate = 120; // 2-Man team base callout (first 1.5 hours)
  const volume = parseFloat(lead.estimatedVolumeM3) || 10;
  
  // Volume factor: £10 per m³
  const volumeCharge = Math.round(volume * 10);

  // Stair & Tenement factor:
  let stairCharge = 0;
  const pickupFloor = String(lead.pickupFloor || '').toLowerCase();
  const deliveryFloor = String(lead.deliveryFloor || '').toLowerCase();

  // Helper to extract floor count
  function getFloorFlight(floorStr, hasLift) {
    if (hasLift) return 0;
    if (floorStr.includes('1st') || floorStr.includes('first')) return 1;
    if (floorStr.includes('2nd') || floorStr.includes('second')) return 2;
    if (floorStr.includes('3rd') || floorStr.includes('third')) return 3;
    if (floorStr.includes('4th') || floorStr.includes('fourth')) return 4;
    return 0;
  }

  const pickupFlights = getFloorFlight(pickupFloor, lead.pickupLift);
  const deliveryFlights = getFloorFlight(deliveryFloor, lead.deliveryLift);

  stairCharge += pickupFlights * 25; // £25 per flight without lift
  stairCharge += deliveryFlights * 25;

  // Move type multiplier
  const moveType = String(lead.moveType || '').toLowerCase();
  let typeMultiplier = 1.0;
  if (moveType.includes('house') || moveType.includes('3+') || moveType.includes('full')) {
    typeMultiplier = 1.15;
  }

  const calculatedBase = Math.round((baseRate + volumeCharge + stairCharge) * typeMultiplier);
  // Round to nearest £5
  const recommended = Math.round(calculatedBase / 5) * 5;
  const suggestedMin = Math.round((recommended * 0.9) / 5) * 5;
  const suggestedMax = Math.round((recommended * 1.15) / 5) * 5;

  return {
    recommendedPrice: Math.max(140, recommended),
    suggestedMin: Math.max(130, suggestedMin),
    suggestedMax: Math.max(160, suggestedMax),
    breakdown: {
      baseRate,
      volumeCharge,
      stairCharge,
      pickupFlights,
      deliveryFlights
    }
  };
}
