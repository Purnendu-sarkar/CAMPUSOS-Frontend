import { z } from "zod";

const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long.")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
  .regex(/[0-9]/, "Password must contain at least 1 number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least 1 special character.",
  );

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const studentRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name cannot exceed 100 characters."),
    email: z.email("Please enter a valid email address."),
    studentId: z.string().trim().min(3, "Student ID is required."),
    department: z.string().trim().min(2, "Department is required."),
    batch: z.string().trim().min(1, "Batch is required."),
    semester: z.string().trim().optional(),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const alumniRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name cannot exceed 100 characters."),
    email: z.email("Please enter a valid email address."),
    department: z.string().trim().min(2, "Department is required."),
    graduationYear: z
      .number({ error: "Please enter a valid graduation year." })
      .int("Graduation year must be a whole number.")
      .min(1950, "Enter a valid graduation year.")
      .max(new Date().getFullYear() + 1, "Graduation year is too far in the future."),
    studentId: z.string().trim().optional(),
    currentCompany: z.string().trim().optional(),
    designation: z.string().trim().optional(),
    linkedinUrl: z
      .url("Please enter a valid LinkedIn URL.")
      .optional()
      .or(z.literal("")),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const verifyOtpSchema = z.object({
  email: z.email("Please enter a valid email address."),
  otp: z.string().trim().length(6, "OTP must be exactly 6 digits."),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address."),
});

export const resetPasswordSchema = z
  .object({
    email: z.email("Please enter a valid email address."),
    otp: z.string().trim().length(6, "OTP must be exactly 6 digits."),
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required."),
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const adminCreateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(100),
    email: z.email("Please enter a valid email address."),
    role: z.enum(["TEACHER", "CLUB_ADMIN", "MODERATOR", "UNIVERSITY_ADMIN"]),
    employeeId: z.string().trim().optional(),
    department: z.string().trim().optional(),
    designation: z.string().trim().optional(),
    officeRoom: z.string().trim().optional(),
  })
  .refine(
    (data) =>
      data.role !== "TEACHER" ||
      (!!data.department?.trim() && !!data.designation?.trim()),
    {
      message: "Department and designation are required for Teachers.",
      path: ["department"],
    },
  );
