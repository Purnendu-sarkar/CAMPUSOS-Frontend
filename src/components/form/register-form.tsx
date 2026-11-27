"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  Hash,
  Info,
  Layers,
  Lock,
  Mail,
  Monitor,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useRegisterAlumni, useRegisterStudent } from "@/hooks";
import { getApiErrorMessage } from "@/utils";
import { alumniRegisterSchema, studentRegisterSchema } from "@/validation";

type JoinRole = "STUDENT" | "TEACHER" | "ALUMNI";
type StudentValues = z.infer<typeof studentRegisterSchema>;
type AlumniValues = z.infer<typeof alumniRegisterSchema>;

const UNIVERSITIES = [
  "CampusOS University",
  "BRAC University",
  "North South University",
  "University of Dhaka",
  "BUET",
  "Daffodil International University",
  "East West University",
];

const DEPARTMENTS = [
  "CSE — Computer Science & Engineering",
  "EEE — Electrical & Electronic Engineering",
  "BBA — Business Administration",
  "English & Humanities",
  "Economics",
  "Architecture",
  "Mathematics & Natural Sciences",
];

const roleCards: {
  id: JoinRole;
  label: string;
  icon: typeof GraduationCap;
}[] = [
  { id: "STUDENT", label: "Student", icon: GraduationCap },
  { id: "TEACHER", label: "Teacher", icon: Monitor },
  { id: "ALUMNI", label: "Alumni", icon: Award },
];

export function RegisterForm() {
  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get("role") === "ALUMNI"
      ? "ALUMNI"
      : searchParams.get("role") === "TEACHER"
        ? "TEACHER"
        : "STUDENT";

  const [selectedRole, setSelectedRole] = useState<JoinRole>(initialRole);

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1.5">
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-600 uppercase">
          Join CampusOS
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
          Create Your CampusOS Account
        </h1>
        <p className="text-sm text-slate-500">
          Join your university ecosystem today
        </p>
      </div>

      {selectedRole === "STUDENT" && (
        <StudentRegistrationForm
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      )}

      {selectedRole === "ALUMNI" && (
        <AlumniRegistrationForm
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      )}

      {selectedRole === "TEACHER" && (
        <TeacherNoticeView
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
        />
      )}

      <p className="text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

function RoleSelectorPills({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: JoinRole;
  onRoleChange: (role: JoinRole) => void;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel className="text-xs font-semibold text-slate-700">
        I am joining as
      </FieldLabel>
      <div className="grid grid-cols-3 gap-2.5">
        {roleCards.map((item) => {
          const Icon = item.icon;
          const active = selectedRole === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onRoleChange(item.id)}
              className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition-all sm:text-sm ${
                active
                  ? "border-blue-500 bg-blue-50/50 text-blue-600 ring-2 ring-blue-500/15"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StudentRegistrationForm({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: JoinRole;
  onRoleChange: (role: JoinRole) => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [university, setUniversity] = useState("");
  const { mutate: registerStudent, isPending } = useRegisterStudent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentValues>({
    resolver: zodResolver(studentRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      department: "",
      batch: "",
      semester: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: StudentValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      studentId: values.studentId,
      department: values.department,
      batch: values.batch,
      semester: values.semester || undefined,
      password: values.password,
    };

    registerStudent(payload, {
      onSuccess: () => {
        toast.add({
          title: "Verification OTP Sent",
          description: "Check your university email for the 6-digit code.",
          type: "success",
        });
        const params = new URLSearchParams({
          email: payload.email,
          role: "STUDENT",
        });
        router.push(`/verify-account?${params.toString()}`);
      },
      onError: (err) => {
        toast.add({
          title: "Registration failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-3.5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="s-name" className="text-xs font-semibold text-slate-700">
            Full Name
          </FieldLabel>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="s-name"
              placeholder="Enter your full name"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </div>
          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="s-email" className="text-xs font-semibold text-slate-700">
            University Email
          </FieldLabel>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="s-email"
              type="email"
              placeholder="you@university.edu"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && <FieldError errors={[errors.email]} />}
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="s-password" className="text-xs font-semibold text-slate-700">
              Password
            </FieldLabel>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="s-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 pr-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="s-confirm" className="text-xs font-semibold text-slate-700">
              Confirm Password
            </FieldLabel>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="s-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 pr-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </Field>
        </div>

        <RoleSelectorPills
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="s-university" className="text-xs font-semibold text-slate-700">
              University
            </FieldLabel>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select
                id="s-university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select University</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </div>
          </Field>

          <Field data-invalid={!!errors.department}>
            <FieldLabel htmlFor="s-department" className="text-xs font-semibold text-slate-700">
              Department
            </FieldLabel>
            <div className="relative">
              <Layers className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select
                id="s-department"
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
                aria-invalid={!!errors.department}
                {...register("department")}
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept.split(" — ")[0]}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.department && <FieldError errors={[errors.department]} />}
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field data-invalid={!!errors.studentId}>
            <FieldLabel htmlFor="s-studentId" className="text-xs font-semibold text-slate-700">
              Student ID
            </FieldLabel>
            <div className="relative">
              <Hash className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="s-studentId"
                placeholder="e.g. 2023-1-60-001"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.studentId}
                {...register("studentId")}
              />
            </div>
            {errors.studentId && <FieldError errors={[errors.studentId]} />}
          </Field>

          <Field data-invalid={!!errors.batch}>
            <FieldLabel htmlFor="s-batch" className="text-xs font-semibold text-slate-700">
              Batch
            </FieldLabel>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="s-batch"
                placeholder="e.g. Spring 2024 / 60"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.batch}
                {...register("batch")}
              />
            </div>
            {errors.batch && <FieldError errors={[errors.batch]} />}
          </Field>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all hover:from-[#1D4ED8] hover:to-[#155DFC]"
        >
          {isPending ? (
            <>
              <Spinner /> Creating Account...
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}

function AlumniRegistrationForm({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: JoinRole;
  onRoleChange: (role: JoinRole) => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { mutate: registerAlumni, isPending } = useRegisterAlumni();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AlumniValues>({
    resolver: zodResolver(alumniRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      graduationYear: new Date().getFullYear() - 1,
      studentId: "",
      currentCompany: "",
      designation: "",
      linkedinUrl: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: AlumniValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      department: values.department,
      graduationYear: values.graduationYear,
      studentId: values.studentId || undefined,
      currentCompany: values.currentCompany || undefined,
      designation: values.designation || undefined,
      linkedinUrl: values.linkedinUrl || undefined,
      password: values.password,
    };

    registerAlumni(payload, {
      onSuccess: () => {
        toast.add({
          title: "Verification OTP Sent",
          description:
            "Verify your email first; then University Admin will review your Alumni account.",
          type: "success",
        });
        const params = new URLSearchParams({
          email: payload.email,
          role: "ALUMNI",
        });
        router.push(`/verify-account?${params.toString()}`);
      },
      onError: (err) => {
        toast.add({
          title: "Registration failed",
          description: getApiErrorMessage(err),
          type: "error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="gap-3.5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="a-name" className="text-xs font-semibold text-slate-700">
            Full Name
          </FieldLabel>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="a-name"
              placeholder="Enter your full name"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </div>
          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="a-email" className="text-xs font-semibold text-slate-700">
            Email Address
          </FieldLabel>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="a-email"
              type="email"
              placeholder="alumni@example.com"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && <FieldError errors={[errors.email]} />}
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="a-password" className="text-xs font-semibold text-slate-700">
              Password
            </FieldLabel>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="a-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 pr-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="a-confirm" className="text-xs font-semibold text-slate-700">
              Confirm Password
            </FieldLabel>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="a-confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 pr-9 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <FieldError errors={[errors.confirmPassword]} />
            )}
          </Field>
        </div>

        <RoleSelectorPills
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field data-invalid={!!errors.department}>
            <FieldLabel htmlFor="a-department" className="text-xs font-semibold text-slate-700">
              Department
            </FieldLabel>
            <div className="relative">
              <Layers className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <select
                id="a-department"
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white"
                aria-invalid={!!errors.department}
                {...register("department")}
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept.split(" — ")[0]}>
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.department && <FieldError errors={[errors.department]} />}
          </Field>

          <Field data-invalid={!!errors.graduationYear}>
            <FieldLabel htmlFor="a-grad" className="text-xs font-semibold text-slate-700">
              Graduation Year
            </FieldLabel>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="a-grad"
                type="number"
                className="h-10 rounded-xl border-slate-200 bg-slate-50/70 pl-9 text-slate-900 focus-visible:bg-white"
                aria-invalid={!!errors.graduationYear}
                {...register("graduationYear", { valueAsNumber: true })}
              />
            </div>
            {errors.graduationYear && (
              <FieldError errors={[errors.graduationYear]} />
            )}
          </Field>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="a-company" className="text-xs font-semibold text-slate-700">
              Current Company <span className="font-normal text-slate-400">(optional)</span>
            </FieldLabel>
            <Input
              id="a-company"
              placeholder="Acme Tech"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              {...register("currentCompany")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="a-designation" className="text-xs font-semibold text-slate-700">
              Designation <span className="font-normal text-slate-400">(optional)</span>
            </FieldLabel>
            <Input
              id="a-designation"
              placeholder="Software Engineer"
              className="h-10 rounded-xl border-slate-200 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white"
              {...register("designation")}
            />
          </Field>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="mt-1 h-11 w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all hover:from-[#1D4ED8] hover:to-[#155DFC]"
        >
          {isPending ? (
            <>
              <Spinner /> Submitting...
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}

function TeacherNoticeView({
  selectedRole,
  onRoleChange,
}: {
  selectedRole: JoinRole;
  onRoleChange: (role: JoinRole) => void;
}) {
  return (
    <div className="space-y-4">
      <RoleSelectorPills
        selectedRole={selectedRole}
        onRoleChange={onRoleChange}
      />

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-slate-700">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-lg bg-blue-100 p-2 text-blue-600">
            <Info className="size-4" />
          </span>
          <div className="space-y-1.5">
            <p className="font-semibold text-slate-900">
              Faculty &amp; Staff Accounts Are Admin-Provisioned
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              For campus security, <strong>Teacher</strong>,{" "}
              <strong>Club Admin</strong>, and <strong>Moderator</strong>{" "}
              accounts are created directly by your{" "}
              <strong>University Admin</strong>. Once your account is created,
              your login credentials are sent to your university email.
            </p>
          </div>
        </div>
      </div>

      <Button
        render={<Link href="/login" />}
        nativeButton={false}
        className="h-11 w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1A6DFF] text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] hover:from-[#1D4ED8] hover:to-[#155DFC]"
      >
        <span>Sign In with Invited Credentials</span>
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
