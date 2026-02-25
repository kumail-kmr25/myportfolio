# Kumail KMR | Portfolio Studio 🚀

A high-performance, engineering-first portfolio architecture. This project is a robust **npm workspaces monorepo** designed for elite performance, technical transparency, and a real-time "Studio" operational experience.

## � Architecture Overview

The codebase is organized into modular workspaces for clean separation of concerns:

```text
c:/portfolio
├── 📁 client            # Next.js 15+ (Unified UI & API Route Handlers)
├── 📁 packages
│   ├── 📁 database      # Prisma Client & PostgreSQL Schema (Shared)
│   └── 📁 shared        # Zod Schemas & TS Types (Shared cross-stack)
├──  package.json      # Monorepo root (npm workspaces)
└── 📄 vercel.json       # Deployment configuration
```

### 🛰️ Unified Logic
*   **The Bridge**: All API logic is hosted within the Next.js App Router, providing a seamless bridge between the database and the frontend with zero-latency overhead.
*   **Centralized Data**: `packages/database` ensures a single source of truth for the PostgreSQL schema, utilized by both the UI and background workers.
*   **Contract-Driven Dev**: `packages/shared` houses Zod schemas, enforcing strict data contracts for every contact submission and admin update.

## 🛠️ The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Database** | PostgreSQL + Prisma ORM |
| **Styling** | Vanilla CSS + Tailwind CSS |
| **Animations** | Framer Motion (High-Fidelity) |
| **State/Data** | SWR (Real-time polling & Cache management) |

## 🌟 Studio Operations (New)

The portfolio now features a "Command Center" suite that provides live insights into the development studio:

1.  **Live Engineering Feed**: A terminal-style activity dashboard in the admin suite that monitors real-time interactions and security heartbeats.
2.  **Smart Capacity Sync**: Automated capacity management that syncs developer availability status based on active project deadlines.
3.  **Technical Decision Timeline**: Transparent engineering logs embedded in projects to document architectural trade-offs.
4.  **System Health Monitor**: Real-time tracking of Database latency, API uptime, and cache health.

## � Development

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Database Migration**:
    ```bash
    npm run db:push
    ```
3.  **Run Dev Loop**:
    ```bash
    npm run dev
    ```

## 🛡️ Admin Security
All administrative actions are protected via **JWT (HTTP-only cookies)** and features a secure **Terminate Session** protocol to ensure state integrity across multiple devices.

---

*Hand-crafted with precision by Kumail Kmr.*

