import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Lock, Upload, CheckCircle } from "lucide-react";
import { useState } from "react";
import { base44 } from "@/api/base44Client";

const BANKS = ["DBS/POSB", "OCBC", "UOB", "Standard Chartered", "Maybank", "HSBC", "Bank of China", "Citibank"];

export default function StepBanking({ data, onChange, onNext, onBack }) {
  const [uploading, setUploading] = useState(false);

  const handleChange = (field, val) => onChange({ ...data, [field]: val });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange({ ...data, nric_doc_url: file_url });
    setUploading(false);
  };

  const isValid = data.bank_name && data.bank_account_number && data.nric_doc_url;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Banking & Documents</h3>
        <p className="text-gray-500 text-sm">We need these details to set up your GIRO arrangement.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bank Name *</Label>
          <Select value={data.bank_name || ""} onValueChange={(v) => handleChange("bank_name", v)}>
            <SelectTrigger className="h-12 text-base rounded-xl border-gray-300">
              <SelectValue placeholder="Select your bank" />
            </SelectTrigger>
            <SelectContent>
              {BANKS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Bank Account Number *</Label>
          <Input
            value={data.bank_account_number || ""}
            onChange={(e) => handleChange("bank_account_number", e.target.value)}
            placeholder="e.g. 123-456789-0"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a]"
          />
        </div>

        <div className="flex items-start gap-2 bg-[#f7f9f7] border border-gray-200 rounded-xl p-3 text-sm text-gray-600">
          <Lock className="w-4 h-4 mt-0.5 shrink-0 text-[#1a6b4a]" />
          <span>Your banking information is encrypted and stored securely. It is used solely for GIRO deduction purposes.</span>
        </div>

        {/* NRIC Upload */}
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Upload NRIC (Front) *</Label>
          <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors ${data.nric_doc_url ? "border-[#1a6b4a] bg-green-50" : "border-gray-300 hover:border-[#1a6b4a] hover:bg-green-50/50"}`}>
            <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} disabled={uploading} />
            {data.nric_doc_url ? (
              <div className="text-center">
                <CheckCircle className="w-10 h-10 text-[#1a6b4a] mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#1a6b4a]">Document uploaded successfully</p>
                <p className="text-xs text-gray-400 mt-1">Click to replace</p>
              </div>
            ) : uploading ? (
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-[#1a6b4a] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700">Upload NRIC photo or scan</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF • Max 5MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 h-12 bg-[#1a6b4a] hover:bg-[#0f4a33] rounded-xl font-semibold"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}