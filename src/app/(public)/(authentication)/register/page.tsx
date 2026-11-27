import { Suspense } from "react";
import AuthSplitShell from "@/components/auth/auth-split-shell";
import { RegisterForm } from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <AuthSplitShell
      eyebrow="BELONG TO SOMETHING BIGGER"
      title="One Platform. Your Entire Campus Life."
      subtitle="Connect every role, resource, and opportunity in a university ecosystem built for everyone."
      imageSrc="/auth-register-hero.jpg"
      imageAlt="CampusOS students, alumni, and faculty ecosystem"
      maxWidthClass="max-w-[520px]"
      bottomNote="Your university data stays private and secure"
      bottomIcon="shield"
      accentPosition="bottom-right"
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Loading registration...</p>}>
        <RegisterForm />
      </Suspense>
    </AuthSplitShell>
  );
}
