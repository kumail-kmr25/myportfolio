const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const prisma = new PrismaClient();

async function debugProjects() {
    try {
        const projects = await prisma.project.findMany();
        console.log("Total projects in DB:", projects.length);
        console.log("Projects:", projects.map(p => ({
            id: p.id,
            title: p.title,
            isVisible: p.isVisible,
            isFeatured: p.isFeatured
        })));
    } catch (error) {
        console.error("Error fetching projects:", error);
    } finally {
        await prisma.$disconnect();
    }
}

debugProjects();
