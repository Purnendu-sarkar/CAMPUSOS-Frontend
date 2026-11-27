import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const solutions = [
  {
    icon: BookOpen,
    title: "Academic Management",
    description:
      "Manage courses, attendance, assignments and academic activities.",
    span: "lg:col-span-1",
  },
  {
    icon: Sparkles,
    title: "AI Career Assistant",
    description:
      "Help students discover skills, career paths and opportunities.",
    span: "lg:col-span-1",
  },
  {
    icon: MessageSquare,
    title: "Campus Communication",
    description: "Connect students, teachers and university communities.",
    span: "lg:col-span-1",
  },
  {
    icon: CalendarDays,
    title: "Event & Club Management",
    description: "Organize campus activities, clubs and RSVPs efficiently.",
    span: "lg:col-span-1",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job & Internship Platform",
    description:
      "Connect students with verified alumni referrals and career opportunities.",
    span: "lg:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Help universities make data-driven academic and student-success decisions.",
    span: "lg:col-span-2",
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="bg-[#F7F9FC] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#1D63FF] uppercase">
              Smart Campus Solutions
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Powerful Solutions For Every Campus Challenge
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              Modern SaaS feature cards for the campus ecosystem, from academics
              and career growth to community, events and data-driven operations.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delayMs={idx * 60}
                className={item.span}
              >
                <div className="group h-full rounded-2xl border border-[#E6ECF5] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_38px_-14px_rgba(37,99,235,0.16)]">
                  <div className="mb-5 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
