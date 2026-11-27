"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  const needsPendingRedirect =
    user?.status === "PENDING_APPROVAL" && pathname !== "/pending-approval";
  const needsPasswordRedirect =
    user?.status === "ACTIVE" &&
    user?.needPasswordChange &&
    pathname !== "/change-password";

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login");
      return;
    }

    if (needsPendingRedirect) {
      router.replace("/pending-approval");
      return;
    }

    if (needsPasswordRedirect) {
      router.replace("/change-password");
    }
  }, [
    isPending,
    isError,
    user,
    needsPendingRedirect,
    needsPasswordRedirect,
    router,
  ]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user || needsPendingRedirect || needsPasswordRedirect) {
    return <AuthLoading label="Redirecting..." />;
  }

  return <>{children}</>;
}
