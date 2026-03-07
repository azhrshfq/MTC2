import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, ArrowRight, Shield, Heart, Users, Clock, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0f4a33] via-[#1a6b4a] to-[#1e7d56] text-white overflow-hidden">
        <div className="geometric-pattern absolute inset-0" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6"
            >
              <span className="w-2 h-2 bg-[#c9a84c] rounded-full animate-pulse" />
              Masjid Ar-Raudhah Community Welfare Programme
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              Protecting Your Family,{" "}
              <span className="text-[#e8c97a]">Together.</span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg text-green-100 mb-8 leading-relaxed"
            >
              Skim Pintar is an affordable community welfare programme providing complimentary funeral services and financial security for Muslim families in Singapore — starting from just $5/month.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to={createPageUrl("Register")}
                className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Register Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl("Plans")}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all"
              >
                View Plans
              </Link>
            </motion.div>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="flex flex-wrap gap-6 mt-10 text-sm text-green-200"
            >
              {["No joining fee", "Cancel anytime", "GIRO payment", "Shariah compliant"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#c9a84c]" /> {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "5,000+", label: "Active Members" },
              { num: "$5/mth", label: "Starting From" },
              { num: "24hr", label: "Digital Processing" },
              { num: "100%", label: "Community-Driven" },
            ].map((s) => (
              <div key={s.label} className="py-3">
                <div className="text-2xl font-bold text-[#1a6b4a]">{s.num}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Skim Pintar */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">About the Programme</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What is Skim Pintar?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Skim Pintar is Masjid Ar-Raudhah's community welfare membership programme — a shared safety net where members contribute monthly to ensure that every Muslim family is cared for during life's most challenging moments.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Rooted in the Islamic principle of <em>ta'awun</em> (mutual assistance), the programme covers funeral services, ritual preparations, and provides discounts on religious education — all for a modest monthly contribution.
              </p>
              <div className="space-y-3">
                {[
                  "Complimentary funeral services for members",
                  "Coverage for immediate family members (Plus plan)",
                  "Discounts on Islamic courses and programmes",
                  "No complicated eligibility criteria",
                  "Community-run, transparent, and trustworthy",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1a6b4a] mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to={createPageUrl("About")}
                className="inline-flex items-center gap-2 text-[#1a6b4a] font-semibold mt-8 hover:gap-3 transition-all"
              >
                Learn more about our mission <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Financial Security", desc: "Coverage when your family needs it most", color: "bg-green-50 text-[#1a6b4a]" },
                { icon: Heart, title: "Dignified Farewell", desc: "Full funeral rites in accordance with Islam", color: "bg-amber-50 text-amber-700" },
                { icon: Users, title: "Family Coverage", desc: "Protect your entire household", color: "bg-teal-50 text-teal-700" },
                { icon: Star, title: "Religious Growth", desc: "Discounts on courses and programmes", color: "bg-purple-50 text-purple-700" },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">Membership Plans</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Choose Your Coverage</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Two simple plans designed to protect you and the people you love most.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="rounded-3xl border-2 border-gray-200 bg-white p-8 hover:border-[#1a6b4a] hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">Skim Pintar</h3>
                <div className="mt-3">
                  <span className="text-4xl font-bold text-[#1a6b4a]">$5</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Individual coverage for yourself</p>
              </div>
              <ul className="space-y-3 mb-8">
                {["Free funeral services", "Ritual bathing & shrouding", "Burial & transport services", "20% off religious courses"].map(b => (
                  <li key={b} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#1a6b4a] shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <Link to={createPageUrl("Register")} className="block text-center bg-[#1a6b4a] hover:bg-[#0f4a33] text-white font-semibold py-3 rounded-xl transition-colors">
                Get Started
              </Link>
            </div>

            {/* Plus */}
            <div className="rounded-3xl border-2 border-[#1a6b4a] bg-gradient-to-br from-[#1a6b4a] to-[#0f4a33] text-white p-8 shadow-xl relative overflow-hidden">
              <div className="geometric-pattern absolute inset-0" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Skim Pintar Plus</h3>
                  <span className="bg-[#c9a84c] text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                </div>
                <div className="mt-0">
                  <span className="text-4xl font-bold">$20+</span>
                  <span className="text-green-200">/month</span>
                </div>
                <p className="text-sm text-green-200 mt-2">Family coverage for everyone at home</p>
                <ul className="space-y-3 my-8">
                  {["All Skim Pintar benefits", "Coverage for immediate family", "Same-address family included", "50% discount for parents/in-laws", "Extended funeral service coverage"].map(b => (
                    <li key={b} className="flex items-center gap-2 text-green-100 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#e8c97a] shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <Link to={createPageUrl("Register")} className="block text-center bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold py-3 rounded-xl transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to={createPageUrl("Plans")} className="inline-flex items-center gap-2 text-[#1a6b4a] font-semibold hover:gap-3 transition-all">
              See full plan comparison <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How to Join</h2>
            <p className="text-gray-500 mt-3">Fully digital. Takes less than 10 minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "📝", title: "Fill in Form", desc: "Complete the online registration with your personal and banking details." },
              { step: "02", icon: "📎", title: "Upload NRIC", desc: "Upload a photo of your NRIC for identity verification — no physical documents needed." },
              { step: "03", icon: "⏱️", title: "Fast Review", desc: "Our team reviews your application digitally within 24 hours to 7 days." },
              { step: "04", icon: "✅", title: "You're Covered", desc: "Receive your membership confirmation and GIRO is set up automatically." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a6b4a] text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow">{step}</div>
                <div className="text-3xl mt-4 mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to={createPageUrl("Register")}
              className="inline-flex items-center gap-2 bg-[#1a6b4a] hover:bg-[#0f4a33] text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg"
            >
              Start Registration <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#c9a84c] to-[#b8943e]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Secure Your Family's Future?</h2>
          <p className="text-amber-100 mb-8 text-lg">Join thousands of families who trust Skim Pintar for peace of mind.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={createPageUrl("Register")} className="inline-flex items-center justify-center gap-2 bg-white text-[#1a6b4a] font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg">
              Register Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to={createPageUrl("About")} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}