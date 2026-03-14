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

export default function MainContent() {
    return (
        <>
            <ViewportReveal><About /></ViewportReveal>
            <ViewportReveal><Services /></ViewportReveal>
            <ViewportReveal><CaseStudies /></ViewportReveal>
            <ViewportReveal><Projects /></ViewportReveal>
            <ViewportReveal><HireMeCTA /></ViewportReveal>
            <ViewportReveal><StatsDashboard /></ViewportReveal>
            <ViewportReveal><Skills /></ViewportReveal>
            <ViewportReveal><TrustSignals /></ViewportReveal>
            <ViewportReveal><Testimonials /></ViewportReveal>
            <ViewportReveal><Pricing /></ViewportReveal>
            <ViewportReveal><MyJourney /></ViewportReveal>
            <ViewportReveal><Contact /></ViewportReveal>
            <Footer />
        </>
    )
}

