"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useForgotPassword } from "@/hooks";
import { getApiErrorMessage } from "@/utils";
import { forgotPasswordSchema } from "@/validation";

type ForgotValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotValues) => {
    forgotPassword(values, {
      onSuccess: () => {
        toast.add({
          title: "OTP Sent",
          description: "Check your email for the password reset OTP.",
          type: "success",
        });
        const params = new URLSearchParams({ email: values.email });
        router.push(`/reset-password?${params.toString()}`);
      },
      onError: (err) => {
        toast.add({
          title: "Request failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your registered email to receive a 6-digit reset OTP.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="fp-email">Email</FieldLabel>
            <Input
              id="fp-email"
              type="email"
              placeholder="you@university.edu"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Button type="submit" disabled={isPending} size="lg">
            {isPending ? (
              <>
                <Spinner /> Sending OTP...
              </>
            ) : (
              "Send Reset OTP"
            )}
          </Button>
        </FieldGroup>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
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
