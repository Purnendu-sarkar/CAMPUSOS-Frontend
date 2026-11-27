import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["TEACHER"]}>
      <DashboardShell role="TEACHER">{children}</DashboardShell>
    </RoleGuard>
  );
}
