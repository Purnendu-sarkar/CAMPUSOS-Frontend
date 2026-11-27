import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function AlumniLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["ALUMNI"]}>
      <DashboardShell role="ALUMNI">{children}</DashboardShell>
    </RoleGuard>
  );
}
