import { money } from './utils'

export function normalizePhone(p = '') {
  let d = String(p).replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  if (d.startsWith('0')) d = '92' + d.slice(1)
  return d
}

export const waLink = (number, text) => `https://wa.me/${normalizePhone(number)}?text=${encodeURIComponent(text)}`

export function orderMessage(o, shop = 'MA - Decore') {
  const lines = o.items.map((i) => `• ${i.qty} x ${i.name} = ${money(i.price * i.qty)}`)
  const cod = o.payment.method === 'Cash on Delivery'
  return [
    `🛍️ *NEW ORDER ${o.orderNo}* - ${shop}`,
    '',
    ...lines,
    '',
    `Subtotal: ${money(o.subtotal)}`,
    o.discount ? `Discount (${o.coupon}): -${money(o.discount)}` : null,
    `Delivery: ${o.deliveryFee ? money(o.deliveryFee) : 'FREE'}`,
    `*Total: ${money(o.total)}*`,
    `💳 Payment: ${o.payment.method}${cod ? '' : ' (screenshot will be sent here)'}`,
    '',
    `👤 Name: ${o.customer.name}`,
    `📞 Phone: ${o.customer.phone}`,
    `📍 Address: ${o.customer.address}, ${o.customer.city}`,
    o.customer.location?.link ? `🗺️ Location: ${o.customer.location.link}` : null,
    o.customer.notes ? `📝 Note: ${o.customer.notes}` : null,
  ].filter((x) => x !== null).join('\n')
}

// Optional: free CallMeBot sends a WhatsApp message to the admin automatically
export function autoNotify(text) {
  const phone = import.meta.env.VITE_CALLMEBOT_PHONE
  const key = import.meta.env.VITE_CALLMEBOT_APIKEY
  if (!phone || !key) return
  fetch(`https://api.callmebot.com/whatsapp.php?phone=${normalizePhone(phone)}&text=${encodeURIComponent(text)}&apikey=${key}`, { mode: 'no-cors' }).catch(() => {})
}
