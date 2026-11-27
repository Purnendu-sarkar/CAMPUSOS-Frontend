"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useResetPassword } from "@/hooks";
import { getApiErrorMessage } from "@/utils";
import { resetPasswordSchema } from "@/validation";

type ResetValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetValues) => {
    resetPassword(
      {
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Password Reset Successful",
            description: "You can now sign in with your new password.",
            type: "success",
          });
          router.push("/login");
        },
        onError: (err) => {
          toast.add({
            title: "Reset failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to your email and choose a new password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="gap-4">
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="rp-email">Email</FieldLabel>
            <Input
              id="rp-email"
              type="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Field data-invalid={!!errors.otp}>
            <FieldLabel htmlFor="rp-otp">6-Digit OTP</FieldLabel>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <InputOTP
                  id="rp-otp"
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.otp && <FieldError errors={[errors.otp]} />}
          </Field>

          <Field data-invalid={!!errors.newPassword}>
            <FieldLabel htmlFor="rp-new">New Password</FieldLabel>
            <div className="relative">
              <Input
                id="rp-new"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                aria-invalid={!!errors.newPassword}
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.newPassword && <FieldError errors={[errors.newPassword]} />}
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="rp-confirm">Confirm New Password</FieldLabel>
            <Input
              id="rp-confirm"
              type={showPassword ? "text" : "password"}
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </Field>

          <Button type="submit" disabled={isPending} size="lg">
            {isPending ? (
              <>
                <Spinner /> Updating password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Back to Sign in
        </Link>
      </div>
    </div>
  );
}
