"use client";

import dynamic from "next/dynamic";
import { getApiUrl } from "@/lib/api";

import SectionSkeleton from "@/components/SectionSkeleton";
import TechMarquee from "./TechMarquee";
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
const StatsDashboard = dynamic(() => import("@/components/StatsDashboard"), {
    loading: () => <SectionSkeleton minHeight="400px" hasSubtitle={false} />
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const FeatureSuggestion = dynamic(() => import("@/components/FeatureSuggestion"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const DiagnosticTool = dynamic(() => import("@/components/DiagnosticTool"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Blog = dynamic(() => import("@/components/Blog"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const MyJourney = dynamic(() => import("@/components/MyJourney"), {
    loading: () => <SectionSkeleton minHeight="800px" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const WhyWorkWithMe = dynamic(() => import("@/components/WhyWorkWithMe"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Process = dynamic(() => import("@/components/Process"), {
    loading: () => <SectionSkeleton minHeight="800px" />
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
const ReferralSystem = dynamic(() => import("@/components/ReferralSystem"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});
const LeadMagnet = dynamic(() => import("@/components/LeadMagnet"), {
    loading: () => <SectionSkeleton minHeight="400px" />
});

export default function MainContent() {
    const fetcher = async (url: string) => {
        const res = await fetch(getApiUrl(url));
        const json = await res.json();
        if (!res.ok || json.success === false) throw new Error(json.error || "Fetch failed");
        return json.success ? json.data : json;
    };

    return (
        <>
            <ViewportReveal><About /></ViewportReveal>
            <ViewportReveal><CaseStudies /></ViewportReveal>
            <ViewportReveal><Projects /></ViewportReveal>
            <ViewportReveal><HireMeCTA /></ViewportReveal>
            <ViewportReveal><TrustSignals /></ViewportReveal>
            <TechMarquee />
            <ViewportReveal><Skills /></ViewportReveal>
            <ViewportReveal><StatsDashboard /></ViewportReveal>
            <ViewportReveal><Services /></ViewportReveal>
            <ViewportReveal><WhyWorkWithMe /></ViewportReveal>
            <ViewportReveal><Process /></ViewportReveal>
            <ViewportReveal><Pricing /></ViewportReveal>
            <ViewportReveal><LeadMagnet /></ViewportReveal>
            <ViewportReveal><Blog /></ViewportReveal>
            <ViewportReveal><ReferralSystem /></ViewportReveal>
            <ViewportReveal><FeatureSuggestion /></ViewportReveal>
            <ViewportReveal><MyJourney /></ViewportReveal>
            <ViewportReveal><DiagnosticTool /></ViewportReveal>
            <ViewportReveal><Contact /></ViewportReveal>
            <Footer />
        </>
    )
}

