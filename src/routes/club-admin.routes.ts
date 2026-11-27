const prefix = "/club-admin";

export const clubAdminRoutes = [
  {
    title: "Workspace",
    items: [
      { title: "Overview", url: prefix },
      { title: "Club Profile", url: `${prefix}/club` },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Members", url: `${prefix}/members` },
      { title: "Events & RSVPs", url: `${prefix}/events` },
      { title: "Announcements", url: `${prefix}/announcements` },
    ],
  },
];
