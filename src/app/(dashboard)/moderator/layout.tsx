import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function ModeratorLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["MODERATOR"]}>
      <DashboardShell role="MODERATOR">{children}</DashboardShell>
    </RoleGuard>
  );
}
