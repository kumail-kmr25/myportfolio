"use client";

import dynamic from "next/dynamic";


import SectionSkeleton from "@/components/SectionSkeleton";

// Dynamic imports for below-the-fold components to improve initial load performance
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
const Projects = dynamic(() => import("@/components/Projects"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
    loading: () => <SectionSkeleton minHeight="500px" />
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
const About = dynamic(() => import("@/components/About"), {
    loading: () => <SectionSkeleton minHeight="500px" />
});
const HireMeCTA = dynamic(() => import("@/components/HireMeCTA"), {
    loading: () => <SectionSkeleton minHeight="300px" hasTitle={false} hasSubtitle={false} />
});
const MyJourney = dynamic(() => import("@/components/MyJourney"), {
    loading: () => <SectionSkeleton minHeight="800px" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <div className="h-40 bg-black/20 animate-pulse" />
});

export default function MainContent() {
    return (
        <>
            <TrustSignals />
            <Skills />
            <Projects />
            <CaseStudies />
            <StatsDashboard />
            <Testimonials />
            <Services />
            <About />
            <Blog />
            <FeatureSuggestion />
            <MyJourney />
            <DiagnosticTool />
            <HireMeCTA />
            <Contact />
            <Footer />
        </>
    )
}

