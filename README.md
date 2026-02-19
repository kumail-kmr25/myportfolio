# Portfolio Website

A modern, responsive portfolio website built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [TypeScript](https://www.typescriptlang.org/). This project showcases my skills, experience, and projects as a Full Stack Developer.

## 🚀 Features

- **Interactive Testimonials**: Client feedback system with real-time updates.
- **Admin Moderation Interface**: Secure dashboard at `/admin` for managing feedback.
- **Full Stack Integration**: Backend API routes with PostgreSQL database.
- **Modern UI/UX**: Clean, minimalist design with dark mode aesthetic.
- **Responsive Layout**: Fully responsive across all devices (mobile, tablet, desktop).
- **Interactive Elements**: Smooth animations using Framer Motion.
- **Project Showcase**: Filterable grid layout for displaying projects.
- **SEO Optimized**: Built with Next.js for optimal performance and SEO.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based session management (`jose`)
- **State Management**: SWR for real-time data fetching
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📂 Project Structure

```bash
├── public/          # Static assets (images, SVGs)
├── src/
│   ├── app/         # Next.js App Router pages
│   ├── components/  # Reusable React components
│   └── ...
├── tailwind.config.ts  # Tailwind configuration
└── ...
```

## 🏁 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Usage

- Update `src/components/About.tsx`, `Hero.tsx`, etc., with your personal information.
- Configure `src/components/Projects.tsx` with your own projects.
- Modify `src/app/robots.ts` and `sitemap.ts` for SEO settings.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
