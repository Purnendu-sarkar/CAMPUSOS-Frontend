export type UserRole =
  | "STUDENT"
  | "TEACHER"
  | "ALUMNI"
  | "CLUB_ADMIN"
  | "MODERATOR"
  | "UNIVERSITY_ADMIN";

export type UserStatus =
  | "ACTIVE"
  | "PENDING_APPROVAL"
  | "SUSPENDED"
  | "BLOCKED";

export type AuthProvider = "CREDENTIALS" | "GOOGLE";

export interface StudentProfile {
  id: string;
  userId: string;
  studentId: string;
  department: string;
  batch: string;
  semester?: string | null;
  cgpa?: number | null;
  skills: string[];
  careerGoal?: string | null;
  bio?: string | null;
  cvUrl?: string | null;
  cvPublicId?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  employeeId?: string | null;
  department: string;
  designation: string;
  specialization: string[];
  officeRoom?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AlumniProfile {
  id: string;
  userId: string;
  studentId?: string | null;
  department: string;
  graduationYear: number;
  currentCompany?: string | null;
  designation?: string | null;
  industry?: string | null;
  skills: string[];
  linkedinUrl?: string | null;
  isAvailableForMentorship: boolean;
  bio?: string | null;
  approvedById?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  authProvider: AuthProvider;
  googleId?: string | null;
  isVerified: boolean;
  needPasswordChange: boolean;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  studentProfile?: StudentProfile | null;
  teacherProfile?: TeacherProfile | null;
  alumniProfile?: AlumniProfile | null;
}
