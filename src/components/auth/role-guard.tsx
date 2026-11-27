"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import type { UserRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface RoleGuardProps {
  children: ReactNode;
  roles: UserRole[];
}

export default function RoleGuard({ children, roles }: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;
  const isAuthorized = !!user && roles.includes(user.role);

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login");
      return;
    }

    if (user.status === "PENDING_APPROVAL" && pathname !== "/pending-approval") {
      router.replace("/pending-approval");
      return;
    }

    if (
      user.status === "ACTIVE" &&
      user.needPasswordChange &&
      pathname !== "/change-password"
    ) {
      router.replace("/change-password");
    }
  }, [isPending, isError, user, pathname, router]);

  if (isPending) {
    return <AuthLoading />;
  }

  if (
    isError ||
    !user ||
    user.status === "PENDING_APPROVAL" ||
    user.needPasswordChange
  ) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
