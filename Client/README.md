# Campus Lost & Found

A web app where students post lost and found items with photos, search by keyword, and filter by type.

**Live demo:** https://your-vercel-link
**Backend API:** https://campus-portal-rbir.onrender.com

## Problem
Lost items and notices get buried in WhatsApp groups. This portal gives the campus one searchable place.

## Features
- Register and login with JWT authentication and hashed passwords
- Post lost/found items with photo upload (Cloudinary)
- Search and filter items
- Protected routes for logged-in users

## Tech stack
HTML, CSS, JavaScript, Bootstrap | Node.js, Express | MongoDB Atlas | Cloudinary | Render, Vercel

## Run locally
1. `cd server && npm install`
2. Create `server/.env` with MONGO_URI, JWT_SECRET, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
3. `npm run dev`, then open `client/index.html` with Live Server