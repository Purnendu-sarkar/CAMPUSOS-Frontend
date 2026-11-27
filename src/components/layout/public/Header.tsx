"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { getDashboardPathByRole } from "@/utils";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: loggingOut } = useLogout();
  const router = useRouter();

  const user = data?.data;
  const dashboardHref = user
    ? user.status === "PENDING_APPROVAL"
      ? "/pending-approval"
      : getDashboardPathByRole(user.role)
    : null;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Signed out",
          description: "Logged out successfully.",
          type: "success",
        });
        router.push("/login");
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="h-16 w-full border-b px-4">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo />
          <span>CampusOS</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {route.name}
            </Link>
          ))}

          {dashboardHref && (
            <Link
              href={dashboardHref}
              className="text-primary underline-offset-4 hover:underline"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!isLoading && !user && (
            <>
              <Button
                variant="outline"
                render={<Link href="/login">Login</Link>}
                nativeButton={false}
              >
                Login
              </Button>
              <Button
                render={<Link href="/register">Register</Link>}
                nativeButton={false}
              >
                Register
              </Button>
            </>
          )}
          {!isLoading && user && (
            <Button
              onClick={handleLogout}
              variant="destructive"
              disabled={loggingOut}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
