import { Briefcase, Globe, Mail, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/svg/Logo";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo className="size-9" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                  CampusOS
                </span>
                <span className="text-[9px] tracking-[0.12em] text-slate-400 uppercase">
                  One Platform. Your Entire Campus Life.
                </span>
              </div>
            </Link>
            <p className="text-xs font-semibold text-slate-800">
              One Platform. Your Entire Campus Life.
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-slate-500">
              Learning, community and careers. Connected in one intelligent
              university campus ecosystem.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Briefcase, label: "Careers" },
                { icon: Globe, label: "Website" },
                { icon: Share2, label: "Community" },
                { icon: MessageSquare, label: "Support" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#contact"
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50/60 text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/#features" className="hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#solutions" className="hover:text-blue-600">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/#perspectives" className="hover:text-blue-600">
                  Students
                </Link>
              </li>
              <li>
                <Link href="/#ecosystem" className="hover:text-blue-600">
                  Teachers
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-blue-600">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 uppercase">
              Features
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <Link href="/#ai-career" className="hover:text-blue-600">
                  AI Career Assistant
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-600">
                  Jobs &amp; Internship
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-600">
                  Campus Community
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-600">
                  Events &amp; Marketplace
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-600">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wide text-slate-900 uppercase">
              Contact
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">
              Start a conversation about your connected university campus.
            </p>
            <a
              href="mailto:hello@campusos.edu"
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 hover:underline"
            >
              <Mail className="size-3.5" />
              hello@campusos.edu
            </a>
            <p className="text-[11px] text-slate-400">
              Unified campus support for Students, Faculty, Alumni &amp; Admins.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CampusOS. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about-us" className="hover:text-slate-600">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="hover:text-slate-600">
              Terms of Service
            </Link>
            <Link href="/about-us" className="hover:text-slate-600">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
