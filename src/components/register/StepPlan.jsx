import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StepPlan({ data, onChange, onNext, onBack }) {
  const handlePlan = (plan) => onChange({ ...data, plan, giro_amount: plan === "Skim Pintar" ? 5 : 20 });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Select Your Plan</h3>
        <p className="text-gray-500 text-sm">Choose the coverage that best suits your needs.</p>
      </div>

      <div className="grid gap-4">
        {[
          {
            id: "Skim Pintar",
            price: "$5/month",
            tag: "Individual",
            desc: "Covers yourself with full funeral services and 20% off religious courses.",
            features: ["Free funeral services", "Ritual bathing & shrouding", "Burial & transport", "20% off religious courses"],
            color: "border-gray-200",
            activeColor: "border-[#1a6b4a] bg-green-50",
          },
          {
            id: "Skim Pintar Plus",
            price: "$20+/month",
            tag: "Family",
            desc: "Covers yourself and your immediate family at the same address.",
            features: ["All Skim Pintar benefits", "Family coverage included", "Parents/in-laws at 50% off", "50% off religious courses"],
            color: "border-gray-200",
            activeColor: "border-[#1a6b4a] bg-green-50",
            popular: true,
          },
        ].map((plan) => {
          const isSelected = data.plan === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => handlePlan(plan.id)}
              className={cn(
                "text-left rounded-2xl border-2 p-6 transition-all hover:shadow-md",
                isSelected ? plan.activeColor : plan.color + " bg-white hover:border-gray-300"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900 text-lg">{plan.id}</span>
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full",
                      plan.popular ? "bg-[#c9a84c] text-white" : "bg-gray-100 text-gray-600"
                    )}>
                      {plan.popular ? "Most Popular" : plan.tag}
                    </span>
                  </div>
                  <div className="text-[#1a6b4a] font-bold text-xl mt-1">{plan.price}</div>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 shrink-0",
                  isSelected ? "border-[#1a6b4a] bg-[#1a6b4a]" : "border-gray-300"
                )}>
                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1a6b4a] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {data.plan === "Skim Pintar Plus" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Note:</strong> The $20+ amount covers the primary member. Additional amounts are calculated based on the number of family members added. You will be informed of the exact amount before GIRO is set up.
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!data.plan}
          className="flex-1 h-12 bg-[#1a6b4a] hover:bg-[#0f4a33] rounded-xl font-semibold"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}