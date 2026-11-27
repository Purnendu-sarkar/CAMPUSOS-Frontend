import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <span className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
        Centralized University Management &amp; Campus Ecosystem
      </span>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        CampusOS — One Platform. Your Entire Campus Life.
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground">
        Unified academic management, jobs &amp; internships, alumni mentorship,
        campus clubs, utilities, and AI-powered career tools in one place.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" render={<Link href="/register">Get Started</Link>} nativeButton={false}>
          Get Started
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/login">Sign in</Link>}
          nativeButton={false}
        >
          Sign in
        </Button>
      </div>
    </section>
  );
}
