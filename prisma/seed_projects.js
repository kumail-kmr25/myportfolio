const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const projects = [
        {
            title: "Portfolio Website",
            description:
                "A modern, responsive portfolio built with Next.js 15, Tailwind CSS, and MongoDB. Features interactive testimonials, admin dashboard, contact form with email notifications, and dynamic project showcase.",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Prisma"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            demo: "#",
            github: "https://github.com/kumail-kmr25/myportfolio",
        },
        {
            title: "School Management System",
            description:
                "A production-grade LMS with role-based access control, 2FA authentication, student/teacher management, attendance tracking, results processing with GPA calculation, and fee management.",
            tags: ["Node.js", "Express", "TypeScript", "MongoDB", "React"],
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
            demo: "#",
            github: "https://github.com/kumail-kmr25",
        },
        {
            title: "E-Commerce Platform",
            description:
                "Full-stack e-commerce application with product catalog, shopping cart, secure checkout, payment integration, and an admin dashboard for inventory management.",
            tags: ["React", "Node.js", "Express", "PostgreSQL", "Stripe"],
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
            demo: "#",
            github: "https://github.com/kumail-kmr25",
        },
    ];

    console.log("Seeding projects...");
    for (const p of projects) {
        await prisma.project.create({ data: p });
    }
    console.log("Projects seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
