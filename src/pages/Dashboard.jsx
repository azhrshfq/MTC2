// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  User, 
  CreditCard, 
  Users, 
  Bell, 
  RefreshCw, 
  ChevronRight, 
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

const statusConfig = {
  Pending: { color: "text-amber-700 bg-amber-100 border-amber-200", icon: Clock, label: "Pending Review" },
  "Under Review": { color: "text-blue-700 bg-blue-100 border-blue-200", icon: RefreshCw, label: "Under Review" },
  Approved: { color: "text-green-700 bg-green-100 border-green-200", icon: CheckCircle, label: "Approved" },
  Active: { color: "text-[#1a6b4a] bg-green-100 border-green-200", icon: CheckCircle, label: "Active Member" },
  Suspended: { color: "text-orange-700 bg-orange-100 border-orange-200", icon: AlertCircle, label: "Suspended" },
  Rejected: { color: "text-red-700 bg-red-100 border-red-200", icon: XCircle, label: "Rejected" },
};

const steps = ["Application Submitted", "Identity Verification", "Bank Verification", "GIRO Setup", "Active Member"];

function StatusTracker({ status }) {
  const activeStep = { Pending: 0, "Under Review": 1, Approved: 3, Active: 4, Suspended: 4, Rejected: 1 }[status] ?? 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-6">Application Progress</h3>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const done = i < activeStep;
          const current = i === activeStep && status !== "Rejected";
          const rejected = status === "Rejected" && i === 1;
          return (
            <div key={step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${
                  done ? "bg-[#1a6b4a] border-[#1a6b4a] text-white"
                  : current ? "bg-white border-[#1a6b4a] shadow-md"
                  : rejected ? "bg-red-500 border-red-500 text-white"
                  : "bg-gray-100 border-gray-200 text-gray-400"
                }`}>
                  {done ? <CheckCircle className="w-4 h-4" /> : current ? <div className="w-2.5 h-2.5 rounded-full bg-[#1a6b4a] animate-pulse" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${done ? "bg-[#1a6b4a]" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="pt-1 pb-6">
                <div className={`text-sm font-semibold ${done ? "text-[#1a6b4a]" : current ? "text-gray-900" : "text-gray-400"}`}>
                  {step}
                </div>
                {current && (
                  <div className="text-xs text-gray-500 mt-0.5">Currently in progress</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSwitchingAccount, setIsSwitchingAccount] = useState(false);

  useEffect(() => {
    base44.auth.me().then(user => {
      if (user?.email) {
        setEmail(user.email);
        loadMember(user.email);
      } else {
        setLoading(false);
      }
    }).catch(() => setLoading(false));
  }, []);

  const loadMember = async (emailToSearch) => {
    setLoading(true);
    setNotFound(false);
    const results = await base44.entities.Member.filter({ email: emailToSearch });
    if (results.length > 0) {
      setMember(results[0]);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    loadMember(searchInput.trim().toLowerCase());
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSwitchAccount = async () => {
    setIsSwitchingAccount(true);
    try {
      await logout();
      navigate('/register');
    } catch (error) {
      console.error('Switch account error:', error);
    } finally {
      setIsSwitchingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9f7]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#1a6b4a] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!member && !loading) {
    return (
      <div className="min-h-screen bg-[#f7f9f7]">
        <div className="bg-gradient-to-br from-[#0f4a33] to-[#1a6b4a] text-white py-14 px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-green-200">Track your membership and application status</p>
        </div>

        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Find Your Application</h2>
            <p className="text-gray-500 text-sm mb-6">
              {notFound ? "No application found with that email." : "Enter the email address used during registration."}
            </p>
            <div className="space-y-3">
              <input
                type="email"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="your@email.com"
                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-base focus:border-[#1a6b4a] outline-none transition-colors"
              />
              <Button onClick={handleSearch} className="w-full h-12 bg-[#1a6b4a] hover:bg-[#0f4a33] rounded-xl font-semibold">
                Look Up Application
              </Button>
              
              {/* Only show logout option if user is logged in but no member found */}
              {user && (
                <>
                  <div className="text-sm text-gray-400 pt-2">— or —</div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full border-2 border-red-500 text-red-500 font-semibold py-3 rounded-xl text-center hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              )}
              
              <div className="text-sm text-gray-400 pt-2">— or —</div>
              <Link
                to={createPageUrl("Register")}
                className="block w-full border-2 border-[#1a6b4a] text-[#1a6b4a] font-semibold py-3 rounded-xl text-center hover:bg-green-50 transition-colors"
              >
                Register as New Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sc = statusConfig[member.application_status] || statusConfig.Pending;
  const StatusIcon = sc.icon;

  return (
    <div className="min-h-screen bg-[#f7f9f7]">
      <div className="bg-gradient-to-br from-[#0f4a33] to-[#1a6b4a] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-green-300 text-sm mb-1">Welcome back</p>
              <h1 className="text-3xl font-bold">{member.full_name}</h1>
              <p className="text-green-200 text-sm mt-1">{member.plan} Member</p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${sc.color}`}>
              <StatusIcon className="w-4 h-4" />
              {sc.label}
            </div>
            {/* Removed the logout button from header */}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Alert banners */}
        {member.application_status === "Suspended" && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-orange-800 mb-1">Membership Suspended</div>
              <div className="text-orange-700 text-sm">Your membership has been suspended due to a failed GIRO deduction. Please contact us to reactivate your membership.</div>
              <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
                Reactivate Membership
              </button>
            </div>
          </div>
        )}

        {member.payment_status === "Grace Period" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
            <Clock className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-800 mb-1">Grace Period Active</div>
              <div className="text-amber-700 text-sm">Your last GIRO deduction failed. You have 7 days to update your banking details before your coverage is affected.</div>
            </div>
          </div>
        )}

        {/* Account Actions Section - Now contains both Switch Account and Logout */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#1a6b4a]" /> Account Actions
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={handleSwitchAccount}
              disabled={isSwitchingAccount}
              className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-[#1a6b4a] transition-colors group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100">
                  <User className="w-5 h-5 text-[#1a6b4a]" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Switch Account</div>
                  <div className="text-xs text-gray-500">Register with a new account</div>
                </div>
              </div>
              {isSwitchingAccount ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1a6b4a]"></div>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1a6b4a]" />
              )}
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 transition-colors group disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100">
                  <div className="w-5 h-5 text-red-500">×</div>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">Logout</div>
                  <div className="text-xs text-gray-500">End your current session</div>
                </div>
              </div>
              {isLoggingOut ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
              )}
            </button>
          </div>
        </div>

        {/* Rest of your existing dashboard content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Membership info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-[#1a6b4a]" /> Personal Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: member.full_name },
                  { label: "NRIC", value: member.nric },
                  { label: "Mobile", value: member.phone },
                  { label: "Email", value: member.email },
                  { label: "Address", value: member.address },
                  { label: "Postal Code", value: member.postal_code },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-gray-900">{value || "—"}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#1a6b4a]" /> Plan & Payment
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Membership Plan", value: member.plan },
                  { label: "Monthly Contribution", value: member.giro_amount ? `$${member.giro_amount}/month` : "—" },
                  { label: "Bank", value: member.bank_name || "—" },
                  { label: "Account", value: member.bank_account_number ? "•••• " + member.bank_account_number.slice(-4) : "—" },
                  { label: "Last Payment", value: member.last_payment_date || "Pending setup" },
                  { label: "Next Payment", value: member.next_payment_date || "Pending setup" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {member.plan === "Skim Pintar Plus" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1a6b4a]" /> Family Members
                  </h3>
                  <button className="text-sm text-[#1a6b4a] font-semibold hover:underline">+ Add Member</button>
                </div>
                <div className="bg-[#f7f9f7] rounded-xl p-6 text-center text-gray-400 text-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  No family members added yet.<br/>Add your dependents to extend coverage.
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StatusTracker status={member.application_status} />

            {member.membership_id && (
              <div className="bg-gradient-to-br from-[#1a6b4a] to-[#0f4a33] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-[#e8c97a]" />
                  <span className="text-sm font-semibold text-green-200">Membership ID</span>
                </div>
                <div className="font-mono font-bold text-xl tracking-wider">{member.membership_id}</div>
                <div className="text-xs text-green-300 mt-2">Active since {member.membership_start_date}</div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#1a6b4a]" /> What's Next?
              </h4>
              <div className="space-y-2">
                {[
                  { step: "1", text: "Identity verification" },
                  { step: "2", text: "Bank account validation" },
                  { step: "3", text: "GIRO setup confirmation" },
                  { step: "4", text: "Welcome email + card" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">{step}</div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f7f9f7] rounded-2xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-3">Questions about your application?</p>
              <a href="tel:+6561234567" className="text-[#1a6b4a] font-bold text-lg block hover:underline">6123 4567</a>
              <p className="text-xs text-gray-400 mt-1">Mon–Fri 9am–5pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}