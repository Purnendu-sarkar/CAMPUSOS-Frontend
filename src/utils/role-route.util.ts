import type { UserRole } from "@/types";

const DASHBOARD_PATH_BY_ROLE: Record<UserRole, string> = {
  STUDENT: "/student",
  TEACHER: "/teacher",
  ALUMNI: "/alumni",
  CLUB_ADMIN: "/club-admin",
  MODERATOR: "/moderator",
  UNIVERSITY_ADMIN: "/admin",
};

export function getDashboardPathByRole(role: UserRole): string {
  return DASHBOARD_PATH_BY_ROLE[role] || "/student";
}

export function formatRoleLabel(role: UserRole): string {
  return role
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}
