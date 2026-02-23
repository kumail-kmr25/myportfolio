"use client";

import dynamic from "next/dynamic";
import SectionReveal from "@/components/SectionReveal";

import SectionSkeleton from "@/components/SectionSkeleton";

// Dynamic imports for below-the-fold components to improve TBT and initial load performance
const Skills = dynamic(() => import("@/components/Skills"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="300px" />
});
const Services = dynamic(() => import("@/components/Services"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="600px" />
});
const StatsDashboard = dynamic(() => import("@/components/StatsDashboard"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="400px" hasSubtitle={false} />
});
const Projects = dynamic(() => import("@/components/Projects"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="800px" />
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="500px" />
});
const FeatureSuggestion = dynamic(() => import("@/components/FeatureSuggestion"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="400px" />
});
const DiagnosticTool = dynamic(() => import("@/components/DiagnosticTool"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Blog = dynamic(() => import("@/components/Blog"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="600px" />
});
const About = dynamic(() => import("@/components/About"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="500px" />
});
const HireMeCTA = dynamic(() => import("@/components/HireMeCTA"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="300px" hasTitle={false} hasSubtitle={false} />
});
const Contact = dynamic(() => import("@/components/Contact"), {
    ssr: false,
    loading: () => <SectionSkeleton minHeight="600px" />
});
const Footer = dynamic(() => import("@/components/Footer"), {
    ssr: false,
    loading: () => <div className="h-40 bg-black/20 animate-pulse" />
});

export default function MainContent() {
    return (
        <>
            <SectionReveal><Skills /></SectionReveal>
            <SectionReveal><StatsDashboard /></SectionReveal>
            <SectionReveal><Projects /></SectionReveal>
            <SectionReveal><CaseStudies /></SectionReveal>
            <SectionReveal><Testimonials /></SectionReveal>
            <SectionReveal><FeatureSuggestion /></SectionReveal>
            <SectionReveal><DiagnosticTool /></SectionReveal>
            <SectionReveal><Blog /></SectionReveal>
            <SectionReveal><Services /></SectionReveal>
            <SectionReveal><About /></SectionReveal>
            <SectionReveal><HireMeCTA /></SectionReveal>
            <SectionReveal><Contact /></SectionReveal>
            <Footer />
        </>
    )
}
