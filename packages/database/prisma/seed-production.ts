
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding production data...');

  // 1. Admin User
  const adminPassword = await bcrypt.hash('KUMAIL@admin25', 12);
  await prisma.user.upsert({
    where: { email: 'ka6307464@gmail.com' },
    update: {},
    create: {
      email: 'ka6307464@gmail.com',
      password: adminPassword,
      name: 'Kumail KMR',
      role: 'admin',
    },
  });
  console.log('Admin user seeded.');

  // 2. Feature Toggles
  const features = [
    { featureKey: 'dark_mode', name: 'Dark Mode', enabled: true, category: 'engagement' },
    { featureKey: 'ai_chat', name: 'AI Chat', enabled: false, category: 'automation' },
    { featureKey: 'github_activity', name: 'GitHub Activity', enabled: true, category: 'trust' },
  ];

  // (Generic keys for the remaining 50 toggles as requested)
  for (let i = 1; i <= 47; i++) {
    features.push({
      featureKey: `feature_${i}`,
      name: `Feature ${i}`,
      enabled: false,
      category: 'general'
    });
  }

  for (const f of features) {
    await prisma.featureToggle.upsert({
      where: { featureKey: f.featureKey },
      update: {},
      create: f,
    });
  }
  console.log('Feature toggles seeded.');

  // 3. Settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Kumail KMR',
      siteUrl: 'https://kumailkmr.vercel.app',
      emailAddress: 'ka6307464@gmail.com',
      heroHeadline: 'Full-Stack Developer',
      heroSubheadline: 'Building high-performance web applications',
    },
  });
  console.log('Settings seeded.');

  // 4. AIChatConfig
  await prisma.aIChatConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: false,
      botName: 'Kumail KMR Assistant',
      welcomeMessage: 'Hi! How can I help you today?',
      maxMessagesPerSession: 10,
      systemPrompt: 'You are an AI assistant for Kumail KMR, a Full-Stack Developer. Help visitors understand his services and portfolio.',
    },
  });

  // 5. JourneyConfig
  await prisma.journeyConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: true,
      theme: 'tree',
      title: 'My Growth Journey',
    },
  });

  // 6. ThemeConfig
  await prisma.themeConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: true,
      defaultTheme: 'system',
    },
  });

  // 7. ConsultationConfig
  await prisma.consultationConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: false,
      freeEnabled: true,
      freeDuration: 30,
    },
  });

  // 8. BusinessCard
  await prisma.businessCard.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: false,
      name: 'Kumail KMR',
      title: 'Full-Stack Developer',
    },
  });

  // 9. ComparisonMatrix
  await prisma.comparisonMatrix.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: true,
      columns: [
        { name: "Kumail KMR", icon: "👨‍💻" },
        { name: "Generic Agency", icon: "🏢" }
      ],
      rows: [
        { metric: "Personal Support", values: ["Direct Access", "Ticket System"] },
        { metric: "Customization", values: ["100%", "Template-based"] }
      ]
    },
  });

  // 10. DayTimeline
  await prisma.dayTimeline.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: false,
      entries: [
        { time: "09:00", emoji: "☕", title: "Morning Routine", description: "Coffee and planning" }
      ]
    },
  });

  console.log('Production seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
