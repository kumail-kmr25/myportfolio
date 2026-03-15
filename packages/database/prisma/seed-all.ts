
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Comprehensive Seeding...');

  // 1. Admin User
  console.log('Seeding Admin User...');
  const adminPassword = await bcrypt.hash('KUMAIL@admin25', 12);
  await prisma.user.upsert({
    where: { email: 'ka6307464@gmail.com' },
    update: {
      name: 'Kumail KMR',
      role: 'admin',
      password: adminPassword,
    },
    create: {
      email: 'ka6307464@gmail.com',
      password: adminPassword,
      name: 'Kumail KMR',
      role: 'admin',
    },
  });

  // 2. Feature Toggles
  console.log('Seeding Feature Toggles...');
  const featureKeys = [
    'ai_chat', 'video_walkthroughs', 'live_previews', 'revenue_dashboard',
    'voice_intro', 'certifications', 'dev_log', 'code_snippets', 'tech_radar',
    'client_fit_score', 'proposal_generator', 'payment_links',
    'milestone_tracker', 'qr_business_card', 'multi_language',
    'email_signature', 'mini_learning', 'achievement_badges',
    'client_reports', 'onboarding_wizard', 'project_briefs',
    'subscribers', 'client_map', 'open_source', 'component_library',
    'architecture_decisions', 'mini_courses', 'template_store',
    'freelance_resources', 'paid_consultation', 'spotify_playlist',
    'gallery', 'how_i_think', 'retrospectives', 'media_appearances',
    'reading_list', 'comparison_matrix', 'success_videos',
    'day_timeline', 'website_grader', 'eco_journey'
  ];

  for (const key of featureKeys) {
    await prisma.featureToggle.upsert({
      where: { featureKey: key },
      update: { enabled: false },
      create: {
        featureKey: key,
        name: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        enabled: false,
        category: 'general'
      },
    });
  }

  // Set dark_mode to true
  await prisma.featureToggle.upsert({
    where: { featureKey: 'dark_mode' },
    update: { enabled: true },
    create: {
      featureKey: 'dark_mode',
      name: 'Dark Mode',
      enabled: true,
      category: 'general'
    },
  });

  // 3. Settings
  console.log('Seeding Settings...');
  const existingSettings = await prisma.settings.findFirst();
  const settingsData = {
    siteName: 'Kumail KMR',
    siteUrl: 'https://kumailkmr.vercel.app',
    emailAddress: 'ka6307464@gmail.com',
    metaTitle: 'Kumail KMR | Full-Stack Developer',
  };

  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    });
  } else {
    await prisma.settings.create({
      data: {
        id: 'default-settings',
        ...settingsData,
      },
    });
  }

  // 4. AIChatConfig
  console.log('Seeding AIChatConfig...');
  const existingAIChat = await prisma.aIChatConfig.findFirst();
  const aiChatData = {
    enabled: false,
    botName: 'Kumail KMR Assistant',
    welcomeMessage: 'Hi! How can I help you today?',
    maxMessagesPerSession: 10,
  };

  if (existingAIChat) {
    await prisma.aIChatConfig.update({
      where: { id: existingAIChat.id },
      data: aiChatData,
    });
  } else {
    await prisma.aIChatConfig.create({
      data: {
        id: 'default-aichat',
        ...aiChatData,
      },
    });
  }

  // 5. ThemeConfig
  console.log('Seeding ThemeConfig...');
  const existingTheme = await prisma.themeConfig.findFirst();
  if (existingTheme) {
    await prisma.themeConfig.update({
      where: { id: existingTheme.id },
      data: { enabled: true, defaultTheme: 'system' }
    });
  } else {
    await prisma.themeConfig.create({
      data: { id: 'default-theme', enabled: true, defaultTheme: 'system' }
    });
  }

  // 6. Availability
  console.log('Seeding Availability...');
  const existingAvail = await prisma.availability.findFirst();
  if (existingAvail) {
    await prisma.availability.update({
      where: { id: existingAvail.id },
      data: { status: 'available', message: 'Available for new projects' }
    });
  } else {
    await prisma.availability.create({
      data: { id: 'default-avail', status: 'available', message: 'Available for new projects' }
    });
  }

  // 7. Metrics
  console.log('Seeding Metrics...');
  const existingMetrics = await prisma.metrics.findFirst();
  const metricsData = {
    totalProjects: 15,
    averageUptime: 99.8,
    averagePageSpeed: 94,
    activeProjects: 3,
  };

  if (existingMetrics) {
    await prisma.metrics.update({
      where: { id: existingMetrics.id },
      data: metricsData
    });
  } else {
    await prisma.metrics.create({
      data: { id: 'default-metrics', ...metricsData }
    });
  }

  // 8. ConsultationConfig
  console.log('Seeding ConsultationConfig...');
  const existingConsult = await prisma.consultationConfig.findFirst();
  const consultData = {
    enabled: false,
    freeEnabled: true,
    freeDuration: 30,
    freeTitle: 'Discovery Call',
  };

  if (existingConsult) {
    await prisma.consultationConfig.update({
      where: { id: existingConsult.id },
      data: consultData
    });
  } else {
    await prisma.consultationConfig.create({
      data: { id: 'default-consult', ...consultData }
    });
  }

  console.log('✅ Seeding Complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
