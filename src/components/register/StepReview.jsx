import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Send, Shield, Calendar, Banknote, User } from "lucide-react";
import { useState } from "react";

export default function StepReview({ data, onSubmit, onBack, submitting, singpassVerified }) {
  const [agreed, setAgreed] = useState(false);

  const rows = [
    { label: "Full Name", value: data.full_name, verified: singpassVerified },
    { label: "NRIC", value: data.nric, verified: singpassVerified },
    { label: "Date of Birth", value: data.date_of_birth },
    { label: "Gender", value: data.gender },
    { label: "Nationality", value: data.nationality, verified: singpassVerified },
    { label: "Mobile", value: data.phone },
    { label: "Email", value: data.email },
    { label: "Address", value: data.address, verified: singpassVerified },
    { label: "Postal Code", value: data.postal_code, verified: singpassVerified },
    { label: "Plan", value: data.plan },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Review Your Application</h3>
        <p className="text-gray-500 text-sm">Please verify all details before submitting. You can still go back to make changes.</p>
      </div>

      {/* Singpass Verified Banner */}
      {singpassVerified && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Identity Verified with Singpass</p>
              <p className="text-sm text-green-600">Your personal details have been verified through Singpass.</p>
            </div>
          </div>
        </div>
      )}

      {/* Personal Details Table */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        {rows.map(({ label, value, verified }, i) => (
          <div key={label} className={`flex items-center gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-white" : "bg-[#f7f9f7]"}`}>
            <span className="text-sm text-gray-500 w-32 shrink-0">{label}</span>
            <span className="text-sm font-medium text-gray-900 break-all flex items-center gap-2">
              {value || "—"}
              {verified && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* GIRO Payment Summary Section */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="bg-[#f7f9f7] px-5 py-3 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Payment & GIRO Summary</h4>
        </div>
        
        <div className="p-5 space-y-4">
          {/* Monthly Contribution */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#1a6b4a] mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-500">Monthly Contribution</div>
              <div className="font-semibold text-gray-900">
                ${data.giro_amount || 5}.00
              </div>
              <div className="text-xs text-gray-400">Deducted on the 5th of each month</div>
            </div>
          </div>

          {/* Bank Account Details */}
          {data.bank_name && (
            <div className="flex items-start gap-3">
              <Banknote className="w-5 h-5 text-[#1a6b4a] mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-500">Bank Account for GIRO</div>
                <div className="font-semibold text-gray-900">{data.bank_name}</div>
                <div className="text-sm text-gray-600">
                  Account: •••• {data.bank_account_number?.slice(-4)}
                </div>
                {data.giro_reference && (
                  <div className="text-xs text-green-600 mt-1">
                    GIORef: {data.giro_reference}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Holder */}
          {data.full_name && (
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#1a6b4a] mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-500">Account Holder</div>
                <div className="font-semibold text-gray-900">{data.full_name}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NRIC Document Status */}
      {data.nric_doc_url && (
        <div className="flex items-center gap-4 px-5 py-3 bg-green-50 rounded-xl">
          <span className="text-sm text-gray-500 w-32 shrink-0">NRIC Document</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a6b4a]">
            <CheckCircle className="w-4 h-4" /> Uploaded Successfully
          </span>
        </div>
      )}

      {/* Processing Time Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Processing Time:</strong> Your application will be reviewed within <strong>1–7 working days</strong>. You will receive email and SMS updates on the status of your application.
      </div>

      {/* GIRO Terms */}
      {data.bank_name && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <p className="flex items-start gap-2">
            <Shield className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              By submitting, you authorise Masjid Ar-Raudhah to arrange for monthly GIRO deductions 
              from your bank account. You will receive SMS/email notifications 3 days before each deduction.
            </span>
          </p>
        </div>
      )}

      {/* Consent Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-5 h-5 rounded accent-[#1a6b4a] shrink-0"
        />
        <span className="text-sm text-gray-600">
          I confirm that all information provided is accurate and correct. I consent to the collection and use of my personal data for membership administration purposes under the <strong>Personal Data Protection Act (PDPA)</strong>. I agree to the <strong>Terms & Conditions</strong> of Skim Pintar and authorise GIRO deductions as specified above.
        </span>
      </label>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} disabled={submitting} className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!agreed || submitting}
          className="flex-1 h-12 bg-[#1a6b4a] hover:bg-[#0f4a33] rounded-xl font-semibold"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Confirm & Submit
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}