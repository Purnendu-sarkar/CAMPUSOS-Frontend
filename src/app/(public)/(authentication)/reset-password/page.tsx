import { Suspense } from "react";
import AuthSplitShell from "@/components/auth/auth-split-shell";
import ResetPasswordForm from "@/components/form/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthSplitShell
      eyebrow="RESET CREDENTIALS"
      title="One Platform. Your Entire Campus Life."
      subtitle="Enter your verification code and set a strong new password for your account."
      imageSrc="/auth-login-hero.jpg"
      imageAlt="CampusOS password reset"
      maxWidthClass="max-w-[440px]"
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthSplitShell>
  );
}
