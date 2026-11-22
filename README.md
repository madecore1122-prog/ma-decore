# MA - Decore (React + Tailwind + Firebase)

Pages: Home, Shop, Product, Offers, About, Contact, Checkout. Admin dashboard: `/admin`.

## 1) Local chalana
```bash
npm install
npm run dev     # http://localhost:5173
```
Bina Firebase ke "demo mode" chalta hai. Admin: `/admin`, password `admin123`.

## 2) Product images
Apne images ko `public/images/products/` folder me rakhein. Product ki image path aise hoti hai:
`images/products/FILENAME.png` (src/data/defaults.js me aur admin panel me).
Vercel par file name ke capital/small letters bilkul same hone chahiye (e.g. `101.jpeg` aur `101.JPEG` alag hain).
Nayi product image admin panel se "upload" bhi ho sakti hai.

## 3) Firebase (naya project banayein - Al Baik wale se alag)
1. console.firebase.google.com > Create a project (naam: ma-decore). Analytics off kar dein.
2. Databases and storage > Firestore > Create database > Production mode.
3. Firestore > Rules: `firestore.rules` ka content paste kar ke Publish.
4. Security > Authentication > Get started > Email/Password enable. Users > Add user (admin email + password).
5. Project Overview > Add app > Web (</>) > Register. Config ki values `.env` me daalein (`.env.example` ko copy kar ke `.env` banayein).
6. `npm run dev` dobara chalayein, `/admin` par login karein (pehli login par default products save ho jate hain).
7. Admin > Settings me WhatsApp, phone, payment accounts, offer, delivery charges check karein.

## 4) GitHub + Vercel
```bash
git add . && git commit -m "MA Decore" && git push
```
Vercel > Add New > Project > repo Import > Environment Variables me `.env` ki 6 `VITE_FIREBASE_...` values > Deploy.
Phir Firebase > Authentication > Settings > Authorized domains me apna Vercel domain add karein.

## 5) Admin me kya hota hai
Orders (live + sound, payment received, status), Products (add/edit/delete/image), Categories, Settings (offer code, countdown, payments, delivery).
