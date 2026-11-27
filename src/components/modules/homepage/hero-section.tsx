"use client";

import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  Compass,
  GraduationCap,
  Network,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import IsometricCampusArt from "./isometric-campus-art";

const audienceStrip = [
  { icon: BookOpen, label: "For every learner" },
  { icon: GraduationCap, label: "For every educator" },
  { icon: Building2, label: "For every university" },
  { icon: Compass, label: "For every next chapter" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#050D24] via-[#09183D] to-[#0D2560] text-white">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-16 size-96 rounded-full bg-sky-500/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-22">
        {/* Left Copy Column */}
        <div className="space-y-6 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-sky-300">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span>One Platform. Your Entire Campus Life.</span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
            Transform Your Entire Campus Experience
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-blue-100/80 sm:text-lg">
            One intelligent platform connecting students, teachers, alumni and
            university services.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:from-[#1D4ED8] hover:to-[#155DFC]"
            >
              <span>Get Started</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/#ecosystem"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-[#12244D]/80 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-[#193268]"
            >
              Explore CampusOS
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-blue-200/80">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-sky-400" />
              Connected by design
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-sky-400" />
              Powered by intelligence
            </span>
          </div>
        </div>

        {/* Right Isometric Ecosystem Preview Card */}
        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#081533]/90 p-3 shadow-[0_28px_70px_-15px_rgba(2,6,23,0.85)]">
            <div className="aspect-[16/11] w-full overflow-hidden rounded-2xl bg-[#07132E]">
              <IsometricCampusArt />
            </div>

            {/* Floating Top-Left Glass Card */}
            <div className="animate-campus-float absolute left-5 top-5 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-[#0A193C]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex">
              <span className="flex size-8 items-center justify-center rounded-xl bg-blue-500/20 text-sky-300">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">
                  Campus Intelligence
                </p>
                <p className="text-[11px] text-blue-200/75">
                  Your next step, connected.
                </p>
              </div>
            </div>

            {/* Floating Bottom-Right Glass Card */}
            <div className="animate-campus-float-slow absolute bottom-5 right-5 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-[#0A193C]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex">
              <span className="flex size-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
                <Network className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-white">
                  One connected ecosystem
                </p>
                <p className="text-[11px] text-blue-200/75">
                  Learning · Community · Careers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Audience Strip */}
      <div className="border-t border-white/10 bg-[#061028]/80">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {audienceStrip.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 text-xs font-medium text-blue-200/80 md:justify-start"
            >
              <Icon className="size-3.5 text-sky-400" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
