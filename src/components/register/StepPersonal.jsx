import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, CheckCircle } from "lucide-react";

export default function StepPersonal({ data, onChange, onNext, singpassVerified }) {
  const handleChange = (field, val) => onChange({ ...data, [field]: val });

  const isValid = data.full_name && data.nric && data.date_of_birth && data.gender && data.phone && data.email && data.address && data.postal_code;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Personal Information</h3>
        <p className="text-gray-500 text-sm">Please enter your details as per your NRIC.</p>
      </div>

      {/* Singpass Verified Banner */}
      {singpassVerified && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-800">Verified with Singpass</p>
              <p className="text-sm text-green-600">
                Your identity has been verified. Fields are pre-filled from Singpass.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Full Name (as per NRIC) *</Label>
          <Input
            value={data.full_name || ""}
            onChange={(e) => handleChange("full_name", e.target.value)}
            placeholder="e.g. Ahmad Bin Abdullah"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
            disabled={singpassVerified} // Disable if Singpass verified
          />
          {singpassVerified && (
            <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">NRIC Number *</Label>
          <Input
            value={data.nric || ""}
            onChange={(e) => handleChange("nric", e.target.value.toUpperCase())}
            placeholder="e.g. S1234567A"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
            disabled={singpassVerified} // Disable if Singpass verified
          />
          {singpassVerified && (
            <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Date of Birth *</Label>
          <Input
            type="date"
            value={data.date_of_birth || ""}
            onChange={(e) => handleChange("date_of_birth", e.target.value)}
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Gender *</Label>
          <Select value={data.gender || ""} onValueChange={(v) => handleChange("gender", v)}>
            <SelectTrigger className="h-12 text-base rounded-xl border-gray-300">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Nationality *</Label>
          <Select value={data.nationality || ""} onValueChange={(v) => handleChange("nationality", v)}>
            <SelectTrigger className="h-12 text-base rounded-xl border-gray-300">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Singaporean">Singaporean</SelectItem>
              <SelectItem value="Singapore PR">Singapore PR</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          {singpassVerified && (
            <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Mobile Number *</Label>
          <Input
            type="tel"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="e.g. 9123 4567"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address *</Label>
          <Input
            type="email"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="e.g. ahmad@email.com"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Home Address *</Label>
          <Input
            value={data.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Block, Street Name, Unit Number"
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
            disabled={singpassVerified} // Disable if Singpass verified
          />
          {singpassVerified && (
            <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-1.5 block">Postal Code *</Label>
          <Input
            value={data.postal_code || ""}
            onChange={(e) => handleChange("postal_code", e.target.value)}
            placeholder="e.g. 520123"
            maxLength={6}
            className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1a6b4a] focus:ring-[#1a6b4a]"
            disabled={singpassVerified} // Disable if Singpass verified
          />
          {singpassVerified && (
            <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50 text-blue-700 rounded-xl p-3 text-sm">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <span>Your personal data is collected under the Personal Data Protection Act (PDPA) and used solely for membership administration.</span>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid}
        className="w-full h-12 text-base bg-[#1a6b4a] hover:bg-[#0f4a33] rounded-xl font-semibold"
      >
        Continue <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}