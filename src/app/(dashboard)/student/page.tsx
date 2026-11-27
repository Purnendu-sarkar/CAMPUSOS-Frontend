import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function StudentDashboardPage() {
  return (
    <DashboardOverview
      title="Student Dashboard"
      description="Manage courses, jobs & internships, alumni mentorship, campus clubs, and AI career tools."
      highlights={[
        { label: "Academic Hub", value: "Courses", hint: "Enrollments, attendance & assignments" },
        { label: "Career Center", value: "Jobs & AI", hint: "CV Analyzer, Skill Gaps & Internships" },
        { label: "Campus Life", value: "Clubs", hint: "Events, marketplace & lost and found" },
      ]}
    />
  );
}
