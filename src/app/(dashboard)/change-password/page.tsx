import Link from "next/link";
import Logo from "@/assets/svg/Logo";
import ChangePasswordForm from "@/components/form/change-password-form";

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo />
        <span>CampusOS</span>
      </Link>
      <ChangePasswordForm />
    </div>
  );
}
