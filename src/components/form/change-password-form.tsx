"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useChangePassword, useGetMe, useLogout } from "@/hooks";
import { getApiErrorMessage, getDashboardPathByRole } from "@/utils";
import { changePasswordSchema } from "@/validation";

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const router = useRouter();
  const [showPasswords, setShowPasswords] = useState(false);
  const { data: meData } = useGetMe();
  const { mutate: changePassword, isPending } = useChangePassword();
  const { mutate: logout } = useLogout();

  const user = meData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordValues) => {
    changePassword(
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Password Updated",
            description: "Your new password is active.",
            type: "success",
          });
          router.push(
            user?.role ? getDashboardPathByRole(user.role) : "/student",
          );
        },
        onError: (err) => {
          toast.add({
            title: "Update failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        {user?.needPasswordChange && (
          <div className="mb-2 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
            <ShieldAlert className="size-4 shrink-0" />
            <span>
              Action required: Replace your temporary password before accessing
              your dashboard.
            </span>
          </div>
        )}
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Enter your current (or temporary) password and choose a strong
          personal password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!errors.oldPassword}>
              <FieldLabel htmlFor="cp-old">Current Password</FieldLabel>
              <div className="relative">
                <Input
                  id="cp-old"
                  type={showPasswords ? "text" : "password"}
                  className="pr-10"
                  aria-invalid={!!errors.oldPassword}
                  {...register("oldPassword")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPasswords((prev) => !prev)}
                >
                  {showPasswords ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <FieldError errors={[errors.oldPassword]} />
              )}
            </Field>

            <Field data-invalid={!!errors.newPassword}>
              <FieldLabel htmlFor="cp-new">New Password</FieldLabel>
              <Input
                id="cp-new"
                type={showPasswords ? "text" : "password"}
                aria-invalid={!!errors.newPassword}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <FieldError errors={[errors.newPassword]} />
              )}
            </Field>

            <Field data-invalid={!!errors.confirmPassword}>
              <FieldLabel htmlFor="cp-confirm">Confirm New Password</FieldLabel>
              <Input
                id="cp-confirm"
                type={showPasswords ? "text" : "password"}
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError errors={[errors.confirmPassword]} />
              )}
            </Field>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  logout(undefined, { onSuccess: () => router.push("/login") })
                }
              >
                Logout
              </Button>
              <Button type="submit" className="flex-1" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
