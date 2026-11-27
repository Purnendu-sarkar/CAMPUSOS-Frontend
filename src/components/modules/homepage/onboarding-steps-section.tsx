import { Landmark, Layers, TrendingUp, UserPlus } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description:
      "Start with your profile and make CampusOS your own.",
  },
  {
    number: "02",
    icon: Landmark,
    title: "Join University",
    description:
      "Find your university and connect to your campus workspace.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Connect Campus Services",
    description:
      "Bring academics, community and opportunities into one view.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow Career",
    description:
      "Build skills, discover your direction and take the next step.",
  },
];

export default function OnboardingStepsSection() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold tracking-[0.16em] text-blue-600 uppercase">
              A Simple Start. An Entire World of Possibility.
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your connected campus starts here.
            </h2>
            <p className="text-sm text-slate-500 sm:text-base">
              Four steps from getting started to moving forward.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delayMs={idx * 90}>
                <div className="group space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-slate-200 transition-colors group-hover:bg-blue-200" />
                    <Icon className="size-4 shrink-0 text-blue-600" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
