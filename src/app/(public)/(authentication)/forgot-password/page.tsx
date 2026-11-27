import AuthSplitShell from "@/components/auth/auth-split-shell";
import ForgotPasswordForm from "@/components/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthSplitShell
      eyebrow="ACCOUNT RECOVERY"
      title="One Platform. Your Entire Campus Life."
      subtitle="We will send a secure 6-digit verification code to reset your password."
      imageSrc="/auth-login-hero.jpg"
      imageAlt="CampusOS password recovery"
      maxWidthClass="max-w-[440px]"
    >
      <ForgotPasswordForm />
    </AuthSplitShell>
  );
}
