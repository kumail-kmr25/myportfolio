
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding production data...');

  // 1. Admin User
  const adminPassword = await bcrypt.hash('KUMAIL@admin25', 12);
  const existingUser = await prisma.user.findUnique({
    where: { email: 'ka6307464@gmail.com' }
  });

  if (existingUser) {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        role: 'admin',
        name: 'Kumail KMR',
      }
    });
    console.log('Admin user updated.');
  } else {
    await prisma.user.create({
      data: {
        email: 'ka6307464@gmail.com',
        password: adminPassword,
        name: 'Kumail KMR',
        role: 'admin',
      },
    });
    console.log('Admin user created.');
  }

  // 2. Feature Toggles (Standardizing for 55+ requested features)
  const features = [
    { featureKey: 'dark_mode', name: 'Dark Mode', enabled: true, category: 'engagement' },
    { featureKey: 'ai_chat', name: 'AI Chat Advisor', enabled: true, category: 'automation' },
    { featureKey: 'github_activity', name: 'GitHub Activity', enabled: true, category: 'trust' },
    { featureKey: 'theme_engine', name: 'Premium Theme Engine', enabled: true, category: 'personality' },
    { featureKey: 'multi_language', name: 'Internationalization', enabled: false, category: 'personality' },
    { featureKey: 'email_signature', name: 'Email Signature Generator', enabled: true, category: 'monetization' },
    { featureKey: 'achievement_badges', name: 'Achievement Badges', enabled: true, category: 'engagement' },
    { featureKey: 'client_onboarding', name: 'Client Onboarding Wizard', enabled: true, category: 'automation' },
    { featureKey: 'weekly_reports', name: 'Weekly Client Reports', enabled: false, category: 'automation' },
    { featureKey: 'project_briefs', name: 'Project Brief Templates', enabled: true, category: 'automation' },
    { featureKey: 'spotify_integration', name: 'Spotify Music Presence', enabled: false, category: 'personality' },
    { featureKey: 'bts_gallery', name: 'Behind-The-Scenes Gallery', enabled: true, category: 'personality' },
    { featureKey: 'how_i_think', name: 'Thinking Process Matrix', enabled: true, category: 'personality' },
    { featureKey: 'retro_perspective', name: 'What I\'d Do Differently', enabled: true, category: 'personality' },
    { featureKey: 'open_source', name: 'Open Source Dashboard', enabled: true, category: 'trust' },
    { featureKey: 'component_library', name: 'Component Showcase', enabled: true, category: 'trust' },
    { featureKey: 'adr_logs', name: 'Architecture Decision Records', enabled: true, category: 'trust' },
    { featureKey: 'premium_courses', name: 'Mini Learning Courses', enabled: false, category: 'monetization' },
    { featureKey: 'premium_templates', name: 'Premium UI Templates', enabled: false, category: 'monetization' },
    { featureKey: 'freelance_resources', name: 'Freelance Growth Resources', enabled: true, category: 'monetization' },
    { featureKey: 'paid_consultation', name: 'Paid Consultation Booking', enabled: false, category: 'monetization' },
    { featureKey: 'color_palette', name: 'Dynamic Color Tool', enabled: true, category: 'automation' },
    { featureKey: 'website_grader', name: 'AI Website Grader', enabled: true, category: 'automation' },
    { featureKey: 'meta_generator', name: 'SEO Meta Generator', enabled: true, category: 'automation' },
    { featureKey: 'responsive_preview', name: 'Responsive Preview Tool', enabled: true, category: 'automation' },
    { featureKey: 'day_timeline', name: 'A Day In My Life', enabled: true, category: 'personality' },
    { featureKey: 'video_walkthrough', name: 'Project Video Walkthroughs', enabled: true, category: 'engagement' },
    { featureKey: 'live_previews', name: 'Interactive Live Previews', enabled: true, category: 'engagement' },
    { featureKey: 'revenue_dashboard', name: 'Project Revenue Dashboard', enabled: true, category: 'trust' },
    { featureKey: 'voice_intro', name: 'Interactive Voice Intro', enabled: false, category: 'personality' },
    { featureKey: 'client_fit_score', name: 'Client Compatibility Quiz', enabled: true, category: 'automation' },
    { featureKey: 'proposal_generator', name: 'Automatic Proposal Generator', enabled: true, category: 'automation' },
    { featureKey: 'payment_links', name: 'One-Click Payment Links', enabled: true, category: 'monetization' },
    { featureKey: 'milestone_tracker', name: 'Live Milestone Tracker', enabled: true, category: 'trust' },
    { featureKey: 'ab_testing', name: 'A/B Test Engine', enabled: false, category: 'automation' },
    { featureKey: 'qr_business_card', name: 'Digital QR Business Card', enabled: true, category: 'networking' },
    { featureKey: 'tech_radar', name: 'Interactive Tech Radar', enabled: true, category: 'trust' },
    { featureKey: 'client_map', name: 'Global Client Distribution', enabled: true, category: 'trust' },
    { featureKey: 'media_appearances', name: 'Podcast & Media Log', enabled: true, category: 'trust' },
    { featureKey: 'reading_list', name: 'Business & Tech Books', enabled: true, category: 'personality' },
    { featureKey: 'comparison_matrix', name: 'Me vs Industry Matrix', enabled: true, category: 'trust' },
    { featureKey: 'success_videos', name: 'Video Client Testimonials', enabled: true, category: 'trust' },
    { featureKey: 'whatsapp_automation', name: 'WhatsApp Lead Alerts', enabled: true, category: 'automation' },
    { featureKey: 'audit_tool', name: 'Technical Website Audit', enabled: true, category: 'automation' },
    { featureKey: 'referral_system', name: 'Affiliate & Referral Engine', enabled: true, category: 'monetization' },
    { featureKey: 'lead_magnets', name: 'High-Value Lead Magnets', enabled: true, category: 'automation' },
    { featureKey: 'estimate_tool', name: 'Instant Project Estimator', enabled: true, category: 'automation' },
    { featureKey: 'testimonial_reward', name: 'Testimonial Reward System', enabled: true, category: 'engagement' },
    { featureKey: 'hire_me_workflow', name: 'Optimized Hire Workflow', enabled: true, category: 'automation' },
    { featureKey: 'social_proof_feed', name: 'Real-time Activity Feed', enabled: true, category: 'trust' },
    { featureKey: 'subscriber_hub', name: 'Newsletter & Update Hub', enabled: true, category: 'engagement' },
    { featureKey: 'developer_status', name: 'Live Availability Status', enabled: true, category: 'trust' },
    { featureKey: 'site_metrics', name: 'Build & Speed Metrics', enabled: true, category: 'trust' },
    { featureKey: 'skill_matrix', name: 'Interactive Skill Matrix', enabled: true, category: 'trust' },
    { featureKey: 'resume_access', name: 'Premium Resume Access', enabled: true, category: 'trust' },
  ];

  for (const f of features) {
    await prisma.featureToggle.upsert({
      where: { featureKey: f.featureKey },
      update: { name: f.name, category: f.category },
      create: f,
    });
  }
  console.log(`${features.length} Feature toggles seeded.`);

  // 3. Settings
  console.log('Seeding Settings...');
  const existingSettings = await prisma.settings.findFirst();
  const settingsData = {
    siteName: 'Kumail KMR',
    siteUrl: 'https://kumailkmr.vercel.app',
    emailAddress: 'ka6307464@gmail.com',
    heroHeadline: 'Full-Stack Developer',
    heroSubheadline: 'Building high-performance web applications',
  };

  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: settingsData,
    });
    console.log('Settings updated.');
  } else {
    await prisma.settings.create({
      data: {
        id: 'default',
        ...settingsData,
      },
    });
    console.log('Settings created.');
  }

  // 4. AIChatConfig
  console.log('Seeding AIChatConfig...');
  const existingAIChat = await prisma.aIChatConfig.findFirst();
  const aiChatData = {
    enabled: false,
    botName: 'Kumail KMR Assistant',
    welcomeMessage: 'Hi! How can I help you today?',
    maxMessagesPerSession: 10,
    systemPrompt: 'You are an AI assistant for Kumail KMR, a Full-Stack Developer. Help visitors understand his services and portfolio.',
  };

  if (existingAIChat) {
    await prisma.aIChatConfig.update({
      where: { id: existingAIChat.id },
      data: aiChatData,
    });
  } else {
    await prisma.aIChatConfig.create({
      data: {
        id: 'default',
        ...aiChatData,
      },
    });
  }
  console.log('AIChatConfig seeded.');

  // 5. JourneyConfig
  console.log('Seeding JourneyConfig...');
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
  console.log('JourneyConfig seeded.');

  // 6. ThemeConfig
  console.log('Seeding ThemeConfig...');
  await prisma.themeConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      enabled: true,
      defaultTheme: 'system',
    },
  });
  console.log('ThemeConfig seeded.');

  // 7. ConsultationConfig
  console.log('Seeding ConsultationConfig...');
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
  console.log('ConsultationConfig seeded.');

  // 8. BusinessCard
  console.log('Seeding BusinessCard...');
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
  console.log('BusinessCard seeded.');

  // 9. ComparisonMatrix
  console.log('Seeding ComparisonMatrix...');
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
  console.log('ComparisonMatrix seeded.');

  // 10. DayTimeline
  console.log('Seeding DayTimeline...');
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
