const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding realistic testimonials...');

  const testimonials = [
    {
      name: 'Sarah Chen',
      email: 'sarah@fintech-nexus.com',
      company: 'FinTech Nexus',
      role: 'Head of Engineering',
      relationshipType: 'Direct Client',
      interventionType: 'MVP Development',
      message: 'Kumail KMR delivered our core platform 2 weeks ahead of schedule. The architecture is incredibly clean and easily handles our current scale of 50k daily active users. His attention to security and performance is world-class.',
      rating: 5,
      aboutDeliveryLead: 'Excellent communication and very proactive in identifying potential bottlenecks before they became issues.',
      verified: true,
      approved: true,
      featured: true,
      order: 0
    },
    {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@scale-up.io',
      company: 'ScaleUp.io',
      role: 'CTO & Co-Founder',
      relationshipType: 'Technical Partner',
      interventionType: 'Enterprise Scaling',
      message: 'We brought in Kumail KMR to overhaul our legacy infrastructure. He implemented a robust CI/CD pipeline and optimized our database queries, resulting in a 40% reduction in server costs and a 2.5x speed improvement.',
      rating: 5,
      aboutDeliveryLead: 'A true professional. He doesn\'t just write code; he builds systems that are designed to last.',
      verified: true,
      approved: true,
      featured: true,
      order: 1
    },
    {
      name: 'Julianne Smyth',
      email: 'j.smyth@creative-pulse.net',
      company: 'Creative Pulse',
      role: 'Product Director',
      relationshipType: 'Retainer Client',
      interventionType: 'Full-Stack Development',
      message: 'Working with Kumail KMR has been a game-changer for our product cycle. His ability to bridge the gap between complex backend logic and pixel-perfect UI is rare. Our conversion rate increased by 15% after the latest redesign.',
      rating: 5,
      aboutDeliveryLead: 'Highly responsive and always offers strategic advice that goes beyond the immediate task.',
      verified: true,
      approved: true,
      featured: false,
      order: 2
    }
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { email: t.email },
      update: t,
      create: t,
    });
  }

  console.log('✅ 3 Realistic Testimonials seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
