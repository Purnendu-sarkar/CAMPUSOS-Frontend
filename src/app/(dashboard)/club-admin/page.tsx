import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function ClubAdminDashboardPage() {
  return (
    <DashboardOverview
      title="Club Admin Dashboard"
      description="Organize campus club memberships, events, RSVPs, and club announcements."
      highlights={[
        { label: "Club Roster", value: "Members", hint: "Approve & manage student members" },
        { label: "Events", value: "RSVPs", hint: "Schedule workshops, fests & track registrations" },
        { label: "Updates", value: "Notices", hint: "Broadcast club announcements" },
      ]}
    />
  );
}
