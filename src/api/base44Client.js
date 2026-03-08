import { findMemberByEmail, createMember, mockFileUpload } from './mockData';

// Mock client that mimics the Base44 structure
export const base44 = {
  auth: {
    me: async () => {
      // Return a mock logged-in user
      return { email: "test@example.com" };
    }
  },
  entities: {
    Member: {
      filter: async ({ email }) => {
        const member = findMemberByEmail(email);
        return member ? [member] : [];
      },
      create: async (data) => {
        return createMember(data);
      }
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        return mockFileUpload(file);
      }
    }
  }
};