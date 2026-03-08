import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, X, ArrowRight, Shield, Heart, Users, BookOpen, Car, Droplets } from "lucide-react";

const benefits = [
  { label: "Free funeral services", basic: true, plus: true },
  { label: "Ritual bathing (mandi jenazah)", basic: true, plus: true },
  { label: "Shrouding (kafan)", basic: true, plus: true },
  { label: "Burial arrangement", basic: true, plus: true },
  { label: "Hearse transport", basic: true, plus: true },
  { label: "20% discount on religious courses", basic: true, plus: false },
  { label: "50% discount on religious courses", basic: false, plus: true },
  { label: "Immediate family coverage", basic: false, plus: true },
  { label: "Same-address family included", basic: false, plus: true },
  { label: "50% discount for parents/in-laws", basic: false, plus: true },
  { label: "Extended funeral service coverage", basic: false, plus: true },
];

export default function Plans() {
  const navigate = useNavigate();

  const handleChoosePlan = (planType) => {
    // Map the plan type to the actual plan name
    const planName = planType === 'basic' ? 'Skim Pintar' : 'Skim Pintar Plus';
    
    // Navigate to register with the selected plan in state
    navigate('/register', { 
      state: { selectedPlan: planName }
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f4a33] via-[#1a6b4a] to-[#1e7d56] text-white py-16 px-4">
        <div className="geometric-pattern absolute inset-0 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold text-green-300 uppercase tracking-widest">Membership Plans</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Plans & Benefits</h1>
          <p className="text-green-100 text-lg leading-relaxed">
            Simple, transparent pricing. No hidden fees. Just community care.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16 bg-[#f7f9f7]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skim Pintar */}
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="mb-2">
                <span className="text-xs font-bold bg-green-100 text-[#1a6b4a] px-3 py-1 rounded-full uppercase tracking-wider">Individual</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-4">Skim Pintar</h2>
              <div className="mt-3 mb-2">
                <span className="text-3xl font-normal text-[#1a6b4a]">Starting from </span>
                <span className="text-5xl font-bold text-[#1a6b4a]">$5</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="text-gray-500 text-sm mb-8">Comprehensive individual coverage for yourself</p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Heart, text: "Free funeral services (full rites)" },
                  { icon: Droplets, text: "Ritual bathing & shrouding" },
                  { icon: Car, text: "Burial & hearse transport" },
                  { icon: BookOpen, text: "20% off religious courses" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#1a6b4a]" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleChoosePlan('basic')}
                className="w-full text-center bg-[#1a6b4a] hover:bg-[#0f4a33] text-white font-semibold py-4 rounded-xl transition-colors text-lg"
              >
                Choose Skim Pintar
              </button>
            </div>

            {/* Skim Pintar Plus */}
            <div className="bg-gradient-to-br from-[#1a6b4a] to-[#0f4a33] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="geometric-pattern absolute inset-0" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold bg-[#c9a84c] text-white px-3 py-1 rounded-full uppercase tracking-wider">Family Coverage</span>
                  <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-2">Skim Pintar Plus</h2>
                <div className="mt-3 mb-2">
                  <span className="text-3xl font-normal text-white">Starting from </span>
                  <span className="text-5xl font-bold text-white">$20</span>
                  <span className="text-green-200 ml-1">/month</span>
                </div>
                <p className="text-green-200 text-sm mb-8">All individual benefits + complete family protection</p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: Shield, text: "All Skim Pintar benefits included" },
                    { icon: Users, text: "Immediate family members covered" },
                    { icon: Heart, text: "Same-address family coverage" },
                    { icon: BookOpen, text: "50% off religious courses" },
                    { icon: Heart, text: "50% discount for parents/in-laws" },
                    { icon: Shield, text: "Extended funeral service coverage" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-green-100">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#e8c97a]" />
                      </div>
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleChoosePlan('plus')}
                  className="w-full text-center bg-[#c9a84c] hover:bg-[#b8943e] text-white font-semibold py-4 rounded-xl transition-colors text-lg"
                >
                  Choose Skim Pintar Plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Full Benefits Comparison</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f7f9f7]">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Benefit</th>
                  <th className="text-center py-4 px-4 font-semibold text-[#1a6b4a]">Skim Pintar<br/><span className="font-normal text-gray-500 text-xs">$5/mth</span></th>
                  <th className="text-center py-4 px-4 font-semibold text-[#1a6b4a] bg-green-50">Skim Pintar Plus<br/><span className="font-normal text-gray-500 text-xs">$20+/mth</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {benefits.map(({ label, basic, plus }) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700">{label}</td>
                    <td className="py-4 px-4 text-center">
                      {basic ? <CheckCircle className="w-5 h-5 text-[#1a6b4a] mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                    </td>
                    <td className="py-4 px-4 text-center bg-green-50/50">
                      {plus ? <CheckCircle className="w-5 h-5 text-[#1a6b4a] mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GIRO info */}
      <section className="py-16 bg-[#f7f9f7]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💳 About GIRO Payment</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Monthly contributions are collected via GIRO (General Interbank Recurring Order), a safe and convenient electronic payment method. Your contribution is deducted automatically each month — no hassle, no missed payments.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { title: "Accepted Banks", desc: "DBS/POSB, OCBC, UOB, Standard Chartered, Maybank, and more" },
                { title: "Deduction Date", desc: "5th of each month (or next business day)" },
                { title: "Grace Period", desc: "7 days grace period if deduction fails" },
                { title: "Notifications", desc: "SMS and email alerts before and after deduction" },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-[#f7f9f7] rounded-xl p-4">
                  <div className="font-semibold text-gray-900 mb-1 text-sm">{title}</div>
                  <div className="text-sm text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 text-center bg-[#1a6b4a]">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to get protected?</h2>
        <button
          onClick={() => handleChoosePlan('basic')}
          className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-xl"
        >
          Register Today <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
}