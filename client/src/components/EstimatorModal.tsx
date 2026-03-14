"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Calculator, Zap, Shield, Rocket, Check, Globe, Layout, Database, Mail, PieChart, Sparkles, FileKey, ArrowRight } from "lucide-react";

interface EstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    title: "Project Type",
    description: "Choose the foundation of your digital product.",
    options: [
      { id: "landing", label: "Landing Page / MVP", base: 15000, icon: Zap, color: "text-blue-400" },
      { id: "business", label: "Business Website", base: 35000, icon: Globe, color: "text-emerald-400" },
      { id: "saas", label: "SaaS / Web App", base: 80000, icon: Database, color: "text-indigo-400" },
      { id: "ecommerce", label: "E-Commerce", base: 55000, icon: Rocket, color: "text-orange-400" },
    ]
  },
  {
    title: "Key Features",
    description: "What technical components does your product require?",
    options: [
      { id: "auth", label: "User Authentication", price: 12000, icon: FileKey },
      { id: "cms", label: "Content Management (CMS)", price: 15000, icon: Layout },
      { id: "analytics", label: "Advanced Analytics", price: 8000, icon: PieChart },
      { id: "email", label: "Automated Workflows", price: 10000, icon: Mail },
    ]
  },
  {
    title: "Timeline",
    description: "When do you need to enter the market?",
    options: [
      { id: "rush", label: "Rush (1-2 Weeks)", mult: 1.4, desc: "Priority priority queue" },
      { id: "standard", label: "Standard (3-5 Weeks)", mult: 1.0, desc: "Balanced delivery" },
      { id: "flexible", label: "Flexible (6+ Weeks)", mult: 0.9, desc: "Cost-optimized" },
    ]
  }
];

export default function EstimatorModal({ isOpen, onClose }: EstimatorModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<any>({
    projectType: null,
    features: [],
    timeline: "standard"
  });
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);

  const calculateTotal = () => {
    let total = selections.projectType?.base || 0;
    selections.features.forEach((f: any) => total += f.price);
    const timelineMult = (STEPS[2].options.find(o => o.id === selections.timeline) as any)?.mult || 1;
    return Math.round(total * timelineMult);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleFeature = (feature: any) => {
    const exists = selections.features.find((f: any) => f.id === feature.id);
    if (exists) {
      setSelections({ ...selections, features: selections.features.filter((f: any) => f.id !== feature.id) });
    } else {
      setSelections({ ...selections, features: [...selections.features, feature] });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      <m.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-[#080808] border border-white/ client-generating-gradient rounded-[3rem] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
               <Calculator size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Smart_Estimator_Engine</h2>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">V-PRICING_01 // REALTIME_INTEL</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-10">
          {!showResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Progress Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-6">
                  {STEPS.map((step, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        currentStep === i ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" : 
                        currentStep > i ? "bg-white/10 border-white/20 text-blue-400" : "bg-transparent border-white/5 text-gray-700"
                      }`}>
                        {currentStep > i ? <Check size={14} /> : i + 1}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${currentStep === i ? "text-white" : "text-gray-600"}`}>Step_{i + 1}</p>
                        <p className={`text-xs font-bold ${currentStep === i ? "text-blue-400" : "text-gray-700"}`}>{step.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 italic">
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-widest mb-3 italic">Strategy_Insight</p>
                    <p className="text-[11px] text-gray-400 font-medium">Selecting the right foundation ensures long-term scalability and minimizes architectural debt.</p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="lg:col-span-8 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">{STEPS[currentStep].title}</h3>
                   <p className="text-gray-500 font-medium">{STEPS[currentStep].description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STEPS[currentStep].options.map((option: any) => (
                    <m.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (currentStep === 0) setSelections({...selections, projectType: option});
                        if (currentStep === 1) toggleFeature(option);
                        if (currentStep === 2) setSelections({...selections, timeline: option.id});
                      }}
                      className={`p-6 rounded-[2rem] border text-left transition-all ${
                        (currentStep === 0 && selections.projectType?.id === option.id) ||
                        (currentStep === 1 && selections.features.find((f: any) => f.id === option.id)) ||
                        (currentStep === 2 && selections.timeline === option.id)
                          ? "bg-blue-600/10 border-blue-500 shadow-xl shadow-blue-600/10" 
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                         <div className={`p-3 rounded-xl bg-white/5 ${option.color || "text-blue-400"}`}>
                            <option.icon size={20} />
                         </div>
                         {(currentStep === 0 && selections.projectType?.id === option.id) ||
                          (currentStep === 1 && selections.features.find((f: any) => f.id === option.id)) ||
                          (currentStep === 2 && selections.timeline === option.id) ? (
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                               <Check size={14} />
                            </div>
                          ) : null}
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">{option.label}</h4>
                      {option.price && <p className="text-[10px] text-blue-500 font-black mt-1">+ INR {option.price.toLocaleString()}</p>}
                    </m.button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-white/5">
                  <button 
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors disabled:opacity-0"
                  >
                    <ChevronLeft size={16} /> Previous_Vector
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={currentStep === 0 && !selections.projectType}
                    className="flex items-center gap-3 px-10 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                  >
                    {currentStep === STEPS.length - 1 ? "Generate Intel" : "Next_Vector"} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-12">
               <div className="flex flex-col items-center gap-6">
                 <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/20">
                   <Sparkles size={40} className="animate-pulse" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase">ESTIMATE://GENERATED</h3>
                   <p className="text-sm text-gray-500 font-medium">Intellectual property protection enabled. Your custom quote is ready.</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/5 space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">Base_Investment_Range</p>
                     <p className="text-4xl font-black text-white italic tracking-tighter">
                        INR {(calculateTotal() * 0.9).toLocaleString()} - {(calculateTotal() * 1.1).toLocaleString()}
                     </p>
                  </div>
                  <div className="p-8 rounded-[3rem] bg-blue-600/5 border border-blue-500/20 space-y-2 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-blue-600/5 animate-pulse" />
                     <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 relative z-10">Projected_ROI_Velocity</p>
                     <p className="text-4xl font-black text-blue-400 italic tracking-tighter relative z-10">4.5x - 7.2x</p>
                  </div>
               </div>

               <div className="max-w-md mx-auto space-y-6 pt-10">
                  <div className="space-y-4">
                    <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.2em]">Unlock Comprehensive Intelligence Briefing</p>
                    <div className="relative group">
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="secure@company.com" 
                         className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                       />
                       <button className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2">
                          Secure Intel <ArrowRight size={14} />
                       </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-600 font-medium italic">
                    By securing your intel, you agree to receive a technical deep-dive and a priority consultation path. No spam, only engineering excellence.
                  </p>
               </div>
            </div>
          )}
        </div>
      </m.div>
    </div>
  );
}
