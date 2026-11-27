import AdminUsersView from "@/components/modules/admin-users/admin-users-view";

export default function AdminUsersPage() {
  return (
    <section className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Users & Staff Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse CampusOS accounts across all 6 roles and invite Teachers, Club
          Admins, or Moderators.
        </p>
      </div>
      <AdminUsersView />
    </section>
  );
}
