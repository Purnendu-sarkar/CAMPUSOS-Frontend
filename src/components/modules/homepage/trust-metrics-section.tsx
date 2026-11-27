"use client";

import { Landmark } from "lucide-react";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Reveal } from "@/components/common/reveal";

const partners = [
  "NORTHFIELD",
  "WESTBRIDGE",
  "HORIZON",
  "MERIDIAN",
  "LAKEVIEW",
];

const metrics = [
  { target: 12000, label: "Students", caption: "Active learners across campus" },
  { target: 850, label: "Teachers", caption: "Faculty & academic mentors" },
  { target: 24, label: "Universities", caption: "Connected campus networks" },
  { target: 320, label: "Courses", caption: "Active academic tracks" },
];

export default function TrustMetricsSection() {
  return (
    <section className="border-b border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <p className="font-medium text-slate-600">
            Built for a more connected university community
          </p>
          <p className="tracking-wider text-slate-400 uppercase text-[10px]">
            Illustrative Campus Ecosystem Metrics
          </p>
        </div>

        {/* Partner University Logos */}
        <Reveal>
          <div className="grid grid-cols-2 items-center gap-6 border-y border-slate-100 py-6 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center gap-2 text-slate-400 transition-colors hover:text-slate-700"
              >
                <Landmark className="size-4" />
                <span className="text-xs font-semibold tracking-[0.2em]">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <Reveal key={metric.label} delayMs={idx * 80}>
              <div className="space-y-1">
                <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  <AnimatedCounter target={metric.target} />
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {metric.label}
                </p>
                <p className="text-[11px] text-slate-400">{metric.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
