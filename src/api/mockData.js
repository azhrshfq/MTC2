// Mock data for your application
export const mockMembers = [
  {
    id: "MEM001",
    full_name: "Test User",
    email: "test@example.com",
    nric: "S1234567A",
    phone: "91234567",
    address: "123 Test Street",
    postal_code: "123456",
    plan: "Skim Pintar",
    giro_amount: 5,
    bank_name: "DBS/POSB",
    bank_account_number: "123456789",
    application_status: "Approved",
    payment_status: "Active",
    membership_id: "SP2024001",
    membership_start_date: "2024-01-01",
    nric_doc_url: "https://example.com/doc.pdf"
  }
];

// Mock function to find member by email
export const findMemberByEmail = (email) => {
  return mockMembers.find(m => m.email.toLowerCase() === email.toLowerCase());
};

// Mock function to create a member
export const createMember = (data) => {
  const newMember = {
    id: `MEM${Math.floor(Math.random() * 1000)}`,
    ...data,
    membership_id: `SP${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`,
    application_status: "Pending",
    membership_start_date: new Date().toISOString().split('T')[0]
  };
  mockMembers.push(newMember);
  return newMember;
};

// Mock file upload
export const mockFileUpload = async (file) => {
  console.log("Uploading file:", file.name);
  return { 
    file_url: URL.createObjectURL(file)
  };
};