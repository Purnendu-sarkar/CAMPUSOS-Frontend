const prefix = "/alumni";

export const alumniRoutes = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: prefix },
      { title: "My Profile", url: `${prefix}/profile` },
    ],
  },
  {
    title: "Networking & Hiring",
    items: [
      { title: "Mentorship Requests", url: `${prefix}/mentorship` },
      { title: "Post Jobs & Internships", url: `${prefix}/jobs` },
      { title: "Alumni Directory", url: `${prefix}/directory` },
    ],
  },
];
