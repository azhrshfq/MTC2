import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    emoji: "🚀",
    title: "Move with Purpose",
    description: "We ship fast, but never recklessly. Every decision is intentional and backed by curiosity.",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
  },
  {
    emoji: "🤝",
    title: "Trust by Default",
    description: "We assume good intentions and give autonomy. Micromanagement has no place here.",
    color: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-50",
  },
  {
    emoji: "🌱",
    title: "Grow Together",
    description: "Your growth is our growth. We invest in learning, mentorship, and honest feedback.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
  },
  {
    emoji: "💬",
    title: "Radical Transparency",
    description: "Open books, open doors, open minds. We share context so everyone can make great decisions.",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
  {
    emoji: "✨",
    title: "Craft with Care",
    description: "Details matter. Whether it's code, design, or a Slack message — we take pride in our craft.",
    color: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50",
  },
];

export default function ValuesStep({ onNext, onBack }) {
  const [revealedCards, setRevealedCards] = useState([]);

  const toggleCard = (index) => {
    setRevealedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allRevealed = revealedCards.length === values.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          Our Core Values
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          These aren't just words on a wall — they guide everything we do. Tap each card to explore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {values.map((value, index) => {
          const isRevealed = revealedCards.includes(index);
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleCard(index)}
              className={cn(
                "relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 min-h-[180px] flex flex-col",
                isRevealed
                  ? "border-transparent shadow-lg"
                  : "border-slate-200 hover:border-slate-300 hover:shadow-md bg-white"
              )}
            >
              {isRevealed && (
                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5", value.color)} />
              )}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl", value.bgLight)}>
                    {value.emoji}
                  </div>
                  {isRevealed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </motion.div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <AnimatePresence>
                  {isRevealed && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-slate-500 leading-relaxed"
                    >
                      {value.description}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!isRevealed && (
                  <p className="text-xs text-slate-400 mt-1">Tap to reveal</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {!allRevealed && (
            <span className="text-sm text-slate-400">
              {revealedCards.length}/{values.length} explored
            </span>
          )}
          <Button
            onClick={onNext}
            disabled={!allRevealed}
            className={cn(
              "rounded-xl px-6 transition-all",
              allRevealed
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