"use client";

import { Building2, GraduationCap, Link2, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useGetAdminUsers, useReviewAlumni } from "@/hooks";
import type { AdminUsersParams } from "@/types";
import { getApiErrorMessage } from "@/utils";

interface Props extends AdminUsersParams {
  selectedId: string;
  onClose: () => void;
}

export default function AlumniReviewSheet({
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAdminUsers(params);
  const { mutate: reviewAlumni, isPending } = useReviewAlumni();

  const selectedAlumni = data?.data?.find((user) => user.id === selectedId);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "ACTIVE" | "BLOCKED") => {
    reviewAlumni(
      {
        userId: selectedId,
        status,
        reason: status === "BLOCKED" ? rejectionReason.trim() : undefined,
      },
      {
        onSuccess: (res) => {
          toast.add({
            title: status === "ACTIVE" ? "Alumni Approved" : "Alumni Rejected",
            description: res.message || "Review saved and user notified.",
            type: "success",
          });
          handleClose();
        },
        onError: (err) => {
          toast.add({
            title: "Review Failed",
            description: getApiErrorMessage(err),
            type: "error",
          });
        },
      },
    );
  };

  if (!selectedAlumni) {
    return null;
  }

  const profile = selectedAlumni.alumniProfile;

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="right" className="gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Review Alumni Application</SheetTitle>
          <SheetDescription>
            Verify graduation and professional details before approving or
            rejecting this account.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="rounded-full bg-primary/10 p-2.5">
                <GraduationCap className="size-5 text-primary" />
              </span>
              <div>
                <p className="font-semibold">{selectedAlumni.name}</p>
                <p className="text-sm text-muted-foreground">
                  {profile?.department || "—"} • Class of{" "}
                  {profile?.graduationYear || "—"}
                </p>
              </div>
            </div>
            <Badge
              variant={
                selectedAlumni.status === "ACTIVE"
                  ? "success"
                  : selectedAlumni.status === "PENDING_APPROVAL"
                    ? "warning"
                    : "destructive"
              }
            >
              {selectedAlumni.status}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              <span>{selectedAlumni.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span>
                {profile?.designation ? `${profile.designation} at ` : ""}
                {profile?.currentCompany || "Company not provided"}
              </span>
            </div>
            {profile?.linkedinUrl && (
              <div className="flex items-center gap-2">
                <Link2 className="size-4 text-muted-foreground" />
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-primary underline underline-offset-4"
                >
                  {profile.linkedinUrl}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-muted-foreground" />
              <span>
                {selectedAlumni.isVerified
                  ? "Email verified"
                  : "Email not verified"}
              </span>
            </div>
          </div>

          {profile?.studentId && (
            <>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Former Student ID</span>
                <span className="font-mono font-medium">
                  {profile.studentId}
                </span>
              </div>
            </>
          )}
        </div>

        {selectedAlumni.status === "PENDING_APPROVAL" && (
          <SheetFooter className="border-t">
            {confirmRejection ? (
              <div className="flex w-full flex-col gap-3">
                <Textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide a reason for rejecting this alumni signup..."
                  rows={3}
                  disabled={isPending}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    disabled={isPending}
                    onClick={() => setConfirmRejection(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="flex-1"
                    disabled={!rejectionReason.trim() || isPending}
                    onClick={() => handleReviewAction("BLOCKED")}
                  >
                    {isPending && <Spinner />}
                    Confirm Reject
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex w-full gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1"
                  disabled={isPending}
                  onClick={() => setConfirmRejection(true)}
                >
                  Reject
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  disabled={isPending}
                  onClick={() => handleReviewAction("ACTIVE")}
                >
                  {isPending && <Spinner />}
                  Approve
                </Button>
              </div>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
