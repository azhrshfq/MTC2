import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronDown, CheckCircle2, Home, Calendar, Heart, Gift, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

const iconMap = {
  Home, Calendar, Heart, Gift, Shield,
};

export default function PoliciesStep({ policies, onNext, onBack, acknowledgedPolicies, onAcknowledge }) {
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const sortedPolicies = [...policies].sort((a, b) => (a.order || 0) - (b.order || 0));
  const allAcknowledged = sortedPolicies.every((p) => acknowledgedPolicies.includes(p.id));

  const categoryColors = {
    workplace: "text-blue-600 bg-blue-50",
    time_off: "text-green-600 bg-green-50",
    conduct: "text-rose-600 bg-rose-50",
    benefits: "text-amber-600 bg-amber-50",
    security: "text-purple-600 bg-purple-50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          Key Policies
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Review each policy and acknowledge you've read it. Don't worry — no pop quiz!
        </p>
      </div>

      <div className="space-y-3 mb-10">
        {sortedPolicies.map((policy, index) => {
          const isExpanded = expandedPolicy === policy.id;
          const isAcknowledged = acknowledgedPolicies.includes(policy.id);
          const Icon = iconMap[policy.icon] || Heart;
          const colorClass = categoryColors[policy.category] || "text-slate-600 bg-slate-50";

          return (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "rounded-2xl border-2 overflow-hidden transition-all duration-300",
                isAcknowledged ? "border-green-200 bg-green-50/30" : "border-slate-200 bg-white",
                isExpanded && "shadow-lg"
              )}
            >
              <button
                onClick={() => setExpandedPolicy(isExpanded ? null : policy.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", colorClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{policy.title}</h3>
                  <p className="text-sm text-slate-400 truncate">{policy.summary}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {isAcknowledged && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  <ChevronDown className={cn(
                    "w-5 h-5 text-slate-400 transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-slate-100">
                      <div className="prose prose-sm prose-slate max-w-none mt-4 mb-5">
                        <ReactMarkdown>{policy.full_content}</ReactMarkdown>
                      </div>
                      {!isAcknowledged && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAcknowledge(policy.id);
                          }}
                          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          I've Read This
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {!allAcknowledged && (
            <span className="text-sm text-slate-400">
              {acknowledgedPolicies.length}/{sortedPolicies.length} acknowledged
            </span>
          )}
          <Button
            onClick={onNext}
            disabled={!allAcknowledged}
            className={cn(
              "rounded-xl px-6 transition-all",
              allAcknowledged
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200/50"
                : ""
            )}
          >
            Continue <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}