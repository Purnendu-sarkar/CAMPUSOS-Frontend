"use client";

import {
  ArrowRight,
  Compass,
  FileSearch,
  Map as MapIcon,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/common/reveal";

type AiModeKey = "cv" | "skill" | "roadmap" | "recommend";

const aiTools: {
  key: AiModeKey;
  icon: typeof FileSearch;
  title: string;
  subtitle: string;
  score: number;
  scoreLabel: string;
  headline: string;
  meta: string;
  highlights: string[];
  bars: { label: string; pct: number }[];
  moves: { tag: string; text: string }[];
}[] = [
  {
    key: "cv",
    icon: FileSearch,
    title: "CV Analyzer",
    subtitle: "Make your experience stand out.",
    score: 84,
    scoreLabel: "CV SCORE / 100",
    headline: "A strong start. Let's refine it.",
    meta: "Alex_Kim_CV.pdf · Real-time AI analysis",
    highlights: ["Clear structure", "Relevant experience"],
    bars: [
      { label: "UI Design & Systems", pct: 88 },
      { label: "User Research", pct: 82 },
      { label: "Prototyping & Handoff", pct: 74 },
    ],
    moves: [
      { tag: "Learn", text: "Complete a user research workshop" },
      { tag: "Build", text: "Publish one end-to-end portfolio case study" },
      { tag: "Connect", text: "Explore product design internships" },
    ],
  },
  {
    key: "skill",
    icon: Target,
    title: "Skill Gap Analysis",
    subtitle: "Know what to learn next.",
    score: 79,
    scoreLabel: "ROLE FIT / 100",
    headline: "2 core skills away from 95% match.",
    meta: "Target: Full-Stack Software Intern",
    highlights: ["TypeScript strong", "Add Redis & Docker"],
    bars: [
      { label: "Next.js & React", pct: 91 },
      { label: "Node.js & PostgreSQL", pct: 84 },
      { label: "Docker & BullMQ Queues", pct: 62 },
    ],
    moves: [
      { tag: "Learn", text: "Master Redis caching & background workers" },
      { tag: "Build", text: "Dockerize a full-stack Prisma project" },
      { tag: "Connect", text: "Book an Alumni systems design review" },
    ],
  },
  {
    key: "roadmap",
    icon: MapIcon,
    title: "Career Roadmap",
    subtitle: "Turn ambitions into achievable steps.",
    score: 88,
    scoreLabel: "MILESTONE PACE",
    headline: "On track for Fall Internship.",
    meta: "12-Week Guided Campus Roadmap",
    highlights: ["Week 4 of 12 active", "3 milestones completed"],
    bars: [
      { label: "Foundations & DSA", pct: 95 },
      { label: "Capstone Project", pct: 80 },
      { label: "Mock Interviews", pct: 70 },
    ],
    moves: [
      { tag: "Learn", text: "Practice 5 system design prompts" },
      { tag: "Build", text: "Ship CampusOS hackathon prototype" },
      { tag: "Connect", text: "Join CSE Tech Club career clinic" },
    ],
  },
  {
    key: "recommend",
    icon: Compass,
    title: "Smart Recommendations",
    subtitle: "Find opportunities that fit your path.",
    score: 92,
    scoreLabel: "MATCH ACCURACY",
    headline: "5 high-fit campus opportunities found.",
    meta: "Curated from Jobs, Mentors & Clubs",
    highlights: ["3 alumni referrals", "2 active internships"],
    bars: [
      { label: "Product Engineering Intern", pct: 94 },
      { label: "Alumni Mentorship Fit", pct: 89 },
      { label: "Campus Innovation Club", pct: 85 },
    ],
    moves: [
      { tag: "Learn", text: "Attend Alumni Product Fireside Chat" },
      { tag: "Build", text: "Tailor CV for FinTech Intern opening" },
      { tag: "Connect", text: "Request 1-on-1 with Alumni Mentor" },
    ],
  },
];

export default function AiCareerSection() {
  const [activeKey, setActiveKey] = useState<AiModeKey>("cv");
  const current = aiTools.find((t) => t.key === activeKey) ?? aiTools[0];

  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (current.score / 100) * circumference;

  return (
    <section
      id="ai-career"
      className="relative overflow-hidden bg-gradient-to-br from-[#06112B] via-[#091A42] to-[#0B2358] py-20 text-white lg:py-24"
    >
      <div className="pointer-events-none absolute -right-28 top-10 size-96 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left Interactive Tool List */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal>
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.16em] text-sky-400 uppercase">
                Intelligence That Moves You Forward
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Your potential.
                <br />A clearer direction.
              </h2>
              <p className="text-sm leading-relaxed text-blue-100/75">
                An AI career companion that connects what you&apos;re learning
                with where you want to go.
              </p>
            </div>
          </Reveal>

          <div className="space-y-2.5">
            {aiTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = tool.key === activeKey;
              return (
                <button
                  key={tool.key}
                  type="button"
                  onClick={() => setActiveKey(tool.key)}
                  className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-sky-400/50 bg-white/10 shadow-lg"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-sky-300"
                    }`}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {tool.title}
                    </p>
                    <p className="text-xs text-blue-200/70">{tool.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.6)] transition-all hover:-translate-y-0.5 hover:from-[#1D4ED8] hover:to-[#155DFC]"
          >
            <span>Discover Your Career Path</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Right Interactive Career Intelligence Card */}
        <div className="lg:col-span-7">
          <Reveal delayMs={120}>
            <div className="rounded-3xl border border-white/15 bg-[#09183B]/90 p-5 shadow-[0_25px_70px_-15px_rgba(2,6,23,0.85)] backdrop-blur-md sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-sky-300">
                  <Sparkles className="size-3.5" />
                  <span>Your career intelligence</span>
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-blue-200/80 uppercase">
                  Demo Preview
                </span>
              </div>

              {/* White Score Highlight Box */}
              <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-4 text-slate-900 shadow-sm sm:flex-row sm:items-center">
                <div className="relative flex size-20 shrink-0 items-center justify-center">
                  <svg className="size-20 -rotate-90" viewBox="0 0 72 72">
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      stroke="#E2E8F0"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      stroke="#2563EB"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold leading-none text-slate-900">
                      {current.score}
                    </span>
                    <span className="mt-0.5 text-[7px] font-semibold tracking-wider text-slate-400 uppercase">
                      {current.scoreLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {current.headline}
                  </h3>
                  <p className="text-xs text-slate-500">{current.meta}</p>
                  <div className="flex flex-wrap gap-3 pt-1 text-[11px] font-medium text-emerald-600">
                    {current.highlights.map((h) => (
                      <span key={h}>✓ {h}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skill Gap Bars */}
              <div className="mt-5 space-y-3">
                <p className="text-xs font-semibold text-blue-100">
                  Skill Gap Analysis · {current.title}
                </p>
                {current.bars.map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-blue-200/80">
                      <span>{bar.label}</span>
                      <span className="font-semibold text-sky-300">
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        style={{ width: `${bar.pct}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Three Moves */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Sparkles className="size-3.5 text-sky-400" />
                  Your next three moves
                </p>
                <div className="space-y-2 text-xs">
                  {current.moves.map((move) => (
                    <div key={move.tag} className="flex items-center gap-3">
                      <span className="w-16 shrink-0 font-semibold text-sky-300">
                        {move.tag}
                      </span>
                      <span className="text-blue-100/85">{move.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-[10px] text-blue-200/50">
                AI suggestions support your decisions. Your future is always
                yours to shape.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
