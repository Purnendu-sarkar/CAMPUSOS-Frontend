"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import GoogleLoginComponent from "@/components/modules/google-login/GoogleLogin";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useLogin } from "@/hooks";
import { getApiErrorMessage, getDashboardPathByRole } from "@/utils";
import { loginSchema } from "@/validation";

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    login(values, {
      onSuccess: (res) => {
        const user = res.data?.user;
        toast.add({
          title: "Welcome back",
          description: res.message || "Logged in successfully.",
          type: "success",
        });

        if (user?.needPasswordChange) {
          router.push("/change-password");
        } else if (user?.status === "PENDING_APPROVAL") {
          router.push("/pending-approval");
        } else if (user?.role) {
          router.push(getDashboardPathByRole(user.role));
        } else {
          router.push("/");
        }
      },
      onError: (err) => {
        toast.add({
          title: "Login failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Top Pill Badge & Heading */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-blue-600 uppercase">
          <ShieldCheck className="size-3.5" />
          Secure Campus Access
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500">
          Sign in to continue your CampusOS journey
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className="text-xs font-semibold text-slate-700">
              University Email
            </FieldLabel>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@university.edu"
                autoComplete="email"
                className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password" className="text-xs font-semibold text-slate-700">
              Password
            </FieldLabel>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-11 rounded-xl border-slate-200 bg-slate-50/70 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 select-none">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="border-slate-300 data-checked:border-blue-600 data-checked:bg-blue-600"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all hover:from-[#1D4ED8] hover:to-[#155DFC]"
          >
            {isPending ? (
              <>
                <Spinner /> Signing In...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* OR Divider */}
      <div className="relative flex items-center py-0.5">
        <div className="grow border-t border-slate-200" />
        <span className="mx-3 shrink text-[11px] font-medium tracking-wider text-slate-400 uppercase">
          OR
        </span>
        <div className="grow border-t border-slate-200" />
      </div>

      <GoogleLoginComponent />

      <p className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
