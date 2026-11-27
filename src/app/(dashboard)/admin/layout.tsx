import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["UNIVERSITY_ADMIN"]}>
      <DashboardShell role="UNIVERSITY_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
