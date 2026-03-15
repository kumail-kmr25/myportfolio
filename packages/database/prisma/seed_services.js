const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding service tiers...');

  const services = [
    {
      name: 'Discovery & Audit',
      price: 'From $1,500',
      description: 'Strategic analysis and technical roadmap for ambitious projects.',
      features: [
        'Tech Stack Evaluation',
        'Architecture Design',
        'Security Vulnerability Audit',
        'Performance Bottleneck ID',
        '24h Delivery'
      ],
      icon: 'Search',
      delay: 0.1,
      order: 0,
      featured: false,
      isVisible: true
    },
    {
      name: 'MVP Development',
      price: 'From $8,000',
      description: 'Rapid production of high-fidelity, market-ready prototypes.',
      features: [
        'Core Feature Development',
        'Production Database Sync',
        'Cloud Infrastructure Setup',
        'Basic SEO Integration',
        '3-6 Week Delivery'
      ],
      icon: 'Rocket',
      delay: 0.2,
      order: 1,
      featured: true,
      isVisible: true
    },
    {
      name: 'Enterprise Scaling',
      price: 'From $15,000',
      description: 'System optimization and high-availability architecture.',
      features: [
        'High-Load Optimization',
        'Distributed Systems Integration',
        'Advanced Security Shield',
        'Automated CI/CD Pipelines',
        'Kubernetes / Containerization'
      ],
      icon: 'Server',
      delay: 0.3,
      order: 2,
      featured: false,
      isVisible: true
    },
    {
      name: 'Full-Stack Retainer',
      price: '$5,000/mo',
      description: 'Ongoing strategic development and 24/7 priority support.',
      features: [
        'Priority Feature Development',
        'Monthly Security Patches',
        'Performance Monitoring',
        'Strategic Consultation',
        'Same-Day Response Time'
      ],
      icon: 'Globe',
      delay: 0.4,
      order: 3,
      featured: false,
      isVisible: true
    },
    {
      name: 'Technical Strategy',
      price: '$250/hr',
      description: 'High-level fractional CTO services and architectural advice.',
      features: [
        'Architecture Review',
        'Team Leadership Training',
        'Growth Roadmap Planning',
        'Due Diligence Support',
        'Direct Access'
      ],
      icon: 'Terminal',
      delay: 0.5,
      order: 4,
      featured: false,
      isVisible: true
    }
  ];

  for (const service of services) {
    await prisma.serviceTier.upsert({
      where: { name: service.name },
      update: service,
      create: service,
    });
  }

  console.log('✅ Service tiers seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
