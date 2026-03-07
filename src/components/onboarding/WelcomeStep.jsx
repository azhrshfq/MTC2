import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function WelcomeStep({ onNext }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.full_name) {
        setUserName(user.full_name.split(" ")[0]);
      }
    }).catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 max-w-3xl mx-auto"
    >
      <motion.div
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-8 shadow-xl shadow-amber-200/50"
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <span className="text-5xl">👋</span>
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome{userName ? `, ${userName}` : ""}!
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-slate-500 mb-3 max-w-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        We're thrilled to have you join our team. This short journey will help you get to know us — our culture, values, and the amazing people you'll be working with.
      </motion.p>

      <motion.div
        className="flex items-center gap-2 text-sm text-violet-600 bg-violet-50 px-4 py-2 rounded-full mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Sparkles className="w-4 h-4" />
        <span>Takes about 5 minutes</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          size="lg"
          onClick={onNext}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-xl shadow-violet-200/50 transition-all hover:shadow-2xl hover:shadow-violet-300/50 hover:-translate-y-0.5"
        >
          Let's Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[
          { num: "150+", label: "Team Members" },
          { num: "12", label: "Countries" },
          { num: "2019", label: "Founded" },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-bold text-slate-800">{stat.num}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}