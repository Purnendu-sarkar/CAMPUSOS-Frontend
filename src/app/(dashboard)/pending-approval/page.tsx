"use client";

import { Clock, LogOut, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/assets/svg/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMe, useLogout } from "@/hooks";
import { getDashboardPathByRole } from "@/utils";

export default function PendingApprovalPage() {
  const router = useRouter();
  const { data, refetch, isFetching } = useGetMe();
  const { mutate: logout, isPending: loggingOut } = useLogout();

  const user = data?.data;

  useEffect(() => {
    if (user && user.status === "ACTIVE") {
      router.replace(getDashboardPathByRole(user.role));
    }
  }, [user, router]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/30 p-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo />
        <span>CampusOS</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
            <Clock className="size-6" />
          </div>
          <div className="mb-1 flex justify-center">
            <Badge variant="warning">Pending Approval</Badge>
          </div>
          <CardTitle>Alumni Verification in Progress</CardTitle>
          <CardDescription>
            Hello {user?.name || "Alumni"}, your email is verified. A University
            Admin or Moderator is reviewing your alumni details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 rounded-lg bg-muted/40 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user?.email || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Department</span>
            <span className="font-medium">
              {user?.alumniProfile?.department || "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Graduation Year</span>
            <span className="font-medium">
              {user?.alumniProfile?.graduationYear || "—"}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            <RefreshCw className={isFetching ? "animate-spin" : ""} />
            Check Status
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={loggingOut}
            onClick={() =>
              logout(undefined, { onSuccess: () => router.push("/login") })
            }
          >
            <LogOut />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
