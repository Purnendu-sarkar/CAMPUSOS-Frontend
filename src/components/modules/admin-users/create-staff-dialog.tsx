"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useAdminCreateUser } from "@/hooks";
import { getApiErrorMessage } from "@/utils";
import { adminCreateUserSchema } from "@/validation";

type CreateStaffValues = z.infer<typeof adminCreateUserSchema>;

export default function CreateStaffDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: createUser, isPending } = useAdminCreateUser();

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStaffValues>({
    resolver: zodResolver(adminCreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "TEACHER",
      employeeId: "",
      department: "",
      designation: "",
      officeRoom: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = (values: CreateStaffValues) => {
    createUser(
      {
        name: values.name,
        email: values.email,
        role: values.role,
        ...(values.role === "TEACHER"
          ? {
              teacherProfile: {
                employeeId: values.employeeId || undefined,
                department: values.department || "",
                designation: values.designation || "",
                officeRoom: values.officeRoom || undefined,
              },
            }
          : {}),
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Account Created",
            description:
              res.message ||
              "Staff account created and temporary password emailed.",
            type: "success",
          });
          reset();
          setOpen(false);
        },
        onError: (err) => {
          toast.add({
            title: "Creation Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger render={<Button />}>
        <UserPlus />
        Create Staff / Role Account
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Staff / Role Account</DialogTitle>
          <DialogDescription>
            A secure temporary password will be emailed to the user, and they
            will be prompted to change it on first login.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="staff-name">Full Name</FieldLabel>
                <Input
                  id="staff-name"
                  placeholder="Dr. Karim Ahmed"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && <FieldError errors={[errors.name]} />}
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="staff-email">Email</FieldLabel>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder="staff@university.edu"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>
            </div>

            <Field data-invalid={!!errors.role}>
              <FieldLabel htmlFor="staff-role">Role</FieldLabel>
              <select
                id="staff-role"
                className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                {...register("role")}
              >
                <option value="TEACHER">Teacher</option>
                <option value="CLUB_ADMIN">Club Admin</option>
                <option value="MODERATOR">Moderator</option>
                <option value="UNIVERSITY_ADMIN">University Admin</option>
              </select>
              {errors.role && <FieldError errors={[errors.role]} />}
            </Field>

            {selectedRole === "TEACHER" && (
              <div className="space-y-4 rounded-lg border bg-muted/30 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Teacher Profile Details
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field data-invalid={!!errors.department}>
                    <FieldLabel htmlFor="t-dept">Department</FieldLabel>
                    <Input
                      id="t-dept"
                      placeholder="Computer Science"
                      aria-invalid={!!errors.department}
                      {...register("department")}
                    />
                    {errors.department && (
                      <FieldError errors={[errors.department]} />
                    )}
                  </Field>

                  <Field data-invalid={!!errors.designation}>
                    <FieldLabel htmlFor="t-desig">Designation</FieldLabel>
                    <Input
                      id="t-desig"
                      placeholder="Associate Professor"
                      aria-invalid={!!errors.designation}
                      {...register("designation")}
                    />
                    {errors.designation && (
                      <FieldError errors={[errors.designation]} />
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="t-empId">
                      Employee ID{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Input
                      id="t-empId"
                      placeholder="FAC-1042"
                      {...register("employeeId")}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="t-room">
                      Office Room{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Input
                      id="t-room"
                      placeholder="AB4-302"
                      {...register("officeRoom")}
                    />
                  </Field>
                </div>
              </div>
            )}
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : (
                "Create & Send Invite"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
