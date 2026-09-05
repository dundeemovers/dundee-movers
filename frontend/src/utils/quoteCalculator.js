/**
 * Dundee Movers Volume Sizing Engine & Vehicle Recommendation Logic.
 * Pure transformation and calculation helpers adhering to AGENTS.md rules.
 */

export const ITEM_VOLUME_MAP = {
  // Living Room
  '3-Seater Sofa': 2.2,
  '2-Seater Sofa': 1.6,
  'Armchair': 0.8,
  'Coffee Table': 0.4,
  'TV & Media Unit': 0.9,
  'Dining Table & Chairs': 2.0,
  'Bookcase': 0.7,

  // Bedroom
  'Double / King Bed': 2.5,
  'Single Bed': 1.4,
  '2-Door Wardrobe': 1.8,
  'Chest of Drawers': 0.9,
  'Bedside Tables': 0.3,
  'Dressing Table': 0.8,

  // Kitchen & Appliances
  'Fridge / Freezer': 1.1,
  'Washing Machine': 0.7,
  'Dishwasher / Tumble Dryer': 0.7,
  'Microwave': 0.1,
  'Kitchen Table': 1.0,

  // Boxes & Luggage
  'Standard Moving Boxes (x10)': 1.5,
  'Large Wardrobe Cartons (x3)': 1.2,
  'Suitcases / Bags': 0.5,
  'Plastic Storage Tubs': 0.4,

  // Specialist & Other
  'Desk & Office Chair': 1.2,
  'Large Mirror / Artwork': 0.3,
  'Exercise Bike / Gym Equipment': 1.0,
  'Garden Furniture / Shed Items': 1.5
};

const MOVE_TYPE_BASE_VOLUMES = {
  'Student Move': 6,
  'Few Heavy Items / Single Furniture': 4,
  'House / Flat Move': 12,
  'Office / Commercial': 20
};

/**
 * Calculates total estimated volume (m3), vehicle sizing recommendation, crew members,
 * and equipment requirements based on inventory and property floor access.
 */
export function calculateMoveVolumeAndVan(items = {}, moveType = 'House / Flat Move', pickupAccess = null, destAccess = null) {
  let calculatedVolume = 0;
  let totalItemCount = 0;

  Object.entries(items).forEach(([itemName, qty]) => {
    if (qty > 0) {
      const unitVol = ITEM_VOLUME_MAP[itemName] || 0.8;
      calculatedVolume += unitVol * qty;
      totalItemCount += qty;
    }
  });

  // If no specific items selected, use realistic baseline for move type
  const baseVolume = MOVE_TYPE_BASE_VOLUMES[moveType] || 10;
  const finalVolumeM3 = totalItemCount > 0 
    ? Math.round(calculatedVolume * 10) / 10 
    : baseVolume;

  const isUpperStairs = (acc) => {
    if (!acc || typeof acc === 'string') return false;
    const floor = acc.floor || '';
    const isGround = floor.includes('Ground') || floor.includes('Bungalow');
    return !isGround && !acc.hasLift;
  };

  const hasAccessChallenge = (acc) => {
    if (!acc || !acc.conditions) return false;
    return acc.conditions.some(c => c.includes('Tenement') || c.includes('Long Carry'));
  };

  const heavyStairClimb = isUpperStairs(pickupAccess) || isUpperStairs(destAccess);
  const stairChallenge = heavyStairClimb || hasAccessChallenge(pickupAccess) || hasAccessChallenge(destAccess);

  let vanRecommendation = '1x 3.5T Luton Box Van with Electric Tail-Lift';
  let crewRecommendation = stairChallenge ? '2–3 Professional Movers' : '2 Professional Movers';
  let vanBadge = '100% Dedicated Vehicle';

  if (finalVolumeM3 <= 7) {
    vanRecommendation = '1x Dedicated Medium Wheelbase (MWB) Van';
    crewRecommendation = stairChallenge ? '2 Professional Movers (Stair Assist)' : '1–2 Professional Movers';
    vanBadge = 'Compact / Express Transit';
  } else if (finalVolumeM3 <= 18) {
    vanRecommendation = '1x 3.5T Long Wheelbase (LWB) High-Roof Van';
    crewRecommendation = stairChallenge ? '2–3 Professional Movers (Stair Equipment)' : '2 Professional Movers';
    vanBadge = 'Ideal for Tenement / 1-2 Bed';
  } else if (finalVolumeM3 <= 34) {
    vanRecommendation = '1x 3.5T Luton Van with Electric Tail-Lift';
    crewRecommendation = stairChallenge ? '3 Professional Movers (Heavy Stairs)' : '2 Professional Movers';
    vanBadge = 'Full House / Large Flat';
  } else {
    vanRecommendation = '2x 3.5T Luton Vans or 7.5T Heavy Lorry';
    crewRecommendation = '3–4 Professional Movers';
    vanBadge = 'Multi-Bedroom / Executive Home';
  }

  const stairEquipmentNote = stairChallenge
    ? 'Specialist Stair Dolly & Heavy Straps Included'
    : 'Standard Removal Equipment Included';

  return {
    volumeM3: finalVolumeM3,
    itemCount: totalItemCount,
    vanRecommendation,
    crewRecommendation,
    vanBadge,
    stairChallenge,
    stairEquipmentNote
  };
}
