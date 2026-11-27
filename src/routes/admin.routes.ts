const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Overview",
    items: [{ title: "Dashboard", url: prefix }],
  },
  {
    title: "User & Onboarding",
    items: [
      { title: "Users & Staff", url: `${prefix}/users` },
      { title: "Alumni Approvals", url: `${prefix}/alumni-approvals` },
    ],
  },
  {
    title: "Account",
    items: [{ title: "Change Password", url: "/change-password" }],
  },
];
