import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function AdminDashboardPage() {
  return (
    <DashboardOverview
      title="University Admin Dashboard"
      description="Oversee CampusOS users, create staff/role accounts, and approve alumni profiles."
      highlights={[
        { label: "Staff Onboarding", value: "Invite", hint: "Create Teacher, Club Admin & Moderator accounts" },
        { label: "Alumni Queue", value: "Review", hint: "Approve or reject pending alumni signups" },
        { label: "Governance", value: "6 Roles", hint: "Centralized university RBAC control" },
      ]}
    />
  );
}
