# Mohand portfolio

Static site (no build step). Public page: `index.html`. Dashboard: `admin.html`.

## 1. Firebase (data + admin login)
1. console.firebase.google.com > create project > add a Web app > copy the config into `firebase-config.js`.
2. Build > Authentication > enable Email/Password > add your admin user.
3. Build > Firestore Database > create (production mode).
4. In `firestore.rules` replace YOUR_ADMIN_EMAIL with that email.
5. Authentication > Settings > Authorized domains: add your Vercel domain.
6. `npm i -g firebase-tools && firebase login && firebase init` (use existing firebase.json) then `firebase deploy --only firestore:rules,hosting`

## 2. GitHub
git init && git add . && git commit -m "init" && git branch -M main
git remote add origin https://github.com/USER/REPO.git && git push -u origin main

## 3. Vercel
Import the GitHub repo at vercel.com/new (Framework: Other, no build command). Every push redeploys.

Without Firebase config the dashboard runs in local demo mode (data stays in your browser only).
