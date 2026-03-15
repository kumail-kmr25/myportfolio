-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "metaDesc" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "excerpt" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "readTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CaseStudy" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "architecture" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ContactSubmission" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "contacted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "converted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'new',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FeatureRequest" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HireRequest" ADD COLUMN     "contactMethod" TEXT,
ADD COLUMN     "referenceLink" TEXT;

-- AlterTable
ALTER TABLE "JourneyPhase" DROP COLUMN "color",
DROP COLUMN "description",
DROP COLUMN "icon",
DROP COLUMN "phase",
ADD COLUMN     "dateRange" TEXT NOT NULL,
ADD COLUMN     "ecoIcon" TEXT NOT NULL DEFAULT '≡ƒî▒',
ADD COLUMN     "ecoStage" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "year" INTEGER,
ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "created_at",
DROP COLUMN "deployment",
DROP COLUMN "improvementDetails",
DROP COLUMN "tags",
DROP COLUMN "updated_at",
ADD COLUMN     "afterStats" JSONB,
ADD COLUMN     "architecture" JSONB,
ADD COLUMN     "backendDepth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "beforeStats" JSONB,
ADD COLUMN     "budgetMax" INTEGER,
ADD COLUMN     "budgetMin" INTEGER,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "challenge" TEXT,
ADD COLUMN     "clientCompany" TEXT,
ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "clientPhoto" TEXT,
ADD COLUMN     "clientQuote" TEXT,
ADD COLUMN     "clientRole" TEXT,
ADD COLUMN     "clientType" TEXT,
ADD COLUMN     "clientVideo" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ctaClicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "decisionLogs" TEXT[],
ADD COLUMN     "engineering" TEXT,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "heroImage" TEXT,
ADD COLUMN     "heroVideo" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lessons" TEXT,
ADD COLUMN     "liveUrl" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "metaDesc" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "metricUnit" TEXT,
ADD COLUMN     "metricValue" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "performance" TEXT,
ADD COLUMN     "primaryMetric" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "results" TEXT,
ADD COLUMN     "scalability" TEXT,
ADD COLUMN     "scalabilityDepth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "screenshots" TEXT[],
ADD COLUMN     "secondaryMetrics" JSONB,
ADD COLUMN     "security" TEXT,
ADD COLUMN     "securityDepth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "showInPortfolio" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Production',
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "targetAudience" TEXT,
ADD COLUMN     "techReasons" JSONB,
ADD COLUMN     "techStack" TEXT[],
ADD COLUMN     "timeline" JSONB,
ADD COLUMN     "timelineString" TEXT,
ADD COLUMN     "uiDepth" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valuePoints" JSONB,
ADD COLUMN     "valueProp" TEXT,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "demo" DROP NOT NULL,
ALTER COLUMN "github" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SiteStats" ADD COLUMN     "auditCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "auditLeads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hireRequests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "leadGenTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "patternsMatched" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "status" SET DEFAULT 'expert',
ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "about_delivery_lead",
DROP COLUMN "created_at",
DROP COLUMN "intervention_type",
DROP COLUMN "permission",
DROP COLUMN "relationship_type",
DROP COLUMN "updated_at",
ADD COLUMN     "aboutDeliveryLead" TEXT,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interventionType" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "relationshipType" TEXT,
ADD COLUMN     "rewardAmount" INTEGER,
ADD COLUMN     "rewardGiven" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "rating" SET DEFAULT 5;

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "userId" TEXT,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT,
    "features" TEXT[],
    "icon" TEXT,
    "delay" DOUBLE PRECISION DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playground" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "fullDesc" TEXT,
    "difficulty" TEXT NOT NULL,
    "estimatedTime" INTEGER NOT NULL,
    "techStack" TEXT[],
    "prerequisites" TEXT,
    "learningOutcomes" TEXT,
    "codeSourceType" TEXT NOT NULL,
    "codeSourceUrl" TEXT,
    "startingFiles" TEXT[],
    "thumbnailUrl" TEXT,
    "demoGifUrl" TEXT,
    "livePreviewUrl" TEXT,
    "screenshots" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "allowDownload" BOOLEAN NOT NULL DEFAULT true,
    "enableAI" BOOLEAN NOT NULL DEFAULT true,
    "aiQuestionLimit" INTEGER NOT NULL DEFAULT 5,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "sessionCount" INTEGER NOT NULL DEFAULT 0,
    "completionCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "playgroundId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "fileToModify" TEXT NOT NULL,
    "hint" TEXT,
    "solutionCode" TEXT,
    "validationType" TEXT NOT NULL,
    "validationRules" JSONB,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaygroundSession" (
    "id" TEXT NOT NULL,
    "playgroundId" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "name" TEXT,
    "anonymousId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "timeSpent" INTEGER,
    "challengesCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalChallenges" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "hintsUsed" INTEGER NOT NULL DEFAULT 0,
    "aiQuestionsAsked" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "downloaded" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "consultBooked" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlaygroundSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "displayName" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "playgroundsCompleted" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "achievements" TEXT[],
    "showOnLeaderboard" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "city" TEXT NOT NULL,
    "website" TEXT,
    "heardFrom" TEXT NOT NULL,
    "projectType" TEXT NOT NULL,
    "numPages" TEXT,
    "features" TEXT[],
    "design" TEXT NOT NULL,
    "designExtras" TEXT[],
    "timeline" TEXT NOT NULL,
    "support" TEXT,
    "hostingExtras" TEXT[],
    "baseCost" INTEGER NOT NULL,
    "featuresCost" INTEGER NOT NULL,
    "designCost" INTEGER NOT NULL,
    "timelineMultiplier" DOUBLE PRECISION NOT NULL,
    "supportMonthly" INTEGER,
    "subtotal" INTEGER NOT NULL,
    "gst" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "estimateLow" INTEGER NOT NULL,
    "estimateHigh" INTEGER NOT NULL,
    "leadScore" INTEGER NOT NULL DEFAULT 0,
    "leadQuality" TEXT NOT NULL DEFAULT 'cold',
    "status" TEXT NOT NULL DEFAULT 'new',
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "whatsappSent" BOOLEAN NOT NULL DEFAULT false,
    "followUpCount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "consultBooked" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "actualValue" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimateRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimatorPricing" (
    "id" TEXT NOT NULL,
    "landingPage" INTEGER NOT NULL DEFAULT 15000,
    "businessSite" INTEGER NOT NULL DEFAULT 35000,
    "ecommerce" INTEGER NOT NULL DEFAULT 50000,
    "webApp" INTEGER NOT NULL DEFAULT 80000,
    "fullPlatform" INTEGER NOT NULL DEFAULT 150000,
    "featurePricing" JSONB NOT NULL,
    "rushMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.4,
    "fastMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "standardMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "flexibleDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "basicSupport" INTEGER NOT NULL DEFAULT 2999,
    "businessSupport" INTEGER NOT NULL DEFAULT 5999,
    "premiumSupport" INTEGER NOT NULL DEFAULT 12999,
    "gstRate" DOUBLE PRECISION NOT NULL DEFAULT 18.0,
    "usdRate" DOUBLE PRECISION NOT NULL DEFAULT 83.0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EstimatorPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditRequest" (
    "id" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "company" TEXT,
    "performance" INTEGER,
    "accessibility" INTEGER,
    "seo" INTEGER,
    "bestPractices" INTEGER,
    "loadTime" DOUBLE PRECISION,
    "fcp" TEXT,
    "lcp" TEXT,
    "tti" TEXT,
    "hasSSL" BOOLEAN NOT NULL DEFAULT false,
    "isMobileFriendly" BOOLEAN NOT NULL DEFAULT false,
    "results" JSONB,
    "leadScore" INTEGER DEFAULT 0,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerName" TEXT NOT NULL,
    "referrerEmail" TEXT NOT NULL,
    "referrerPhone" TEXT,
    "referralCode" TEXT NOT NULL,
    "refereeName" TEXT,
    "refereeEmail" TEXT,
    "refereePhone" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "signups" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "rewardType" TEXT,
    "rewardAmount" INTEGER,
    "rewardClaimed" BOOLEAN NOT NULL DEFAULT false,
    "rewardPaidOut" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralClick" (
    "id" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadMagnet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadMagnet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadMagnetDownload" (
    "id" TEXT NOT NULL,
    "leadMagnetId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "company" TEXT,
    "industry" TEXT,
    "downloaded" BOOLEAN NOT NULL DEFAULT false,
    "emailOpened" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadMagnetDownload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "industry" TEXT,
    "projectIds" TEXT[],
    "totalSpent" INTEGER NOT NULL DEFAULT 0,
    "projectCount" INTEGER NOT NULL DEFAULT 0,
    "referralCode" TEXT,
    "referralsCount" INTEGER NOT NULL DEFAULT 0,
    "lastContactDate" TIMESTAMP(3),
    "nextFollowUp" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "tier" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeveloperStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "capacityPercent" INTEGER NOT NULL DEFAULT 0,
    "nextAvailabilityDays" INTEGER NOT NULL DEFAULT 0,
    "currentFocus" TEXT NOT NULL DEFAULT 'Open to new projects',
    "customMessage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeveloperStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "slotsRemaining" INTEGER,
    "nextAvailableDate" TEXT,
    "message" TEXT,
    "showCountdown" BOOLEAN NOT NULL DEFAULT false,
    "countdownEndDate" TIMESTAMP(3),
    "displayPages" TEXT[],
    "urgentStyling" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metrics" (
    "id" TEXT NOT NULL,
    "totalProjects" INTEGER,
    "totalProjectsAuto" BOOLEAN NOT NULL DEFAULT true,
    "averageUptime" DOUBLE PRECISION,
    "averagePageSpeed" INTEGER,
    "activeProjects" INTEGER,
    "githubUsername" TEXT,
    "githubAutoSync" BOOLEAN NOT NULL DEFAULT false,
    "githubContributions" INTEGER,
    "githubLastSynced" TIMESTAMP(3),
    "showTrends" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityFeed" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ActivityFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientLogo" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "industry" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "heroHeadline" TEXT,
    "heroSubheadline" TEXT,
    "aboutText" TEXT,
    "calendlyUrl" TEXT,
    "emailAddress" TEXT,
    "phoneNumber" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "githubUrl" TEXT,
    "googleAnalyticsId" TEXT,
    "facebookPixelId" TEXT,
    "resendApiKey" TEXT,
    "sendgridApiKey" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "city" TEXT,
    "sessionId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversionEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "source" TEXT,
    "value" INTEGER,
    "userId" TEXT,
    "email" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "maxUses" INTEGER,
    "currentUses" INTEGER NOT NULL DEFAULT 0,
    "industries" TEXT[],
    "minProjectValue" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureToggle" (
    "id" TEXT NOT NULL,
    "featureKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "category" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureToggle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIChatConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "botName" TEXT NOT NULL DEFAULT 'Kumale''s Assistant',
    "welcomeMessage" TEXT NOT NULL DEFAULT 'Hi! How can I help you today?',
    "widgetPosition" TEXT NOT NULL DEFAULT 'bottom-right',
    "widgetColor" TEXT NOT NULL DEFAULT '#2563eb',
    "avatarUrl" TEXT,
    "showAfterSeconds" INTEGER NOT NULL DEFAULT 30,
    "showOnPages" TEXT[] DEFAULT ARRAY['all']::TEXT[],
    "maxMessagesPerSession" INTEGER NOT NULL DEFAULT 20,
    "systemPrompt" TEXT,
    "quickQuestions" TEXT[] DEFAULT ARRAY['What services do you offer?', 'How much does a website cost?', 'What is your availability?', 'Can I see your work?']::TEXT[],
    "customResponses" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIChatConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIChatConversation" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "visitorEmail" TEXT,
    "visitorName" TEXT,
    "visitorPhone" TEXT,
    "messages" JSONB NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "emailCaptured" BOOLEAN NOT NULL DEFAULT false,
    "leadScore" INTEGER,
    "leadQuality" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "adminNotes" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "pageUrl" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIChatConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectVideo" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT NOT NULL,
    "videoType" TEXT NOT NULL DEFAULT 'upload',
    "thumbnailUrl" TEXT,
    "duration" INTEGER,
    "captionsUrl" TEXT,
    "transcript" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "avgWatchTime" DOUBLE PRECISION,
    "completionRate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivePreview" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "title" TEXT NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "defaultView" TEXT NOT NULL DEFAULT 'desktop',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LivePreview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientRevenue" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "clientName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "monthlyRevenueBefore" INTEGER,
    "monthlyRevenueAfter" INTEGER,
    "totalRevenueGenerated" INTEGER NOT NULL DEFAULT 0,
    "conversionBefore" DOUBLE PRECISION,
    "conversionAfter" DOUBLE PRECISION,
    "trafficBefore" INTEGER,
    "trafficAfter" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isLive" BOOLEAN NOT NULL DEFAULT true,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientRevenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceIntro" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "audioUrl" TEXT,
    "duration" INTEGER,
    "transcript" TEXT,
    "placement" TEXT[] DEFAULT ARRAY['about']::TEXT[],
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceIntro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issuerLogoUrl" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "verifyUrl" TEXT,
    "certificateUrl" TEXT,
    "skills" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevLog" (
    "id" TEXT NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,
    "completed" TEXT[],
    "inProgress" TEXT[],
    "learning" TEXT[],
    "funFact" TEXT,
    "linesOfCode" INTEGER,
    "commitsCount" INTEGER,
    "hoursWorked" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DevLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeSnippet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "projectId" TEXT,
    "fileName" TEXT,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechRadarItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL,
    "years" DOUBLE PRECISION NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "projects" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TechRadarItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitScoreConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "questions" JSONB NOT NULL,
    "excellentMin" INTEGER NOT NULL DEFAULT 80,
    "goodMin" INTEGER NOT NULL DEFAULT 60,
    "fairMin" INTEGER NOT NULL DEFAULT 40,
    "excellentMessage" TEXT NOT NULL DEFAULT 'Perfect match! Let''s build something amazing.',
    "goodMessage" TEXT NOT NULL DEFAULT 'Great fit! Let''s discuss your project.',
    "fairMessage" TEXT NOT NULL DEFAULT 'Could work! Let''s chat to find out.',
    "poorMessage" TEXT NOT NULL DEFAULT 'Might not be ideal, but let''s explore options.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FitScoreConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FitScoreResponse" (
    "id" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "score" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "company" TEXT,
    "phone" TEXT,
    "followedUp" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FitScoreResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalTemplate" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "coverContent" TEXT,
    "scopeTemplate" TEXT,
    "processTemplate" TEXT,
    "termsTemplate" TEXT,
    "basePricing" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProposalTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedProposal" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientCompany" TEXT,
    "clientPhone" TEXT,
    "projectType" TEXT NOT NULL,
    "features" TEXT[],
    "timeline" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "proposalPdfUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'generated',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentLink" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "projectName" TEXT,
    "clientEmail" TEXT,
    "razorpayLinkId" TEXT,
    "razorpayLinkUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'created',
    "paidAt" TIMESTAMP(3),
    "invoiceUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMilestone" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "launchDate" TIMESTAMP(3),
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ABTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "variantA" TEXT NOT NULL,
    "variantB" TEXT NOT NULL,
    "variantAViews" INTEGER NOT NULL DEFAULT 0,
    "variantBViews" INTEGER NOT NULL DEFAULT 0,
    "variantAConversions" INTEGER NOT NULL DEFAULT 0,
    "variantBConversions" INTEGER NOT NULL DEFAULT 0,
    "winner" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ABTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCard" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT 'Kumale Ali Bhat',
    "title" TEXT NOT NULL DEFAULT 'Full-Stack Developer',
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "qrColor" TEXT NOT NULL DEFAULT '#000000',
    "qrBgColor" TEXT NOT NULL DEFAULT '#ffffff',
    "qrLogoUrl" TEXT,
    "photoUrl" TEXT,
    "tagline" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "defaultTheme" TEXT NOT NULL DEFAULT 'system',
    "lightColors" JSONB,
    "darkColors" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThemeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "defaultLang" TEXT NOT NULL DEFAULT 'en',
    "languages" JSONB NOT NULL DEFAULT '[{"code":"en","name":"English","flag":"≡ƒç¼≡ƒçº"},{"code":"hi","name":"Hindi","flag":"≡ƒç«≡ƒç│"}]',
    "translations" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LanguageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSignature" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT 'Kumale Ali Bhat',
    "title" TEXT NOT NULL DEFAULT 'Full-Stack Web Developer',
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "photoUrl" TEXT,
    "availability" TEXT DEFAULT 'Available for new projects',
    "template" TEXT NOT NULL DEFAULT 'modern',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSignature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" TEXT NOT NULL,
    "targetAudience" TEXT,
    "readingTime" INTEGER,
    "tags" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL DEFAULT 0,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" TIMESTAMP(3),
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientReport" (
    "id" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "projectId" TEXT,
    "reportType" TEXT NOT NULL DEFAULT 'weekly',
    "metrics" JSONB NOT NULL,
    "recommendations" TEXT[],
    "pdfUrl" TEXT,
    "sentAt" TIMESTAMP(3),
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingSubmission" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT,
    "businessName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "targetAudience" TEXT,
    "competitors" TEXT[],
    "brandAssets" JSONB,
    "credentials" JSONB,
    "preferences" JSONB,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBrief" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "pdfUrl" TEXT NOT NULL,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "newProjects" BOOLEAN NOT NULL DEFAULT true,
    "newArticles" BOOLEAN NOT NULL DEFAULT true,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "promotions" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmToken" TEXT,
    "unsubscribed" BOOLEAN NOT NULL DEFAULT false,
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Broadcast" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "targetGroup" TEXT NOT NULL DEFAULT 'all',
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "openCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Broadcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientLocation" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "clientCount" INTEGER NOT NULL DEFAULT 1,
    "industries" TEXT[],
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpenSourceContribution" (
    "id" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "prUrl" TEXT,
    "stars" INTEGER,
    "language" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpenSourceContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentShowcase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "demoUrl" TEXT,
    "codeSnippet" TEXT,
    "usedInProjects" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[],
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComponentShowcase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectureDecision" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "decision" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "result" TEXT,
    "projectId" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArchitectureDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniCourse" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "chapters" JSONB NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "requireEmail" BOOLEAN NOT NULL DEFAULT true,
    "enrollments" INTEGER NOT NULL DEFAULT 0,
    "completions" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MiniCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PremiumTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "demoUrl" TEXT,
    "screenshots" TEXT[],
    "techStack" TEXT[],
    "features" TEXT[],
    "industry" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "originalPrice" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "downloadUrl" TEXT,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PremiumTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreelanceResource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "price" INTEGER,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreelanceResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "freeEnabled" BOOLEAN NOT NULL DEFAULT true,
    "freeDuration" INTEGER NOT NULL DEFAULT 30,
    "freeTitle" TEXT NOT NULL DEFAULT 'Discovery Call',
    "paidEnabled" BOOLEAN NOT NULL DEFAULT false,
    "sessions" JSONB NOT NULL DEFAULT '[{"title":"Strategy Session","duration":60,"price":3000},{"title":"Full-Day Workshop","duration":240,"price":12000}]',
    "calendlyUrl" TEXT,
    "razorpayEnabled" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationBooking" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sessionTitle" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT,
    "clientCompany" TEXT,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    "amount" INTEGER,
    "paymentStatus" TEXT,
    "paymentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "agenda" TEXT,
    "adminNotes" TEXT,
    "meetingLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotifyConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "playlistUrl" TEXT,
    "playlistName" TEXT,
    "showNowPlaying" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpotifyConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThinkingProcess" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientProblem" TEXT NOT NULL,
    "steps" JSONB NOT NULL,
    "result" TEXT NOT NULL,
    "projectId" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThinkingProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retrospective" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "projectName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "reflection" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retrospective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationConfig" (
    "id" TEXT NOT NULL,
    "githubEnabled" BOOLEAN NOT NULL DEFAULT false,
    "githubUsername" TEXT,
    "githubToken" TEXT,
    "githubLastSynced" TIMESTAMP(3),
    "linkedinEnabled" BOOLEAN NOT NULL DEFAULT false,
    "linkedinProfileUrl" TEXT,
    "stackoverflowEnabled" BOOLEAN NOT NULL DEFAULT false,
    "stackoverflowUserId" TEXT,
    "spotifyEnabled" BOOLEAN NOT NULL DEFAULT false,
    "spotifyPlaylistUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteGrade" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "email" TEXT,
    "overallGrade" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "speedGrade" TEXT NOT NULL,
    "designGrade" TEXT NOT NULL,
    "securityGrade" TEXT NOT NULL,
    "mobileGrade" TEXT NOT NULL,
    "seoGrade" TEXT NOT NULL,
    "details" JSONB,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayTimeline" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "entries" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DayTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAppearance" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "show" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "embedUrl" TEXT,
    "externalUrl" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAppearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookRecommendation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "coverUrl" TEXT,
    "amazonUrl" TEXT,
    "category" TEXT NOT NULL,
    "impact" TEXT,
    "rating" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonMatrix" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "columns" JSONB NOT NULL,
    "rows" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComparisonMatrix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuccessVideo" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "clientName" TEXT NOT NULL,
    "clientRole" TEXT,
    "clientCompany" TEXT,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "duration" INTEGER,
    "transcript" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuccessVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureAnalytics" (
    "id" TEXT NOT NULL,
    "featureKey" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyConfig" (
    "id" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "theme" TEXT NOT NULL DEFAULT 'tree',
    "title" TEXT NOT NULL DEFAULT 'My Growth Journey',
    "subtitle" TEXT NOT NULL DEFAULT 'Every project planted a seed. Every challenge grew a branch.',
    "backgroundColor" TEXT NOT NULL DEFAULT '#f0fdf4',
    "primaryColor" TEXT NOT NULL DEFAULT '#059669',
    "accentColor" TEXT NOT NULL DEFAULT '#f59e0b',
    "enableAnimations" BOOLEAN NOT NULL DEFAULT true,
    "enableParticles" BOOLEAN NOT NULL DEFAULT true,
    "animationSpeed" TEXT NOT NULL DEFAULT 'normal',
    "layout" TEXT NOT NULL DEFAULT 'vertical',
    "showConnectors" BOOLEAN NOT NULL DEFAULT true,
    "showOnHomepage" BOOLEAN NOT NULL DEFAULT true,
    "showOnAbout" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourneyConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyStep" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '≡ƒìâ',
    "growthLevel" INTEGER NOT NULL DEFAULT 1,
    "category" TEXT NOT NULL,
    "color" TEXT,
    "size" TEXT NOT NULL DEFAULT 'medium',
    "organization" TEXT,
    "location" TEXT,
    "technologies" TEXT[],
    "achievement" TEXT,
    "projectLink" TEXT,
    "certificateLink" TEXT,
    "imageUrl" TEXT,
    "impactMetric" TEXT,
    "growthMetric" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourneyStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyMilestone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '≡ƒî╕',
    "celebration" TEXT,
    "metric" TEXT,
    "size" TEXT NOT NULL DEFAULT 'large',
    "color" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourneyMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyFutureGoal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetDate" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'ΓÿÇ∩╕Å',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JourneyFutureGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "ServiceTier_order_idx" ON "ServiceTier"("order");

-- CreateIndex
CREATE INDEX "ProcessStep_order_idx" ON "ProcessStep"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Playground_slug_key" ON "Playground"("slug");

-- CreateIndex
CREATE INDEX "Playground_slug_idx" ON "Playground"("slug");

-- CreateIndex
CREATE INDEX "Challenge_playgroundId_idx" ON "Challenge"("playgroundId");

-- CreateIndex
CREATE INDEX "PlaygroundSession_playgroundId_idx" ON "PlaygroundSession"("playgroundId");

-- CreateIndex
CREATE INDEX "PlaygroundSession_email_idx" ON "PlaygroundSession"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_anonymousId_key" ON "LeaderboardEntry"("anonymousId");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_totalPoints_idx" ON "LeaderboardEntry"("totalPoints");

-- CreateIndex
CREATE INDEX "EstimateRequest_email_idx" ON "EstimateRequest"("email");

-- CreateIndex
CREATE INDEX "EstimateRequest_status_idx" ON "EstimateRequest"("status");

-- CreateIndex
CREATE INDEX "AuditRequest_email_idx" ON "AuditRequest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referralCode_key" ON "Referral"("referralCode");

-- CreateIndex
CREATE INDEX "Referral_referralCode_idx" ON "Referral"("referralCode");

-- CreateIndex
CREATE INDEX "Referral_referrerEmail_idx" ON "Referral"("referrerEmail");

-- CreateIndex
CREATE INDEX "ReferralClick_referralCode_idx" ON "ReferralClick"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "LeadMagnet_slug_key" ON "LeadMagnet"("slug");

-- CreateIndex
CREATE INDEX "LeadMagnet_slug_idx" ON "LeadMagnet"("slug");

-- CreateIndex
CREATE INDEX "LeadMagnetDownload_email_idx" ON "LeadMagnetDownload"("email");

-- CreateIndex
CREATE INDEX "LeadMagnetDownload_leadMagnetId_idx" ON "LeadMagnetDownload"("leadMagnetId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_referralCode_key" ON "Client"("referralCode");

-- CreateIndex
CREATE INDEX "Client_email_idx" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_status_idx" ON "Client"("status");

-- CreateIndex
CREATE INDEX "ActivityFeed_timestamp_idx" ON "ActivityFeed"("timestamp");

-- CreateIndex
CREATE INDEX "ClientLogo_industry_idx" ON "ClientLogo"("industry");

-- CreateIndex
CREATE INDEX "PageView_path_idx" ON "PageView"("path");

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView"("createdAt");

-- CreateIndex
CREATE INDEX "ConversionEvent_type_idx" ON "ConversionEvent"("type");

-- CreateIndex
CREATE INDEX "ConversionEvent_email_idx" ON "ConversionEvent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_code_key" ON "Promotion"("code");

-- CreateIndex
CREATE INDEX "Promotion_code_idx" ON "Promotion"("code");

-- CreateIndex
CREATE INDEX "Promotion_active_idx" ON "Promotion"("active");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureToggle_featureKey_key" ON "FeatureToggle"("featureKey");

-- CreateIndex
CREATE INDEX "FeatureToggle_featureKey_idx" ON "FeatureToggle"("featureKey");

-- CreateIndex
CREATE INDEX "FeatureToggle_category_idx" ON "FeatureToggle"("category");

-- CreateIndex
CREATE INDEX "AIChatConversation_sessionId_idx" ON "AIChatConversation"("sessionId");

-- CreateIndex
CREATE INDEX "AIChatConversation_visitorEmail_idx" ON "AIChatConversation"("visitorEmail");

-- CreateIndex
CREATE INDEX "AIChatConversation_leadQuality_idx" ON "AIChatConversation"("leadQuality");

-- CreateIndex
CREATE INDEX "ProjectVideo_projectId_idx" ON "ProjectVideo"("projectId");

-- CreateIndex
CREATE INDEX "ProjectVideo_featured_idx" ON "ProjectVideo"("featured");

-- CreateIndex
CREATE INDEX "LivePreview_projectId_idx" ON "LivePreview"("projectId");

-- CreateIndex
CREATE INDEX "ClientRevenue_projectId_idx" ON "ClientRevenue"("projectId");

-- CreateIndex
CREATE INDEX "DevLog_weekStartDate_idx" ON "DevLog"("weekStartDate");

-- CreateIndex
CREATE INDEX "FitScoreResponse_email_idx" ON "FitScoreResponse"("email");

-- CreateIndex
CREATE INDEX "FitScoreResponse_score_idx" ON "FitScoreResponse"("score");

-- CreateIndex
CREATE INDEX "FitScoreResponse_category_idx" ON "FitScoreResponse"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalTemplate_industry_key" ON "ProposalTemplate"("industry");

-- CreateIndex
CREATE INDEX "ProposalTemplate_industry_idx" ON "ProposalTemplate"("industry");

-- CreateIndex
CREATE INDEX "GeneratedProposal_clientEmail_idx" ON "GeneratedProposal"("clientEmail");

-- CreateIndex
CREATE INDEX "GeneratedProposal_status_idx" ON "GeneratedProposal"("status");

-- CreateIndex
CREATE INDEX "PaymentLink_clientEmail_idx" ON "PaymentLink"("clientEmail");

-- CreateIndex
CREATE INDEX "PaymentLink_status_idx" ON "PaymentLink"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_slug_idx" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "Article"("category");

-- CreateIndex
CREATE INDEX "Article_published_idx" ON "Article"("published");

-- CreateIndex
CREATE INDEX "ClientReport_clientEmail_idx" ON "ClientReport"("clientEmail");

-- CreateIndex
CREATE INDEX "OnboardingSubmission_clientEmail_idx" ON "OnboardingSubmission"("clientEmail");

-- CreateIndex
CREATE INDEX "OnboardingSubmission_status_idx" ON "OnboardingSubmission"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectBrief_industry_key" ON "ProjectBrief"("industry");

-- CreateIndex
CREATE INDEX "ProjectBrief_industry_idx" ON "ProjectBrief"("industry");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE INDEX "Subscriber_email_idx" ON "Subscriber"("email");

-- CreateIndex
CREATE INDEX "Subscriber_confirmed_idx" ON "Subscriber"("confirmed");

-- CreateIndex
CREATE UNIQUE INDEX "ClientLocation_city_country_key" ON "ClientLocation"("city", "country");

-- CreateIndex
CREATE UNIQUE INDEX "MiniCourse_slug_key" ON "MiniCourse"("slug");

-- CreateIndex
CREATE INDEX "MiniCourse_slug_idx" ON "MiniCourse"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PremiumTemplate_slug_key" ON "PremiumTemplate"("slug");

-- CreateIndex
CREATE INDEX "PremiumTemplate_slug_idx" ON "PremiumTemplate"("slug");

-- CreateIndex
CREATE INDEX "PremiumTemplate_industry_idx" ON "PremiumTemplate"("industry");

-- CreateIndex
CREATE INDEX "ConsultationBooking_clientEmail_idx" ON "ConsultationBooking"("clientEmail");

-- CreateIndex
CREATE INDEX "ConsultationBooking_status_idx" ON "ConsultationBooking"("status");

-- CreateIndex
CREATE INDEX "ConsultationBooking_preferredDate_idx" ON "ConsultationBooking"("preferredDate");

-- CreateIndex
CREATE INDEX "WebsiteGrade_email_idx" ON "WebsiteGrade"("email");

-- CreateIndex
CREATE INDEX "WebsiteGrade_overallGrade_idx" ON "WebsiteGrade"("overallGrade");

-- CreateIndex
CREATE INDEX "FeatureAnalytics_featureKey_idx" ON "FeatureAnalytics"("featureKey");

-- CreateIndex
CREATE INDEX "FeatureAnalytics_event_idx" ON "FeatureAnalytics"("event");

-- CreateIndex
CREATE INDEX "FeatureAnalytics_createdAt_idx" ON "FeatureAnalytics"("createdAt");

-- CreateIndex
CREATE INDEX "JourneyStep_phaseId_idx" ON "JourneyStep"("phaseId");

-- CreateIndex
CREATE INDEX "JourneyStep_category_idx" ON "JourneyStep"("category");

-- CreateIndex
CREATE INDEX "JourneyStep_order_idx" ON "JourneyStep"("order");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_idx" ON "BlogPost"("status");

-- CreateIndex
CREATE INDEX "ContactSubmission_email_idx" ON "ContactSubmission"("email");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_idx" ON "ContactSubmission"("status");

-- CreateIndex
CREATE INDEX "JourneyPhase_order_idx" ON "JourneyPhase"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_industry_idx" ON "Project"("industry");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Testimonial_approved_idx" ON "Testimonial"("approved");

-- CreateIndex
CREATE INDEX "Testimonial_featured_idx" ON "Testimonial"("featured");

-- AddForeignKey
ALTER TABLE "AdminActivityLog" ADD CONSTRAINT "AdminActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_playgroundId_fkey" FOREIGN KEY ("playgroundId") REFERENCES "Playground"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaygroundSession" ADD CONSTRAINT "PlaygroundSession_playgroundId_fkey" FOREIGN KEY ("playgroundId") REFERENCES "Playground"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JourneyStep" ADD CONSTRAINT "JourneyStep_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "JourneyPhase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

