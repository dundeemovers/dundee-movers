/**
 * Formatter and WhatsApp message builder for itemized move requests with exact address details.
 */

export function formatFullAddress(addrObj) {
  if (typeof addrObj === 'string') return addrObj;
  const parts = [
    addrObj.house ? addrObj.house.trim() : '',
    addrObj.street ? addrObj.street.trim() : '',
    addrObj.city ? addrObj.city.trim() : '',
    addrObj.postcode ? addrObj.postcode.trim().toUpperCase() : ''
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : 'Dundee, Scotland';
}

export function formatInventoryList(items, customNotes) {
  const list = [];
  Object.entries(items).forEach(([name, count]) => {
    if (count > 0) {
      list.push(`${count}x ${name}`);
    }
  });

  if (customNotes && customNotes.trim()) {
    list.push(`Other items: ${customNotes.trim()}`);
  }

  return list.length > 0 ? list.join(', ') : 'General Household Items';
}

export function formatAccessDescription(access) {
  if (!access) return 'Ground Floor / Bungalow (Direct Access)';
  if (typeof access === 'string') return access;

  const floor = access.floor || 'Ground Floor / Bungalow';
  const isGround = floor.includes('Ground') || floor.includes('Bungalow');
  const liftStatus = isGround
    ? 'Direct Access'
    : (access.hasLift ? 'Working Lift Available' : 'Stairs Only (No Lift)');

  let text = `${floor} [${liftStatus}]`;
  if (access.conditions && access.conditions.length > 0) {
    text += ` (Factors: ${access.conditions.join(', ')})`;
  }
  return text;
}

export function generateItemizedWhatsAppLink(state) {
  const itemList = formatInventoryList(state.items, state.customNotes);
  const addons = state.selectedServices.length > 0 ? state.selectedServices.join(', ') : 'Standard Removals Only';

  const pickupFull = formatFullAddress(state.pickupAddr);
  const destFull = formatFullAddress(state.destAddr);

  const pickupAccessStr = formatAccessDescription(state.pickupAccess);
  const destAccessStr = formatAccessDescription(state.destAccess);

  const message =
    `Hello Dundee Movers! I'd like a guaranteed quote for my move:\n\n` +
    `📋 *Move Type:* ${state.moveType}\n` +
    `📍 *COLLECTION ADDRESS:* ${pickupFull}\n` +
    `🏢 *Collection Floor & Access:* ${pickupAccessStr}\n` +
    `🏁 *DELIVERY ADDRESS:* ${destFull}\n` +
    `🏢 *Delivery Floor & Access:* ${destAccessStr}\n` +
    `📅 *Preferred Date:* ${state.moveDate || 'Flexible / Soon'}\n\n` +
    `📦 *Items to Move:*\n${itemList}\n\n` +
    `🛠️ *Additional Services:* ${addons}\n\n` +
    `👤 *Customer:* ${state.userName ? state.userName : 'Customer'} (${state.userPhone ? state.userPhone : 'Via WhatsApp'})`;

  return `https://wa.me/441382932840?text=${encodeURIComponent(message)}`;
}
