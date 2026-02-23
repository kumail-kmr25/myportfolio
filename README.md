# Portfolio Website

## About Me
<div style="display:flex; align-items:center; gap:1rem; background:linear-gradient(135deg, #1e3a8a, #3b82f6); padding:1.5rem; border-radius:12px; color:white;">
  <img src="https://github.com/kumailkmr.png" alt="Kumail Kmr" style="width:150px;height:150px;border-radius:50%;object-fit:cover;box-shadow:0 0 15px rgba(0,0,0,0.2);" />
  <div>
    <h3 style="margin:0;">Kumail Kmr</h3>
    <p style="margin:0;">Technical Lead & Full‑Stack Engineer. I build high‑performance SaaS‑style platforms that blend clean architecture, scalability, and delightful user experiences.</p>
  </div>
</div>

## 🚀 Key Features
- **Monorepo Architecture** – Separate `apps/frontend` (Next.js) and `apps/backend` (Express) with shared `packages/database` and `packages/shared`.
- **Premium UI** – Dark‑mode ready, glass‑morphism cards, smooth micro‑animations, and responsive layout built with Tailwind CSS and Framer Motion.
- **Real‑time Data** – SWR powered fetching, optimistic UI updates and server‑side rendering for SEO‑friendly pages.
- **Admin Dashboard** – Secure JWT‑based admin panel for managing projects, testimonials, blog posts, and site statistics.
- **Contact & Hire Forms** – Rate‑limited, XSS‑sanitized, email‑notified endpoints with Zod validation.
- **Performance‑First** – Content‑visibility, skeleton loaders, and automatic image optimization via Next.js.
- **Scalable Backend** – Prisma‑generated MongoDB client, type‑safe shared models, and CORS configuration for cross‑origin API calls.
- **Deploy‑Ready** – Vercel for the frontend, Render for the backend, with environment‑variable management baked in.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15+, TypeScript, Tailwind CSS, Framer Motion, SWR
- **Backend**: Express, TypeScript, Prisma, MongoDB
- **Auth**: JWT, Edge middleware
- **CI/CD**: npm workspaces, concurrently for local dev, Vercel & Render for production

## 📦 Getting Started
```bash
# Install dependencies
npm install

# Run both services locally
npm run dev
```
Open <http://localhost:3000> for the frontend and <http://localhost:5000> for the API.

## 📄 License
MIT
