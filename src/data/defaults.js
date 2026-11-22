export const DATA_VERSION = 1

export const DEFAULT_SETTINGS = {
  id: 'main',
  dataVersion: DATA_VERSION,
  name: 'MA - Decore',
  tagline: 'Handmade by hand, styled with heart',
  whatsapp: '923066152324',
  phone: '0306 3162324',
  email: 'madecore@gmail.com',
  address: 'Gujranwala, Punjab, Pakistan',
  mapQuery: 'Gujranwala, Punjab, Pakistan',
  hours: 'Open daily - order anytime on WhatsApp',
  prepTime: '2-5 days',
  deliveryFee: 250,
  freeDeliveryMinItems: 2,
  offerTitle: 'Limited Time Offer',
  offerText: '10% off on all items',
  offerCode: 'HAATH10',
  offerPercent: 10,
  offerEnds: '2026-11-15T23:59:59',
  payment: [
    { label: 'JazzCash', value: '0306 6152324 Salman Haider' },
    { label: 'Easypaisa', value: '0306 6152324 Salman Haider' },
    { label: 'Bank', value: 'Bank name - add IBAN here' },
  ],
  heroTitle: 'Bring handmade art into your home',
  heroSub: 'Crystal table lamps, wooden decoration pieces, wall decor and gifts - every piece is made by hand, with love, in Gujranwala.',
  facebook: '',
  instagram: '',
}

export const DEFAULT_CATEGORIES = [
  { id: 'decoration-pieces', name: 'Decoration Pieces', emoji: '🏺', order: 1 },
  { id: 'table-lamps', name: 'Table Lamps', emoji: '💡', order: 2 },
  { id: 'wall-decor', name: 'Wall Decor', emoji: '🖼️', order: 3 },
  { id: 'gift-items', name: 'Gift Items', emoji: '🎁', order: 4 },
]

const DP = 'decoration-pieces', TL = 'table-lamps', WD = 'wall-decor', GI = 'gift-items'
let n = 0
const p = (id, name, category, price, oldPrice, image, badge, desc, featured = false) => ({
  id: `p${id}`, name: name.trim(), category, price, oldPrice, image, badge, desc, featured, available: true, order: ++n,
})

export const DEFAULT_PRODUCTS = [
  p(1, 'Luxurious Crystal Ring Lamps', TL, 1800, 2200, 'images/products/LuxuriousCrystalRingLamps.png', 'Best Seller', 'A beautiful Golden Crystal Halo Decorative Table Lamp Set, perfect for your home or office.', true),
  p(2, 'Luxury Wooden Carved Crystal Decorative Lamp', TL, 3200, 3800, 'images/products/OrnateCrystalLanternLamp.png', 'Sale', 'Luxury Wooden Carved Crystal Decorative Lamp, ideal for bedrooms and lounges.', true),
  p(3, 'Royal Wooden Tower', DP, 1800, 0, 'images/products/Ornate Wooden Crystal Tower Lantern.png', 'New', 'An elegant handcrafted wooden tower featuring sparkling crystal accents and intricate laser-cut detailing, perfect for adding a royal touch to your home décor.', true),
  p(4, 'Wooden Tree Design Key Holder', WD, 1200, 1500, 'images/products/OrnateWoodenTreehouseKeyRack.png', 'Sale', 'A beautifully handcrafted wooden key holder featuring an intricate tree design, elegant gold accents, and four hooks to keep your keys organized in style.', true),
  p(5, 'Table Lamp Classic', TL, 1800, 0, 'images/products/22.jpeg', '', 'Classic design, soft light and a handmade finish.'),
  p(6, 'Wooden Vanity Mirror', GI, 1200, 0, 'images/products/Rustic RubyInlaidWoodenVanityMirror.png', 'New', 'A stylish handcrafted wooden vanity mirror featuring decorative red accents, a convenient storage drawer, and a shelf for your everyday essentials.', true),
  p(7, 'Wooden Ring Lamps', DP, 1200, 1500, 'images/products/8.jpeg', 'Sale', 'Luxury Wooden Decorative Lamp, ideal for bedrooms and lounges.'),
  p(8, 'Beautiful Gift Box', GI, 1000, 0, 'images/products/12.jpeg', 'Sale', 'A beautiful box for your side table decoration.'),
  p(9, 'Luxury Crystal Gold Table Lamp – Large Size', TL, 2000, 0, 'images/products/101.jpeg', 'Sale', 'Add a touch of luxury to your home with this elegant gold-finished table lamp, featuring sparkling crystal accents and a premium decorative design. Perfect for living rooms, bedrooms, and stylish interiors.'),
  p(10, 'Luxury Crystal Gold Table Lamp – Small Size', TL, 1750, 0, 'images/products/101.jpeg', 'Sale', 'Add a touch of luxury to your home with this elegant gold-finished table lamp, featuring sparkling crystal accents and a premium decorative design. Perfect for living rooms, bedrooms, and stylish interiors.'),
  p(11, 'Crystal Gold Decorative Table Lamp', TL, 1800, 2000, 'images/products/102.jpeg', 'New', 'An elegant gold-finished table lamp featuring sparkling crystal accents and a unique artistic design, perfect for adding luxury and charm to your home décor.'),
  p(12, 'Crystal Gold Table Lamp', TL, 2300, 2500, 'images/products/103.jpeg', 'New', 'A stunning decorative lamp featuring sparkling clear crystals and an elegant gold finish, perfect for adding a luxurious touch to your home décor.'),
  p(13, 'Crystal Glow Gold Table Light', TL, 1850, 2000, 'images/products/105.jpeg', 'Sale', 'Add elegance to your home with this beautiful gold-finish table light, featuring sparkling crystal accents and a stylish modern design. Perfect for bedrooms, living rooms, and bedside tables, it creates a warm and luxurious atmosphere.'),
  p(14, 'Royal Glow Crystal Table Lamp', TL, 2000, 2500, 'images/products/106.jpeg', 'Latest', 'Bring timeless elegance to your home with this beautiful table lamp, featuring a decorative cream-patterned shade, a luxurious golden base, and sparkling crystal accents. Perfect for bedrooms, living rooms, and bedside tables, adding a warm and sophisticated touch to any interior.'),
  p(15, 'Golden Blossom Table Lamp', TL, 2000, 2500, 'images/products/107.jpeg', 'Latest', 'Elegant Royal Gold Crystal Table Lamp with a beautiful golden finish, sparkling crystal accents, and a premium floral-design lampshade. Perfect for bedrooms, living rooms, bedside tables, and stylish home décor. Add a touch of luxury and sophistication to any space.'),
  p(16, 'Crystal Wood Glow Table Lamp', TL, 1200, 1800, 'images/products/108.jpeg', 'Sale', 'Enhance your home décor with this beautiful Wooden Crystal Table Lamp, featuring an elegant floral cut-out design, sparkling crystal hangings, and a stylish silver base. Its warm lighting creates a cozy and attractive atmosphere, making it perfect for bedrooms, bedside tables, and living room décor.'),
  p(17, 'Crystal Wood Glow Rounded Table Lamp', TL, 1200, 1800, 'images/products/109.jpeg', 'Sale', 'Enhance your home décor with this beautiful Wooden Crystal Table Lamp, featuring an elegant floral cut-out design, sparkling crystal hangings, and a stylish silver base. Its warm lighting creates a cozy and attractive atmosphere, making it perfect for bedrooms, bedside tables, and living room décor.'),
  p(18, 'Royal Wood Floral Tissue Box Set', DP, 2000, 2300, 'images/products/110.jpeg', 'Sale', 'Add elegance to your home with this beautifully designed wooden tissue box set, featuring a rich wood finish, stylish floral patterns, and a matching decorative design. Perfect for living rooms, bedrooms, offices, and dining tables. A combination of beauty and functionality that enhances your home décor.'),
  p(19, 'Premium Wooden Quran Rehal Stand with Decorative Box', GI, 1800, 2300, 'images/products/113.jpeg', 'Sale', 'Beautifully crafted wooden Quran rehal stand featuring elegant Arabic calligraphy, intricate floral laser-cut designs, and a rich red finish. A perfect combination of traditional Islamic art and modern craftsmanship, ideal for home prayer spaces, mosques, and gifting on special Islamic occasions.'),
  p(20, 'Premium Wooden Tissue Box Cover', DP, 1300, 1500, 'images/products/114.jpeg', 'Sale', 'Elegant wooden tissue box cover featuring intricate floral cutwork, decorative golden beads, and a beautiful natural wood finish. Its stylish design adds a touch of luxury to your home, office, or living room décor. Perfect for everyday use and gifting.'),
  p(21, 'Big Wooden Naag Lamp', TL, 1700, 2000, 'images/products/111.jpeg', 'New', 'Elegant wooden Naag lamp featuring a rich dark wood finish, intricate laser-cut patterns, and sparkling crystal hangings. Its traditional design and decorative metallic base add a luxurious touch to any home, prayer room, or interior décor. Perfect for festive decoration and gifting.'),
  p(22, 'Wooden Naag Lamp with Crystal Hanging Decorations', TL, 1700, 2000, 'images/products/112.jpeg', 'New', 'Elegant wooden Naag lamp featuring a rich dark wood finish, intricate laser-cut patterns, and sparkling crystal hangings. Its traditional design and decorative metallic base add a luxurious touch to any home, prayer room, or interior décor. Perfect for festive decoration and gifting.'),
]
