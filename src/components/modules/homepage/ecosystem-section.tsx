"use client";

import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Compass,
  GraduationCap,
  Monitor,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/common/reveal";

type RoleId = "students" | "teachers" | "alumni" | "admin";

const roleNodes: {
  id: RoleId;
  title: string;
  subtitle: string;
  icon: typeof Users;
  capabilityIndex: number;
}[] = [
  {
    id: "students",
    title: "Students",
    subtitle: "Academic & Career Journey",
    icon: Users,
    capabilityIndex: 0,
  },
  {
    id: "teachers",
    title: "Teachers",
    subtitle: "Academic Management",
    icon: Monitor,
    capabilityIndex: 0,
  },
  {
    id: "alumni",
    title: "Alumni",
    subtitle: "Mentorship & Hiring",
    icon: Award,
    capabilityIndex: 1,
  },
  {
    id: "admin",
    title: "University Administration",
    subtitle: "University Operations",
    icon: ShieldCheck,
    capabilityIndex: 3,
  },
];

const capabilities = [
  {
    icon: BookOpen,
    title: "Academic Management",
    description:
      "Courses, attendance, assignments and academic updates in one place.",
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    description:
      "AI guidance for skills, career paths and internships across the platform.",
  },
  {
    icon: Compass,
    title: "Campus Community",
    description:
      "Connect with classmates, faculty and alumni around shared interests.",
  },
  {
    icon: Building2,
    title: "University Operations",
    description:
      "Support every campus service with one connected operating layer.",
  },
];

export default function EcosystemSection() {
  const [activeRole, setActiveRole] = useState<RoleId | null>(null);

  const activeNode = roleNodes.find((r) => r.id === activeRole);

  return (
    <section id="ecosystem" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
              Campus Ecosystem
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything Your Campus Needs, Connected in One Platform
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              CampusOS brings students, teachers, alumni and university
              administration together with a shared operating layer for
              academics, career growth, community and operations.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.08)] sm:p-10">
            {/* Soft Ambient Corner Blobs */}
            <div className="pointer-events-none absolute -top-12 left-1/2 size-64 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 size-56 rounded-full bg-sky-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-12 size-56 rounded-full bg-amber-100/50 blur-3xl" />

            {/* Diagram Hub Grid */}
            <div className="relative grid items-center gap-6 lg:grid-cols-12">
              {/* Animated SVG Connection Lines (Desktop) */}
              <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
                viewBox="0 0 1000 320"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M270 85 L410 155"
                  stroke={activeRole === "students" ? "#2563EB" : "#CBD5E1"}
                  strokeWidth={activeRole === "students" ? "2.5" : "1.5"}
                  className="animate-campus-dash transition-colors"
                />
                <path
                  d="M270 235 L410 175"
                  stroke={activeRole === "teachers" ? "#2563EB" : "#CBD5E1"}
                  strokeWidth={activeRole === "teachers" ? "2.5" : "1.5"}
                  className="animate-campus-dash transition-colors"
                />
                <path
                  d="M730 85 L590 155"
                  stroke={activeRole === "alumni" ? "#2563EB" : "#CBD5E1"}
                  strokeWidth={activeRole === "alumni" ? "2.5" : "1.5"}
                  className="animate-campus-dash transition-colors"
                />
                <path
                  d="M730 235 L590 175"
                  stroke={activeRole === "admin" ? "#2563EB" : "#CBD5E1"}
                  strokeWidth={activeRole === "admin" ? "2.5" : "1.5"}
                  className="animate-campus-dash transition-colors"
                />
              </svg>

              {/* Left Roles */}
              <div className="relative z-10 flex flex-col gap-5 lg:col-span-3">
                {roleNodes.slice(0, 2).map((node) => {
                  const Icon = node.icon;
                  const isActive = activeRole === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveRole(node.id)}
                      onMouseLeave={() => setActiveRole(null)}
                      onClick={() =>
                        setActiveRole(isActive ? null : node.id)
                      }
                      className={`flex flex-col items-center rounded-2xl border bg-white p-5 text-center transition-all duration-300 ${
                        isActive
                          ? "scale-[1.03] border-blue-400 shadow-[0_14px_30px_-10px_rgba(37,99,235,0.28)]"
                          : "border-slate-200/80 shadow-xs hover:border-blue-200"
                      }`}
                    >
                      <span className="mb-2.5 flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {node.title}
                      </span>
                      <span className="mt-0.5 text-xs text-slate-400">
                        {node.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Center CampusOS Hub */}
              <div className="relative z-10 flex justify-center lg:col-span-6">
                <div className="animate-campus-float flex w-full max-w-[270px] flex-col items-center rounded-2xl bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] px-7 py-8 text-center text-white shadow-[0_24px_50px_-12px_rgba(37,99,235,0.6)]">
                  <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <GraduationCap className="size-6" />
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">CampusOS</h3>
                  <p className="mt-1.5 text-xs text-blue-100/90">
                    One platform for the entire campus ecosystem
                  </p>
                </div>
              </div>

              {/* Right Roles */}
              <div className="relative z-10 flex flex-col gap-5 lg:col-span-3">
                {roleNodes.slice(2, 4).map((node) => {
                  const Icon = node.icon;
                  const isActive = activeRole === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveRole(node.id)}
                      onMouseLeave={() => setActiveRole(null)}
                      onClick={() =>
                        setActiveRole(isActive ? null : node.id)
                      }
                      className={`flex flex-col items-center rounded-2xl border bg-white p-5 text-center transition-all duration-300 ${
                        isActive
                          ? "scale-[1.03] border-blue-400 shadow-[0_14px_30px_-10px_rgba(37,99,235,0.28)]"
                          : "border-slate-200/80 shadow-xs hover:border-blue-200"
                      }`}
                    >
                      <span className="mb-2.5 flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {node.title}
                      </span>
                      <span className="mt-0.5 text-xs text-slate-400">
                        {node.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom 4 Ecosystem Pillars */}
            <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                const highlighted = activeNode?.capabilityIndex === idx;
                return (
                  <div
                    key={cap.title}
                    className={`rounded-2xl border p-4 transition-all duration-300 ${
                      highlighted
                        ? "border-blue-400 bg-blue-50/50 shadow-md"
                        : "border-slate-200/80 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Icon className="size-4" />
                      </span>
                      <h4 className="text-xs font-semibold text-slate-900">
                        {cap.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                      {cap.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
