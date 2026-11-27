import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function AlumniDashboardPage() {
  return (
    <DashboardOverview
      title="Alumni Dashboard"
      description="Mentor current students, share career opportunities, and connect with fellow graduates."
      highlights={[
        { label: "Mentorship", value: "1-on-1", hint: "Manage incoming student mentorship requests" },
        { label: "Hiring", value: "Jobs", hint: "Post internships & full-time openings" },
        { label: "Network", value: "Directory", hint: "Connect across batches and industries" },
      ]}
    />
  );
}
