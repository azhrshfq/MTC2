import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamStep({ members, onNext, onBack }) {
  const [selectedMember, setSelectedMember] = useState(null);

  const departmentColors = {
    Leadership: "bg-amber-100 text-amber-700",
    Engineering: "bg-blue-100 text-blue-700",
    People: "bg-pink-100 text-pink-700",
    Design: "bg-purple-100 text-purple-700",
    Sales: "bg-emerald-100 text-emerald-700",
  };

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
          Meet the Team
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Here are some of the amazing people you'll be working with. Click to learn more!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => setSelectedMember(member)}
            className="group cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <img
                src={member.photo_url}
                alt={member.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{member.name}</h3>
                <p className="text-sm text-slate-500 truncate">{member.role}</p>
                <span className={cn(
                  "inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-2",
                  departmentColors[member.department] || "bg-slate-100 text-slate-600"
                )}>
                  {member.department}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Member detail modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedMember.photo_url}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-3xl object-cover shadow-lg mb-5"
                />
                <h3 className="text-2xl font-bold text-slate-900">{selectedMember.name}</h3>
                <p className="text-violet-600 font-medium">{selectedMember.role}</p>
                <span className={cn(
                  "inline-block text-xs font-medium px-3 py-1 rounded-full mt-2",
                  departmentColors[selectedMember.department] || "bg-slate-100 text-slate-600"
                )}>
                  {selectedMember.department}
                </span>

                {selectedMember.bio && (
                  <p className="text-slate-500 mt-5 leading-relaxed">{selectedMember.bio}</p>
                )}

                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Say Hello
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-slate-500">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={onNext}
          className="rounded-xl px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-200/50"
        >
          Almost Done! <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}