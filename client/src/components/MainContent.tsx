"use client";

import dynamic from "next/dynamic";
import { getApiUrl } from "@/lib/api";

import SectionSkeleton from "@/components/SectionSkeleton";
import ViewportReveal from "./ViewportReveal";

// Dynamic imports for below-the-fold components to improve initial load performance
const About = dynamic(() => import("@/components/About"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const Projects = dynamic(() => import("@/components/Projects"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const TrustSignals = dynamic(() => import("@/components/TrustSignals"), {
    loading: () => <div className="h-24 bg-black/20 animate-pulse" />
});
const Skills = dynamic(() => import("@/components/Skills"), {
    loading: () => <SectionSkeleton minHeight="300px" />
});
const Services = dynamic(() => import("@/components/Services"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Process = dynamic(() => import("@/components/Process"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const StatsDashboard = dynamic(() => import("@/components/StatsDashboard"), {
    loading: () => <SectionSkeleton minHeight="400px" hasSubtitle={false} />
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const MyJourney = dynamic(() => import("@/components/MyJourney"), {
    loading: () => <SectionSkeleton minHeight="800px" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <div className="h-40 bg-black/20 animate-pulse" />
});
const HireMeCTA = dynamic(() => import("@/components/HireMeCTA"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const DeveloperHub = dynamic(() => import("@/components/features/DeveloperHub"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const RecruiterView = dynamic(() => import("@/components/features/RecruiterView"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const ViralROIEngine = dynamic(() => import("@/components/features/ViralROIEngine"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const RevenueDashboard = dynamic(() => import("@/components/features/RevenueDashboard"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const TechRadar = dynamic(() => import("@/components/features/TechRadar"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const BeforeAfter = dynamic(() => import("@/components/features/BeforeAfter"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const MilestoneTracker = dynamic(() => import("@/components/features/MilestoneTracker"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const AchievementBadges = dynamic(() => import("@/components/features/AchievementBadges"), {
    loading: () => <SectionSkeleton minHeight="200px" />
});
const ClientMap = dynamic(() => import("@/components/features/ClientMap"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const QRBusinessCard = dynamic(() => import("@/components/features/QRBusinessCard"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const NewsletterHook = dynamic(() => import("@/components/features/NewsletterHook"), {
    loading: () => <SectionSkeleton minHeight="300px" />
});
const ReferralHook = dynamic(() => import("@/components/features/ReferralHook"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});

export default function MainContent() {
    return (
        <>
            <ViewportReveal><About /></ViewportReveal>
            <ViewportReveal><Services /></ViewportReveal>
            <ViewportReveal><Process /></ViewportReveal>
            <ViewportReveal><BeforeAfter /></ViewportReveal>
            <ViewportReveal><CaseStudies /></ViewportReveal>
            <ViewportReveal><Projects /></ViewportReveal>
            <ViewportReveal><HireMeCTA /></ViewportReveal>
            <ViewportReveal><StatsDashboard /></ViewportReveal>
            <ViewportReveal><TechRadar /></ViewportReveal>
            <ViewportReveal><Skills /></ViewportReveal>
            <ViewportReveal><TrustSignals /></ViewportReveal>
            <ViewportReveal><AchievementBadges /></ViewportReveal>
            <ViewportReveal><Testimonials /></ViewportReveal>
            <ViewportReveal><Pricing /></ViewportReveal>
            <ViewportReveal><MyJourney /></ViewportReveal>
            <ViewportReveal><MilestoneTracker /></ViewportReveal>
            <ViewportReveal><DeveloperHub /></ViewportReveal>
            <ViewportReveal><RevenueDashboard /></ViewportReveal>
            <ViewportReveal><ViralROIEngine /></ViewportReveal>
            <ViewportReveal><RecruiterView /></ViewportReveal>
            <ViewportReveal><NewsletterHook /></ViewportReveal>
            <ViewportReveal><ClientMap /></ViewportReveal>
            <ViewportReveal><QRBusinessCard /></ViewportReveal>
            <ViewportReveal><ReferralHook /></ViewportReveal>
            <ViewportReveal><Contact /></ViewportReveal>
            <Footer />
        </>
    )
}

