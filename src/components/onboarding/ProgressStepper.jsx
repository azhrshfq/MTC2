import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Welcome", emoji: "👋" },
  { label: "Values", emoji: "💡" },
  { label: "Policies", emoji: "📋" },
  { label: "Team", emoji: "🤝" },
  { label: "Complete", emoji: "🎉" },
];

export default function ProgressStepper({ currentStep, completedSteps = [] }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200" />
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          const isPast = index < currentStep;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  isCurrent && "bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-500 text-white shadow-lg shadow-violet-200",
                  isPast && "bg-violet-100 border-violet-400 text-violet-600",
                  !isCurrent && !isPast && "bg-white border-slate-200 text-slate-400"
                )}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isPast ? <Check className="w-4 h-4" /> : step.emoji}
              </motion.div>
              <span className={cn(
                "text-xs mt-2 font-medium hidden sm:block",
                isCurrent ? "text-violet-700" : isPast ? "text-violet-500" : "text-slate-400"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}