import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import SingpassModal from "@/components/ui/SingpassModal";
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Register() {
  console.log('Register component rendering');
  
  const { user, loading, logout, loginWithSingpass } = useAuth();
  const location = useLocation();
  const [showSingpass, setShowSingpass] = useState(false);
  const [step, setStep] = useState(1);
  const [isSingpassVerified, setIsSingpassVerified] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Get selected plan from navigation state or default to empty
  const selectedPlanFromPlans = location.state?.selectedPlan || '';
  
  const [formData, setFormData] = useState({
    fullName: '',
    nric: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    postalCode: '',
    nationality: '',
    selectedPlan: selectedPlanFromPlans, // Will be 'Skim Pintar', 'Skim Pintar Plus', or ''
    monthlyAmount: selectedPlanFromPlans === 'Skim Pintar' ? 5 : 
                  selectedPlanFromPlans === 'Skim Pintar Plus' ? 20 : 5, // Default to 5
  });

  // Handle Singpass login from modal
  const handleSingpassLogin = async () => {
    console.log('Starting Singpass login process');
    setIsLoggingIn(true);
    
    try {
      const result = await loginWithSingpass();
      console.log('Singpass login result:', result);
      
      if (result?.success) {
        console.log('Singpass login successful, user:', result.user);
        setShowSingpass(false);
        // Don't set step here - let the useEffect handle it when user updates
      } else {
        console.error('Singpass login failed:', result?.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Singpass login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Effect to handle user state changes from Singpass login
  useEffect(() => {
    console.log('User state changed:', user);
    console.log('Loading state:', loading);
    
    if (user?.singpass_verified) {
      console.log('Singpass verified user detected, moving to step 2');
      setIsSingpassVerified(true);
      setStep(2); // Move to step 2 immediately when Singpass verified
      
      // Pre-fill form with Singpass data
      setFormData(prev => ({
        ...prev,
        fullName: user.full_name || '',
        nric: user.nric || '',
        dateOfBirth: user.dob || '',
        phone: user.phone || '',
        address: user.address || '',
        postalCode: user.postal_code || '',
        nationality: user.nationality || 'Singaporean',
        // Preserve selectedPlan if it exists
        selectedPlan: prev.selectedPlan || selectedPlanFromPlans || '',
        monthlyAmount: prev.selectedPlan === 'Skim Pintar' ? 5 :
                      prev.selectedPlan === 'Skim Pintar Plus' ? 20 : 5,
      }));
    }
  }, [user, selectedPlanFromPlans]);

  // Initial load effect
  useEffect(() => {
    console.log('Register mounted');
    console.log('Selected plan from Plans page:', selectedPlanFromPlans);
    console.log('Initial user:', user);
    
    // If there's a test user (no singpass_verified), we want to stay on step 1
    // to allow Singpass login
    if (user && !user.singpass_verified) {
      console.log('Test user detected, staying on step 1');
      setStep(1);
    }
  }, []);

  const handleManualRegister = () => {
    // If there's a test user, log them out first
    if (user && !user.singpass_verified) {
      logout();
    }
    setIsSingpassVerified(false);
    setStep(2);
  };

  const handleLogout = async () => {
    await logout();
    setStep(1);
    setIsSingpassVerified(false);
    setFormData({
      fullName: '',
      nric: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      postalCode: '',
      nationality: '',
      selectedPlan: selectedPlanFromPlans || '',
      monthlyAmount: selectedPlanFromPlans === 'Skim Pintar' ? 5 :
                    selectedPlanFromPlans === 'Skim Pintar Plus' ? 20 : 5,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for monthlyAmount to ensure it meets minimum
    if (name === 'monthlyAmount') {
      const minAmount = formData.selectedPlan === 'Skim Pintar' ? 5 : 
                       formData.selectedPlan === 'Skim Pintar Plus' ? 20 : 5;
      const numValue = parseFloat(value) || 0;
      
      // Don't allow values below minimum
      if (numValue < minAmount) {
        setFormData(prev => ({ ...prev, [name]: minAmount }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    const minAmount = plan === 'Skim Pintar' ? 5 : 
                     plan === 'Skim Pintar Plus' ? 20 : 5;
    
    setFormData(prev => ({
      ...prev,
      selectedPlan: plan,
      monthlyAmount: minAmount, // Reset to minimum when plan changes
    }));
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 3) {
        setStep(2);
      } else if (step === 2) {
        setStep(1);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call here
  };

  // Get minimum amount based on selected plan
  const getMinAmount = () => {
    if (formData.selectedPlan === 'Skim Pintar') return 5;
    if (formData.selectedPlan === 'Skim Pintar Plus') return 20;
    return 5; // Default
  };

  // Show loading state while initial auth check is happening
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a6b4a] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 relative">
        <h1 className="text-3xl font-bold mb-2">Membership Registration</h1>
        <p className="text-gray-600 mb-8">Join Skim Pintar and enjoy exclusive benefits</p>
        
        {/* Show logout option only if there's a test user */}
        {user && !user.singpass_verified && step === 1 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-yellow-800 font-medium">Test Mode: Logged in as {user.email}</p>
              <p className="text-yellow-600 text-sm">For actual registration, please use Singpass</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
            >
              Logout
            </button>
          </div>
        )}
        
        {/* Show message when coming from Plans page with selected plan */}
        {selectedPlanFromPlans && !user?.singpass_verified && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              You've selected: <strong>{selectedPlanFromPlans}</strong> plan
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Please login with Singpass to complete your registration
            </p>
          </div>
        )}
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-[#1a6b4a] text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 2 ? 'bg-[#1a6b4a]' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-[#1a6b4a] text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
            <div className={`flex-1 h-1 mx-2 ${
              step >= 3 ? 'bg-[#1a6b4a]' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-[#1a6b4a] text-white' : 'bg-gray-200 text-gray-600'
            }`}>3</div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Verify Identity</span>
            <span>Personal Details</span>
            <span>GIRO Application</span>
          </div>
        </div>

        {step === 1 && (
          // Step 1: Singpass verification
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Start Your Registration</h2>
            
            {/* Show selected plan if coming from Plans page */}
            {selectedPlanFromPlans && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  You've selected: <strong>{selectedPlanFromPlans}</strong> plan
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Complete registration to activate your membership
                </p>
              </div>
            )}
            
            <p className="text-gray-600 mb-6">
              Verify your identity with Singpass to pre-fill your details and speed up the process
            </p>
            
            <button
              onClick={() => setShowSingpass(true)}
              disabled={isLoggingIn}
              className="w-full bg-[#1a6b4a] text-white px-8 py-4 rounded-lg hover:bg-[#0f4a33] font-semibold mb-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <img 
                    src="https://www.singpass.gov.sg/images/singpass-logo.svg" 
                    alt="Singpass" 
                    className="h-6"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  Login with Singpass
                </>
              )}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or</span>
              </div>
            </div>
            
            <button
              onClick={handleManualRegister}
              className="w-full border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Register Manually
            </button>
            
            <p className="mt-4 text-xs text-gray-400">
              By continuing, you agree to share your NRIC-verified particulars with 
              Masjid Ar-Raudhah for membership registration.
            </p>
          </div>
        )}

        {step === 2 && (
          // Step 2: Personal Details
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 relative">
            {isSingpassVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-700 text-sm flex items-center gap-2">
                  <span>✅</span> Identity verified via Singpass - All personal information is locked
                </p>
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-6">Personal Details</h2>
            
            {/* Plan Selection Dropdown */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Plan <span className="text-red-500">*</span>
              </label>
              <select
                name="selectedPlan"
                value={formData.selectedPlan}
                onChange={handlePlanChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                required
              >
                <option value="">Select a plan</option>
                <option value="Skim Pintar">Skim Pintar ($5/month)</option>
                <option value="Skim Pintar Plus">Skim Pintar Plus ($20+/month)</option>
              </select>
              {formData.selectedPlan && (
                <p className="text-xs text-gray-500 mt-1">
                  Minimum monthly contribution: ${getMinAmount()}
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  readOnly={isSingpassVerified}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                    isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Enter your full name as per NRIC"
                  required
                />
                {isSingpassVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NRIC/FIN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nric"
                  value={formData.nric}
                  onChange={handleInputChange}
                  readOnly={isSingpassVerified}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                    isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="S1234567A"
                  required
                />
                {isSingpassVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  readOnly={isSingpassVerified}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                    isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  required
                />
                {isSingpassVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={isSingpassVerified}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                    isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="91234567"
                  required
                />
                {isSingpassVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  readOnly={isSingpassVerified}
                  rows="3"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                    isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Your full address"
                  required
                />
                {isSingpassVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    readOnly={isSingpassVerified}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                      isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="123456"
                  />
                  {isSingpassVerified && (
                    <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    readOnly={isSingpassVerified}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent ${
                      isSingpassVerified ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder="Singaporean"
                  />
                  {isSingpassVerified && (
                    <p className="text-xs text-green-600 mt-1">✓ Verified from Singpass</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!formData.selectedPlan}
                className={`w-full py-3 rounded-lg font-semibold mt-4 ${
                  formData.selectedPlan
                    ? 'bg-[#1a6b4a] text-white hover:bg-[#0f4a33]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next: GIRO Application
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          // Step 3: GIRO Application
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6">GIRO Application</h2>
            
            {/* Show selected plan summary */}
            {formData.selectedPlan && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800">
                  <strong>{formData.selectedPlan}</strong> plan selected
                </p>
                <p className="text-sm text-blue-600">
                  Minimum monthly contribution: ${getMinAmount()}
                </p>
              </div>
            )}
            
            <p className="text-gray-600 mb-6">Set up GIRO for your monthly contributions</p>
            
            <div className="space-y-6">
              {/* Bank Account Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Why set up GIRO?</h3>
                <p className="text-sm text-blue-800">
                  GIRO allows for automatic monthly deduction of your contribution amount. 
                  It's convenient, secure, and ensures your membership remains active.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="bankName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                  required
                >
                  <option value="">Select your bank</option>
                  <option value="DBS">DBS/POSB</option>
                  <option value="OCBC">OCBC Bank</option>
                  <option value="UOB">UOB</option>
                  <option value="Maybank">Maybank</option>
                  <option value="CIMB">CIMB</option>
                  <option value="Others">Other Banks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  defaultValue={formData.fullName}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                  placeholder="As per bank records"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                  placeholder="Enter your bank account number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="accountType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                    required
                  >
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Contribution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="monthlyAmount"
                      value={formData.monthlyAmount}
                      onChange={handleInputChange}
                      min={getMinAmount()}
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a6b4a] focus:border-transparent"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum: ${getMinAmount()} (based on {formData.selectedPlan} plan)
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">GIRO Authorisation</h3>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" required />
                    <span className="text-sm text-gray-600">
                      I authorise Masjid Ar-Raudhah to deduct the monthly contribution from my bank account via GIRO
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" required />
                    <span className="text-sm text-gray-600">
                      I confirm that the bank account details provided are correct and I am the account holder
                    </span>
                  </label>
                  
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" required />
                    <span className="text-sm text-gray-600">
                      I understand that this GIRO arrangement will remain active until I cancel it in writing
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">{formData.selectedPlan}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Monthly Contribution:</span>
                  <span className="font-semibold">${formData.monthlyAmount}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">First Payment Date:</span>
                  <span className="font-semibold">15th of next month</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a6b4a] text-white py-3 rounded-lg hover:bg-[#0f4a33] font-semibold"
              >
                Complete Registration
              </button>
            </div>
          </form>
        )}

        {/* Back Button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="fixed bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        <SingpassModal 
          isOpen={showSingpass}
          onClose={() => setShowSingpass(false)}
          onLogin={handleSingpassLogin}
          isLoading={isLoggingIn}
        />
      </div>
    </div>
  );
}