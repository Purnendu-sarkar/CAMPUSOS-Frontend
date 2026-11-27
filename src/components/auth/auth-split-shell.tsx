import { Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/assets/svg/Logo";

interface AuthSplitShellProps {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  maxWidthClass?: string;
  bottomNote?: string;
  bottomIcon?: "lock" | "shield";
  accentPosition?: "top-left" | "bottom-right";
}

export default function AuthSplitShell({
  children,
  eyebrow = "YOUR CAMPUS, CONNECTED",
  title = "One Platform. Your Entire Campus Life.",
  subtitle = "Learn, collaborate and manage your university journey from one intelligent workspace.",
  imageSrc = "/auth-login-hero.jpg",
  imageAlt = "CampusOS platform preview",
  maxWidthClass = "max-w-[440px]",
  bottomNote = "Protected by enterprise-grade security",
  bottomIcon = "lock",
  accentPosition = "top-left",
}: AuthSplitShellProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Branded Visual Panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#071238] via-[#0D2568] to-[#0B46B5] p-10 text-white lg:flex xl:p-14">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#173A94]/60" />
        <div className="pointer-events-none absolute right-24 top-36 size-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 size-96 rounded-full bg-[#1859D8]/35" />

        {/* Brand Lockup */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo className="size-10" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                CampusOS
              </span>
              <span className="text-[9px] tracking-[0.14em] text-blue-200/75 uppercase">
                — One Platform. Your Entire Campus Life. —
              </span>
            </div>
          </Link>
        </div>

        {/* Hero Copy + Illustration */}
        <div className="relative z-10 my-auto flex flex-col gap-5 py-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
              {eyebrow}
            </p>
            <h2 className="max-w-md text-3xl font-bold leading-[1.15] tracking-tight text-white xl:text-[36px]">
              {title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-blue-100/80">
              {subtitle}
            </p>
          </div>

          <div className="mt-2 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/30 shadow-[0_24px_60px_-15px_rgba(2,6,23,0.75)]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 text-xs text-blue-200/60">
          &copy; {new Date().getFullYear()} CampusOS University Ecosystem
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F9FBFF] via-[#F4F8FF] to-[#ECF3FF] px-4 py-8 sm:px-8">
        {/* Decorative subtle sky blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-sky-100/70 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-blue-100/60 blur-2xl" />

        {/* Mobile Brand Header */}
        <div className="relative z-10 mb-6 flex justify-center lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-900">
            <Logo className="size-9" />
            <span className="text-lg">CampusOS</span>
          </Link>
        </div>

        <div className={`relative z-10 w-full ${maxWidthClass}`}>
          {accentPosition === "top-left" && (
            <div className="mb-4 ml-1 h-0.5 w-10 rounded-full bg-amber-400" />
          )}

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] sm:p-8">
            {children}
          </div>

          {accentPosition === "bottom-right" && (
            <div className="mt-4 flex justify-end pr-2">
              <div className="h-0.5 w-10 -rotate-12 rounded-full bg-amber-400" />
            </div>
          )}

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            {bottomIcon === "shield" ? (
              <ShieldCheck className="size-3.5" />
            ) : (
              <Lock className="size-3.5" />
            )}
            <span>{bottomNote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
