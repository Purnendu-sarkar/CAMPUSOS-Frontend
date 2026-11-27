import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function ModeratorDashboardPage() {
  return (
    <DashboardOverview
      title="Moderator Dashboard"
      description="Review alumni applications, resolve campus issue reports, and moderate campus utilities."
      highlights={[
        { label: "Verification", value: "Alumni", hint: "Review pending alumni accounts" },
        { label: "Campus Issues", value: "Reports", hint: "Triage & resolve student facility reports" },
        { label: "Utilities", value: "Moderation", hint: "Monitor marketplace & lost-and-found posts" },
      ]}
    />
  );
}
