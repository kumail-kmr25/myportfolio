const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const testimonials = [
        {
            name: "Alex Johnson",
            email: "alex@example.com",
            intervention_type: "Full Stack Development",
            message: "Kumail is an exceptional developer. The project was delivered on time and exceeded our expectations in terms of performance and UI quality.",
            rating: 7,
            about_delivery_lead: "Professional, communicative, and technically brilliant.",
        },
        {
            name: "Sarah Williams",
            email: "sarah@designco.io",
            intervention_type: "UI/UX Design",
            message: "The attention to detail in the design phase was incredible. Our user engagement has increased by 40% since the redesign.",
            rating: 6,
            about_delivery_lead: "Great eye for aesthetics and user experience.",
        },
        {
            name: "Michael Chen",
            email: "m.chen@techsolutions.com",
            intervention_type: "Backend",
            message: "The backend architecture is robust and scalable. We've had zero downtime since deployment.",
            rating: 7,
            about_delivery_lead: "Expert in database optimization and secure API design.",
        }
    ];

    console.log("Seeding testimonials...");
    for (const t of testimonials) {
        await prisma.testimonial.create({
            data: t,
        });
    }
    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
