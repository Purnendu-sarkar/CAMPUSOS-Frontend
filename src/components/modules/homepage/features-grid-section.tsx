import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  MessageSquareText,
  Monitor,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const features = [
  {
    icon: Users,
    title: "Student Management",
    tagline: "Every student. Every milestone.",
    description:
      "Profiles, enrollment and academic progress in one organized home.",
  },
  {
    icon: Monitor,
    title: "Teacher Dashboard",
    tagline: "More teaching. Less admin.",
    description:
      "Plan classes, track attendance and share feedback with clarity.",
  },
  {
    icon: Sparkles,
    title: "AI Career Assistant",
    tagline: "Turn potential into a plan.",
    description:
      "Personalized guidance from your first course to your next role.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs & Internship",
    tagline: "Your next opportunity awaits.",
    description:
      "Discover relevant roles, campus placements and internships.",
  },
  {
    icon: CalendarDays,
    title: "Events",
    tagline: "Make campus life happen.",
    description:
      "Find workshops, clubs and experiences worth showing up for.",
  },
  {
    icon: MessageSquareText,
    title: "Campus Community",
    tagline: "Find your people.",
    description:
      "Connect with classmates, faculty and alumni around shared interests.",
  },
  {
    icon: Store,
    title: "Marketplace",
    tagline: "Trade within your community.",
    description:
      "Buy, sell and discover student essentials across your campus.",
  },
  {
    icon: Bell,
    title: "Notifications",
    tagline: "Stay a step ahead.",
    description:
      "Timely updates for deadlines, announcements and opportunities.",
  },
];

export default function FeaturesGridSection() {
  return (
    <section id="features" className="bg-[#F7F9FC] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#1D63FF] uppercase">
              The Campus, Connected
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything your campus needs. Finally, in one place.
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              Less switching between tools. More space for learning, connection
              and possibility.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delayMs={idx * 50}>
                <div className="group h-full rounded-2xl border border-[#E6ECF5] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_38px_-14px_rgba(37,99,235,0.16)]">
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#1D63FF] transition-colors group-hover:bg-[#1D63FF] group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#1D63FF]">
                    {feature.tagline}
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                    {feature.description}
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
