"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/svg/Logo";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { getDashboardPathByRole } from "@/utils";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Students", href: "/#perspectives" },
  { name: "Teachers", href: "/#ecosystem" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="size-9" />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight text-slate-900">
              CampusOS
            </span>
            <span className="hidden text-[9px] tracking-[0.12em] text-slate-400 uppercase sm:block">
              One Platform. Your Entire Campus Life.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="transition-colors hover:text-[#1D63FF]"
            >
              {route.name}
            </Link>
          ))}
          {dashboardHref && (
            <Link
              href={dashboardHref}
              className="font-semibold text-[#1D63FF] hover:text-[#1550D6]"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          {!isLoading && !user && (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] px-4 text-sm font-semibold text-white shadow-[0_6px_18px_-4px_rgba(37,99,235,0.45)] transition-all hover:from-[#1D4ED8] hover:to-[#155DFC]"
              >
                <span>Get Started</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </>
          )}
          {!isLoading && user && (
            <>
              {dashboardHref && (
                <Link
                  href={dashboardHref}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-rose-50 px-4 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-50"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            {navLinks.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 hover:text-[#1D63FF]"
              >
                {route.name}
              </Link>
            ))}
            {dashboardHref && (
              <Link
                href={dashboardHref}
                onClick={() => setMobileOpen(false)}
                className="py-1 font-semibold text-[#1D63FF]"
              >
                Dashboard
              </Link>
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] text-sm font-semibold text-white"
                >
                  Get Started <ArrowRight className="size-4" />
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                disabled={loggingOut}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-50 text-sm font-medium text-rose-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
