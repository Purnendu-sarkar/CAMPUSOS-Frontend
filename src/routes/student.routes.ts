const prefix = "/student";

export const studentRoutes = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: prefix },
      { title: "My Profile", url: `${prefix}/profile` },
    ],
  },
  {
    title: "Academics & Campus",
    items: [
      { title: "Courses", url: `${prefix}/courses` },
      { title: "Clubs & Events", url: `${prefix}/clubs` },
      { title: "Campus Utilities", url: `${prefix}/utilities` },
    ],
  },
  {
    title: "Career & Alumni",
    items: [
      { title: "Jobs & Internships", url: `${prefix}/jobs` },
      { title: "Alumni Mentorship", url: `${prefix}/mentorship` },
      { title: "AI Career Tools", url: `${prefix}/ai-career` },
    ],
  },
];
