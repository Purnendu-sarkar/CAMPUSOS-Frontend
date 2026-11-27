import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/common/reveal";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#050D24] via-[#091A42] to-[#0B2358] py-20 text-center text-white lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="space-y-5">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] text-sky-400 uppercase">
              <Sparkles className="size-3.5" />
              The Next Chapter Starts Here
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to build the future of campus life?
            </h2>
            <p className="text-sm text-blue-100/80 sm:text-base">
              One connected experience. A world of possibility.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] px-7 text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:from-[#1D4ED8] hover:to-[#155DFC]"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
