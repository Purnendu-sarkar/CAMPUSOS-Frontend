import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function ClubAdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["CLUB_ADMIN"]}>
      <DashboardShell role="CLUB_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
