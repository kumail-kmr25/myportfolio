export interface PlaygroundChallenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedTime: number;
  xp: number;
  initialCode: string;
  solutionCode: string;
  validationRules: {
    contains?: string[];
    isLengthAtLeast?: number;
  };
  conversionPrompt: string;
}

export const PLAYGROUND_CHALLENGES: PlaygroundChallenge[] = [
  {
    id: "ch-01",
    slug: "responsive-navbar-boss",
    title: "Responsive Navbar Boss",
    description: "Build a premium, high-performance navbar with Framer Motion animations that works on all devices.",
    difficulty: "Intermediate",
    estimatedTime: 20,
    xp: 500,
    initialCode: `"use client";\nimport { m } from "framer-motion";\n\nexport default function Navbar() {\n  return (\n    <nav className="fixed top-0 w-full p-6 backdrop-blur-md">\n      {/* BUILD YOUR NAV HERE */}\n    </nav>\n  );\n}`,
    solutionCode: `"use client";\nimport { m } from "framer-motion";\n\nexport default function Navbar() {\n  return (\n    <nav className="fixed top-0 w-full p-6 backdrop-blur-md flex justify-between items-center">\n      <div className="font-black">CORE_KRNL</div>\n      <m.button whileHover={{ scale: 1.1 }} className="bg-blue-600 px-4 py-2 rounded-lg">Deploy</m.button>\n    </nav>\n  );\n}`,
    validationRules: {
      contains: ["framer-motion", "fixed", "flex"]
    },
    conversionPrompt: "Mastering UI is just the beginning. See how I build complex multi-tenant navbars for enterprise SaaS. Book a strategy call."
  },
  {
    id: "ch-02",
    slug: "sql-query-master",
    title: "SQL Query Master",
    description: "Write optimized PostgreSQL queries for a complex SaaS dashboard with multi-tenant data structures.",
    difficulty: "Advanced",
    estimatedTime: 30,
    xp: 800,
    initialCode: `-- Get active users for the last 30 days\nSELECT * FROM "User"\nWHERE status = 'ACTIVE'`,
    solutionCode: `SELECT COUNT(*), date_trunc('day', "createdAt") as day\nFROM "User"\nWHERE status = 'ACTIVE'\nAND "createdAt" > now() - interval '30 days'\nGROUP BY day\nORDER BY day DESC`,
    validationRules: {
      contains: ["GROUP BY", "interval", "date_trunc"]
    },
    conversionPrompt: "Database architecture is the spine of a scaling company. Let's discuss your backend bottlenecks."
  }
];
