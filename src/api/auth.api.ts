import apiClient from "@/lib/apiClient";
import type {
  AdminCreateUserPayload,
  AdminUsersParams,
  AlumniRegisterPayload,
  ApiResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponseData,
  ResendOtpPayload,
  ResetPasswordPayload,
  ReviewAlumniPayload,
  StudentRegisterPayload,
  User,
  VerifyEmailResponseData,
  VerifyOtpPayload,
} from "@/types";

export function login(payload: LoginPayload) {
  return apiClient<ApiResponse<LoginResponseData>>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function registerStudent(payload: StudentRegisterPayload) {
  return apiClient<ApiResponse<null>>("/auth/register/student", {
    method: "POST",
    body: payload,
  });
}

export function registerAlumni(payload: AlumniRegisterPayload) {
  return apiClient<ApiResponse<null>>("/auth/register/alumni", {
    method: "POST",
    body: payload,
  });
}

export function verifyEmail(payload: VerifyOtpPayload) {
  return apiClient<ApiResponse<VerifyEmailResponseData>>("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function resendOtp(payload: ResendOtpPayload) {
  return apiClient<ApiResponse<null>>("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });
}

export function googleLogin(payload: { idToken: string }) {
  return apiClient<ApiResponse<LoginResponseData>>("/auth/google", {
    method: "POST",
    body: payload,
  });
}

export function logout() {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}

export function getMe() {
  return apiClient<ApiResponse<User>>("/auth/me");
}

export function changePassword(payload: ChangePasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/change-password", {
    method: "POST",
    body: payload,
  });
}

export function forgotPassword(payload: ForgotPasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  return apiClient<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}

export function adminCreateUser(payload: AdminCreateUserPayload) {
  return apiClient<ApiResponse<User>>("/auth/admin/create-user", {
    method: "POST",
    body: payload,
  });
}

export function getAdminUsers(params: AdminUsersParams) {
  return apiClient<ApiResponse<User[]>>("/auth/admin/users", {
    params,
  });
}

export function reviewAlumni({
  userId,
  status,
  reason,
}: ReviewAlumniPayload) {
  return apiClient<ApiResponse<User>>(`/auth/admin/alumni/${userId}/review`, {
    method: "PATCH",
    body: { status, reason },
  });
}
