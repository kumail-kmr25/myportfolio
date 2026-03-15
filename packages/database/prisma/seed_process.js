const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding process steps...');

  const steps = [
    {
      title: 'Discovery',
      description: 'System-wide audit and strategic roadmap development.',
      order: 0,
      icon: 'Search'
    },
    {
      title: 'Design',
      description: 'High-fidelity architectural blueprints and UI prototyping.',
      order: 1,
      icon: 'ShieldCheck'
    },
    {
      title: 'Development',
      description: 'Rapid sprint-based production with CI/CD integration.',
      order: 2,
      icon: 'Code'
    },
    {
      title: 'Validation',
      description: 'Rigorous E2E testing and security stress-testing.',
      order: 3,
      icon: 'Zap'
    },
    {
      title: 'Deployment',
      description: 'Secure, zero-downtime release to production.',
      order: 4,
      icon: 'Rocket'
    }
  ];

  for (const step of steps) {
    await prisma.processStep.upsert({
      where: { id: `step-${step.order}` }, // Using deterministic IDs for upsert
      update: step,
      create: { ...step, id: `step-${step.order}` },
    });
  }

  console.log('✅ Process steps seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
