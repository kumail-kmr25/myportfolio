const obj = {
    architecture: {
        nodes: [
            { id: "ui", label: "Frontend", sub: "Next.js 15 App Router", icon: "Monitor", color: "blue", x: 10, y: 35 },
            { id: "api", label: "API Layer", sub: "Route Handlers / Zod", icon: "Server", color: "purple", x: 40, y: 35 },
            { id: "db", label: "Database", sub: "PostgreSQL / Prisma", icon: "Database", color: "green", x: 70, y: 35 },
            { id: "auth", label: "Auth", sub: "Clerk / JWT", icon: "Lock", color: "amber", x: 40, y: 70 }
        ],
        edges: [
            { from: "ui", to: "api", label: "tRPC / REST" },
            { from: "api", to: "db", label: "Type-safe Queries" },
            { from: "ui", to: "auth", label: "Session Mgmt" }
        ]
    }
};
console.log("Parsed successfully");
