import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useState } from "react";
import { ChevronDown, ArrowRight, Heart, Users, BookOpen, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Who can join Skim Pintar?",
    a: "Skim Pintar is open to all Muslim families in Singapore, regardless of whether you are a Masjid Ar-Raudhah regular or not. Both Singaporeans and Permanent Residents are welcome to apply."
  },
  {
    q: "How long does the application take?",
    a: "With our new digital platform, applications are typically processed within 1–7 working days. You will receive real-time updates via SMS and email throughout the process."
  },
  {
    q: "Can I cancel my membership at any time?",
    a: "Yes, you may cancel your membership at any time by contacting our office. Note that cancellation will result in the loss of coverage. There is no penalty for cancellation."
  },
  {
    q: "What happens if my GIRO deduction fails?",
    a: "You will be notified immediately via SMS and email. A grace period of 7 days is given to resolve the issue. If unresolved within the grace period, your membership may be temporarily suspended. You can easily reactivate it once payment is made."
  },
  {
    q: "Does the Skim Pintar Plus cover all family members?",
    a: "Skim Pintar Plus covers immediate family members residing at the same address. Parents and parents-in-law are covered at a 50% discounted rate. The final monthly amount depends on the number of family members added."
  },
  {
    q: "What funeral services are covered?",
    a: "The programme covers the full suite of Islamic funeral services — including ritual bathing (mandi jenazah), shrouding (kafan), burial arrangements, and hearse transport. All services are performed in accordance with Islamic rites."
  },
  {
    q: "Are religious course discounts available immediately after joining?",
    a: "Yes! Once your membership is active, your discount (20% for Skim Pintar, 50% for Skim Pintar Plus) applies to all eligible courses and programmes organised by Masjid Ar-Raudhah."
  },
  {
    q: "Can I upgrade from Skim Pintar to Skim Pintar Plus?",
    a: "Yes, you may upgrade your plan at any time by contacting our office. The new rate will take effect from the following month's GIRO deduction."
  },
  {
    q: "Is my personal data safe?",
    a: "Absolutely. All personal data is collected and handled in accordance with Singapore's Personal Data Protection Act (PDPA). Your data is used solely for membership administration and is never shared with third parties."
  },
  {
    q: "What documents do I need to register?",
    a: "You will need a clear photo or scan of your NRIC (front) and your bank account details for GIRO setup. No physical documents or visits to the mosque are needed for the digital application."
  },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-gray-900 text-base">{q}</span>
        <ChevronDown className={cn("w-5 h-5 text-[#1a6b4a] shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f4a33] via-[#1a6b4a] to-[#1e7d56] text-white py-16 px-4 relative overflow-hidden">
        <div className="geometric-pattern absolute inset-0" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold text-green-300 uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">About Skim Pintar</h1>
          <p className="text-green-100 text-lg leading-relaxed max-w-2xl mx-auto">
            A community welfare programme rooted in Islamic values of compassion, mutual assistance, and collective responsibility.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-5">Rooted in <em>Ta'awun</em> — Mutual Assistance</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">
                Skim Pintar was founded on the Islamic principle of <em>ta'awun</em> — the idea that a community is stronger when its members look after one another.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Every family, regardless of their financial situation, deserves to have their final journey handled with dignity, according to Islamic rites, without placing a financial burden on those left behind.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through collective monthly contributions, we ensure that this promise is kept for every member of our community.
              </p>
              <div className="mt-8 bg-[#f7f9f7] border-l-4 border-[#c9a84c] rounded-r-xl pl-6 py-4 pr-4">
                <p className="text-gray-700 italic text-sm leading-relaxed">
                  "And cooperate in righteousness and piety, but do not cooperate in sin and aggression."
                </p>
                <p className="text-[#1a6b4a] font-semibold text-sm mt-1">— Surah Al-Ma'idah (5:2)</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: Heart, title: "Compassion First", desc: "Every policy and process is designed with kindness and the community's best interest at heart.", bg: "bg-red-50 text-red-600" },
                { icon: Users, title: "Community-Driven", desc: "Run by the community, for the community. Transparent governance and member accountability.", bg: "bg-blue-50 text-blue-600" },
                { icon: BookOpen, title: "Religious Growth", desc: "Beyond welfare, we support your spiritual journey with discounts on Islamic education.", bg: "bg-amber-50 text-amber-600" },
              ].map(({ icon: Icon, title, desc, bg }) => (
                <div key={title} className="bg-[#f7f9f7] rounded-2xl p-5 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital transformation */}
      <section className="py-20 bg-[#f7f9f7]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">Digital Transformation</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">From Paper to Digital</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We've modernised the registration process while preserving the warmth and trust of the original programme.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { before: "Paper GIRO forms required", after: "100% digital online application", status: "improved" },
              { before: "Original documents & bank thumbprint", after: "Digital NRIC upload & verification", status: "improved" },
              { before: "21–30 working days processing", after: "1–7 working days processing", status: "improved" },
              { before: "No status updates", after: "Real-time SMS & email tracking", status: "improved" },
              { before: "No warning for failed deductions", after: "Proactive alerts & 7-day grace period", status: "improved" },
              { before: "Manual data entry", after: "Automated digital workflows", status: "improved" },
            ].map(({ before, after }) => (
              <div key={before} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs shrink-0 mt-0.5">✕</div>
                  <span className="text-sm text-gray-500 line-through">{before}</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-[#1a6b4a] text-xs shrink-0 mt-0.5">✓</div>
                  <span className="text-sm font-semibold text-gray-800">{after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#1a6b4a] uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 sm:px-8">
            {faqs.map((faq) => (
              <FAQ key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-[#f7f9f7]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Still have questions?</h2>
            <p className="text-gray-500 mt-2">Our friendly team is here to help.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📞", method: "Call Us", detail: "6123 4567", sub: "Mon–Fri 9am–5pm, Sat 9am–1pm" },
              { icon: "✉️", method: "Email Us", detail: "skimpintar@ar-raudhah.sg", sub: "Response within 1 business day" },
              { icon: "📍", method: "Visit Us", detail: "Masjid Ar-Raudhah", sub: "Singapore" },
            ].map(({ icon, method, detail, sub }) => (
              <div key={method} className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-bold text-gray-900 mb-1">{method}</div>
                <div className="text-sm font-semibold text-[#1a6b4a] mb-1">{detail}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 text-center bg-[#1a6b4a]">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
        <Link to={createPageUrl("Register")} className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8943e] text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-xl">
          Register Today <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}