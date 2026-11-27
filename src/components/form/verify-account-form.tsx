"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useResendOtp, useVerifyEmail } from "@/hooks";
import { getApiErrorMessage, getDashboardPathByRole } from "@/utils";
import { verifyOtpSchema } from "@/validation";

const RESEND_COOLDOWN = 60;

type VerifyValues = z.infer<typeof verifyOtpSchema>;

export default function VerifyAccountForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const roleParam = searchParams.get("role") || "STUDENT";

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendOtp, isPending: resending } = useResendOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const onSubmit = (values: VerifyValues) => {
    verifyEmail(values, {
      onSuccess: (res) => {
        const user = res.data?.user;
        if (user?.status === "PENDING_APPROVAL") {
          toast.add({
            title: "Email Verified",
            description:
              "Your alumni account is awaiting University Admin approval.",
            type: "success",
          });
          router.push("/pending-approval");
          return;
        }

        toast.add({
          title: "Verification Successful",
          description: "Welcome to CampusOS!",
          type: "success",
        });
        router.push(user?.role ? getDashboardPathByRole(user.role) : "/student");
      },
      onError: (err) => {
        toast.add({
          title: "Verification failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  const handleResend = () => {
    resendOtp(
      { email, type: "REGISTRATION" },
      {
        onSuccess: () => {
          toast.add({
            title: "OTP Resent",
            description: "Please check your inbox for the new code.",
            type: "success",
          });
          setResendTimer(RESEND_COOLDOWN);
        },
        onError: (err) => {
          toast.add({
            title: "Resend failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  if (!email) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit verification code sent to{" "}
          <span className="font-medium text-foreground">{email}</span>
          {roleParam === "ALUMNI" ? " (Alumni registration)" : ""}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="otp-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field data-invalid={!!errors.otp}>
            <FieldLabel htmlFor="otp">One-Time Password (OTP)</FieldLabel>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  pattern={REGEXP_ONLY_DIGITS}
                  autoComplete="off"
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
            <FieldDescription>
              {resendTimer > 0
                ? `You can request a new code in ${resendTimer}s`
                : "Didn't receive the code? Click Resend below."}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={resendTimer > 0 || resending}
          onClick={handleResend}
        >
          {resending ? "Sending..." : "Resend OTP"}
        </Button>
        <Button type="submit" form="otp-form" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner /> Verifying...
            </>
          ) : (
            "Verify Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
