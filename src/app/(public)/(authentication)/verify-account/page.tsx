import { Suspense } from "react";
import AuthSplitShell from "@/components/auth/auth-split-shell";
import VerifyAccountForm from "@/components/form/verify-account-form";

export default function VerifyAccountPage() {
  return (
    <AuthSplitShell
      eyebrow="VERIFY YOUR IDENTITY"
      title="One Platform. Your Entire Campus Life."
      subtitle="Confirm your university email address to activate your CampusOS workspace."
      imageSrc="/auth-register-hero.jpg"
      imageAlt="CampusOS account verification"
      maxWidthClass="max-w-[460px]"
      bottomNote="Your university data stays private and secure"
      bottomIcon="shield"
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Loading verification...</p>}>
        <VerifyAccountForm />
      </Suspense>
    </AuthSplitShell>
  );
}
