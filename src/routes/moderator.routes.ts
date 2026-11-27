const prefix = "/moderator";

export const moderatorRoutes = [
  {
    title: "Workspace",
    items: [{ title: "Overview", url: prefix }],
  },
  {
    title: "Campus Moderation",
    items: [
      { title: "Alumni Approvals", url: `${prefix}/alumni-approvals` },
      { title: "Issue Reports", url: `${prefix}/issues` },
      { title: "Marketplace & Lost/Found", url: `${prefix}/utilities` },
    ],
  },
];
