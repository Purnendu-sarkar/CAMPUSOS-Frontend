import { Quote } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const perspectives = [
  {
    badge: "Students",
    quote:
      '"I want one place to see my classes, stay on top of deadlines and find opportunities that actually fit my goals."',
    initials: "ST",
    title: "Student perspective",
    subtitle: "Undergraduate campus experience",
  },
  {
    badge: "Teachers",
    quote:
      '"When attendance, assignments and class insights come together, I can spend more time helping my students learn."',
    initials: "TE",
    title: "Teacher perspective",
    subtitle: "Faculty & academic mentorship",
  },
  {
    badge: "University Admins",
    quote:
      '"A connected campus means fewer silos — and a clearer view of how we can support every member of our community."',
    initials: "UA",
    title: "University admin perspective",
    subtitle: "Campus operations & governance",
  },
];

export default function PerspectivesSection() {
  return (
    <section id="perspectives" className="bg-[#F7F9FC] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
              One Campus. Many Perspectives.
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built around the people who make it matter.
            </h2>
            <p className="text-sm text-slate-500">
              Designed for every role across the university campus ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {perspectives.map((item, idx) => (
            <Reveal key={item.badge} delayMs={idx * 90}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
                      {item.badge}
                    </span>
                    <Quote className="size-4 text-blue-200" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
