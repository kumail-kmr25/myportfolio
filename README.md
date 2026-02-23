# Portfolio Monorepo 🚀

A high-performance, engineering-first portfolio architecture. This project has been restructured from a monolithic Next.js app into a robust **npm workspaces monorepo** to support independent scaling, cleaner code separation, and elite performance.

## 📂 Project Structure

The codebase is organized into local workspaces for maximum modularity:

```text
c:/portfolio
├── 📁 apps
│   ├── 📁 frontend      # Next.js 15+ (App Router, UI, Framer Motion)
│   └── 📁 backend       # Express.js (API Logic, Controllers, Middleware)
├── 📁 packages
│   ├── 📁 database      # Prisma Client & MongoDB Schema (Shared)
│   └── 📁 shared        # Zod Schemas & TypeScript Types (Shared cross-stack)
├── 📁 .vscode           # Shared VSCode settings
├── 📄 package.json      # Monorepo root (npm workspaces)
└── 📄 README.md         # You are here
```

### Component Breakdown

*   **`apps/frontend`**: Our primary storefront. Built with React 19 and Next.js, featuring smooth glass-morphism UI and optimized client-side fetching.
*   **`apps/backend`**: A dedicated Express server that handles all heavy lifting, including database orchestration, rate-limiting, and email notifications.
*   **`packages/database`**: The single source of truth for our data layer. Both frontend and backend import this package to ensure Type-Safe database queries.
*   **`packages/shared`**: Houses our Zod validation schemas. This ensures that the frontend and backend strictly adhere to the same data contracts (e.g., Contact forms, Hire requests).

## 🛠️ The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frameworks** | Next.js 15, Express.js |
| **Language** | TypeScript (Strict Mode) |
| **Database** | MongoDB + Prisma ORM |
| **Styling** | Tailwind CSS + Framer Motion |
| **State/Data** | SWR (React Hooks for data fetching) |
| **Validation** | Zod (End-to-end type safety) |

## 🚀 Getting Started

Running the full stack locally is as simple as one command.

1.  **Clone & Install**:
    ```bash
    git clone <your-repo>
    npm install
    ```
2.  **Environment Setup**:
    Copy `.env.example` to `.env` in the root and fill in your credentials.
3.  **Run Development Mode**:
    ```bash
    npm run dev
    ```
    *This runs both the Frontend (Port 3000) and Backend (Port 5000) concurrently.*

## � Engineering Highlights

*   **Zero-Overhead API Port**: All original Next.js API routes were ported to a standalone Express backend for better horizontal scaling.
*   **Performance Hardening**: Optimized re-renders and utilized Next.js 15's advanced caching mechanisms.
*   **Unified Type Safety**: Sharing schemas across workspaces means that if you change a field in the database, the frontend knows immediately—no more broken fetch calls.

---

*Hand-crafted with precision by Kumail Kmr.*
