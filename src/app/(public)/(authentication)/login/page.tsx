import AuthSplitShell from "@/components/auth/auth-split-shell";
import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <AuthSplitShell
      eyebrow="YOUR CAMPUS, CONNECTED"
      title="One Platform. Your Entire Campus Life."
      subtitle="Learn, collaborate and manage your university journey from one intelligent workspace."
      imageSrc="/auth-login-hero.jpg"
      imageAlt="Student collaborating on CampusOS"
      maxWidthClass="max-w-[440px]"
      bottomNote="Protected by enterprise-grade security"
      bottomIcon="lock"
      accentPosition="top-left"
    >
      <LoginForm />
    </AuthSplitShell>
  );
}
