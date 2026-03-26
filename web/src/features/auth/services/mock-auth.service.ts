export type MockUserRole = "student" | "admin" | "visitor";

export type MockSession = {
  isAuthenticated: boolean;
  role: MockUserRole;
};

export const getMockSession = (): MockSession => {
  return {
    isAuthenticated: false,
    role: "visitor"
  };
};
