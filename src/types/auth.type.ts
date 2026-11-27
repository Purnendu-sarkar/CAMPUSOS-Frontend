import type { User, UserRole, UserStatus } from "./user.type";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface StudentRegisterPayload {
  name: string;
  email: string;
  password: string;
  studentId: string;
  department: string;
  batch: string;
  semester?: string;
}

export interface AlumniRegisterPayload {
  name: string;
  email: string;
  password: string;
  department: string;
  graduationYear: number;
  studentId?: string;
  currentCompany?: string;
  designation?: string;
  linkedinUrl?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
  type?: "REGISTRATION" | "FORGOT_PASSWORD";
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface AdminCreateUserPayload {
  name: string;
  email: string;
  role: "TEACHER" | "CLUB_ADMIN" | "MODERATOR" | "UNIVERSITY_ADMIN";
  teacherProfile?: {
    employeeId?: string;
    department: string;
    designation: string;
    specialization?: string[];
    officeRoom?: string;
    bio?: string;
  };
}

export interface AdminUsersParams {
  page?: number;
  limit?: number;
  role?: UserRole;
  status?: UserStatus;
  searchTerm?: string;
  sortBy?: "createdAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

export interface ReviewAlumniPayload {
  userId: string;
  status: "ACTIVE" | "BLOCKED";
  reason?: string;
}

export interface AuthUserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl?: string | null;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: AuthUserSummary;
}

export interface VerifyEmailResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}
