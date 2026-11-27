import AlumniApprovalsView from "@/components/modules/alumni-approvals/alumni-approvals-view";

export default function AdminAlumniApprovalsPage() {
  return (
    <section className="space-y-4 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Alumni Approvals
        </h1>
        <p className="text-sm text-muted-foreground">
          Review pending alumni registrations and approve or reject their access
          to CampusOS.
        </p>
      </div>
      <AlumniApprovalsView />
    </section>
  );
}
