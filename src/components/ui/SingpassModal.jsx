// components/ui/SingpassModal.jsx
import React from 'react';

const SingpassModal = ({ isOpen, onClose, onLogin, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Login with Singpass</h2>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Use the test account to continue:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono text-sm">NRIC: S1234567A</p>
            <p className="font-mono text-sm">Name: Test User</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            disabled={isLoading}
            className="w-full bg-[#1a6b4a] text-white px-6 py-3 rounded-lg hover:bg-[#0f4a33] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <img 
                  src="https://www.singpass.gov.sg/images/singpass-logo.svg" 
                  alt="Singpass" 
                  className="h-5"
                  onError={(e) => e.target.style.display = 'none'}
                />
                Continue with Test Account
              </>
            )}
          </button>
          
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingpassModal;