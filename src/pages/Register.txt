import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StepPersonal from "../components/register/StepPersonal";
import StepPlan from "../components/register/StepPlan";
import StepBanking from "../components/register/StepBanking";
import StepReview from "../components/register/StepReview";

const STEPS = ["Personal Details", "Choose Plan", "Banking & Docs", "Review & Submit"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [formData, setFormData] = useState({ plan: "", giro_amount: 5 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan === "plus") setFormData((d) => ({ ...d, plan: "Skim Pintar Plus", giro_amount: 20 }));
    if (plan === "basic") setFormData((d) => ({ ...d, plan: "Skim Pintar", giro_amount: 5 }));
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    const record = await base44.entities.Member.create({
      ...formData,
      application_status: "Pending",
    });
    setApplicationId(record.id);
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f7f9f7] px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#1a6b4a]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
          <p className="text-gray-500 mb-2 text-lg">Alhamdulillah! Your application has been received.</p>
          <p className="text-gray-500 text-sm mb-6">
            Our team will review your application within <strong>1–7 working days</strong>. You will receive updates via email and SMS.
          </p>
          <div className="bg-[#f7f9f7] rounded-xl p-4 mb-6">
            <div className="text-xs text-gray-400 mb-1">Your Reference Number</div>
            <div className="font-mono font-bold text-[#1a6b4a] text-lg">{applicationId?.slice(0, 12).toUpperCase()}</div>
            <div className="text-xs text-gray-400 mt-1">Save this for tracking your application</div>
          </div>
          <div className="space-y-2">
            <Link
              to={createPageUrl("Dashboard")}
              className="block w-full bg-[#1a6b4a] hover:bg-[#0f4a33] text-white font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Track My Application
            </Link>
            <Link
              to={createPageUrl("Home")}
              className="block w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-center hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9f7]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f4a33] to-[#1a6b4a] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Join Skim Pintar</h1>
          <p className="text-green-200">Complete the form below. Takes less than 10 minutes.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Progress steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-[#1a6b4a] transition-all duration-500"
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold text-sm transition-all ${
                  i < step ? "bg-[#1a6b4a] border-[#1a6b4a] text-white"
                  : i === step ? "bg-[#1a6b4a] border-[#1a6b4a] text-white shadow-lg"
                  : "bg-white border-gray-300 text-gray-400"
                }`}>
                  {i < step ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-xs mt-2 font-medium text-center max-w-[70px] ${i === step ? "text-[#1a6b4a]" : i < step ? "text-green-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="sm:hidden text-center mt-4">
            <span className="text-sm font-semibold text-[#1a6b4a]">Step {step + 1} of {STEPS.length}: {STEPS[step]}</span>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {step === 0 && <StepPersonal data={formData} onChange={setFormData} onNext={() => setStep(1)} />}
          {step === 1 && <StepPlan data={formData} onChange={setFormData} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <StepBanking data={formData} onChange={setFormData} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepReview data={formData} onSubmit={handleSubmit} onBack={() => setStep(2)} submitting={submitting} />}
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Need help? Call us at <a href="tel:+6561234567" className="text-[#1a6b4a] font-semibold">6123 4567</a> or email <a href="mailto:skimpintar@ar-raudhah.sg" className="text-[#1a6b4a] font-semibold">skimpintar@ar-raudhah.sg</a></p>
        </div>
      </div>
    </div>
  );
}