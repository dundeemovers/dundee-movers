/**
 * Moving Day Checklist tasks and local Dundee council tips.
 */

export const CHECKLIST_PHASES = [
  {
    phase: '4 Weeks Before Move',
    tasks: [
      { id: 't1', text: 'Confirm moving date & book Dundee Movers to secure time slot', category: 'Booking' },
      { id: 't2', text: 'Notify landlord / complete tenancy handover forms', category: 'Admin' },
      { id: 't3', text: 'Begin decluttering room-by-room (donate to local Dundee charities)', category: 'Packing' },
      { id: 't4', text: 'Order heavy-duty packing boxes, bubble wrap, and wardrobe cartons', category: 'Supplies' }
    ]
  },
  {
    phase: '2 Weeks Before Move',
    tasks: [
      { id: 't5', text: 'Notify Dundee City Council for Council Tax update', category: 'Council' },
      { id: 't6', text: 'Update address with GP, bank, DVLA, and Royal Mail redirection', category: 'Admin' },
      { id: 't7', text: 'Arrange parking bay suspension with Dundee Council if in City Centre / West End', category: 'Parking' },
      { id: 't8', text: 'Pack non-essential items (books, off-season clothes, decor)', category: 'Packing' }
    ]
  },
  {
    phase: 'Moving Week & Moving Day',
    tasks: [
      { id: 't9', text: 'Defrost freezer and drain washing machine 24 hours prior', category: 'Appliances' },
      { id: 't10', text: 'Pack "First Night Essential Box" (kettle, mugs, bedding, chargers, toiletries)', category: 'Essentials' },
      { id: 't11', text: 'Take final meter readings (Gas & Electricity) with photos', category: 'Utilities' },
      { id: 't12', text: 'Hand keys over and relax while Dundee Movers crew unloads and positions items', category: 'Moving Day' }
    ]
  }
];
