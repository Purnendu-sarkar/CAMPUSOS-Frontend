const prefix = "/teacher";

export const teacherRoutes = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: prefix },
      { title: "My Profile", url: `${prefix}/profile` },
    ],
  },
  {
    title: "Academic Management",
    items: [
      { title: "My Courses", url: `${prefix}/courses` },
      { title: "Attendance", url: `${prefix}/attendance` },
      { title: "Assignments", url: `${prefix}/assignments` },
      { title: "Announcements", url: `${prefix}/announcements` },
    ],
  },
];
