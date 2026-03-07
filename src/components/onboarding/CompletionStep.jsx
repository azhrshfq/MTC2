import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PartyPopper, Rocket, ArrowLeft } from "lucide-react";

function ConfettiPiece({ index }) {
  const colors = ["#8B5CF6", "#6366F1", "#F59E0B", "#10B981", "#EC4899", "#3B82F6"];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 2 + Math.random() * 2;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        left: `${left}%`,
        top: -20,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{
        y: [0, 600],
        rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [1, 1, 0],
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration,
        delay,
        ease: "easeIn",
      }}
    />
  );
}

export default function CompletionStep({ onBack, onRestart }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 max-w-3xl mx-auto relative overflow-hidden"
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </div>
      )}

      <motion.div
        className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-8 shadow-xl shadow-emerald-200/50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <PartyPopper className="w-14 h-14 text-white" />
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        You're All Set! 🎉
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-slate-500 mb-4 max-w-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        You've completed your onboarding journey. Welcome to the team — we can't wait to see what we'll build together.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg my-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {[
          { emoji: "✅", text: "Values explored" },
          { emoji: "📋", text: "Policies reviewed" },
          { emoji: "🤝", text: "Team introduced" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-sm font-medium text-slate-600">{item.text}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
      >
        <Button
          variant="outline"
          onClick={onRestart}
          className="rounded-xl px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Review Again
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-violet-200/50 transition-all hover:shadow-2xl hover:shadow-violet-300/50"
          onClick={() => window.location.reload()}
        >
          <Rocket className="w-5 h-5 mr-2" />
          Go to Dashboard
        </Button>
      </motion.div>
    </motion.div>
  );
}