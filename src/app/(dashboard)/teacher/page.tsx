import DashboardOverview from "@/components/dashboard/dashboard-overview";

export default function TeacherDashboardPage() {
  return (
    <DashboardOverview
      title="Teacher Dashboard"
      description="Manage assigned courses, take attendance, publish assignments, and share announcements."
      highlights={[
        { label: "Courses", value: "Academic", hint: "Course rosters & syllabus management" },
        { label: "Attendance", value: "Sessions", hint: "Daily student attendance tracking" },
        { label: "Evaluations", value: "Assignments", hint: "Review submissions & publish notices" },
      ]}
    />
  );
}
