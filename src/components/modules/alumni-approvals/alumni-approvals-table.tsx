"use client";

import { SearchX } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useSuspenseGetAdminUsers } from "@/hooks";
import type { AdminUsersParams } from "@/types";

interface Props extends AdminUsersParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function AlumniApprovalsTable({
  handleReview,
  handlePageChange,
  ...params
}: Props) {
  const { data } = useSuspenseGetAdminUsers(params);

  const alumniList = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 0;

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Grad Year</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alumniList.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>
                    <p className="font-medium">No alumni records found</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      There are no alumni matching this status or search query.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              alumniList.map((alumni) => (
                <TableRow key={alumni.id}>
                  <TableCell className="font-medium">{alumni.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {alumni.email}
                  </TableCell>
                  <TableCell>
                    {alumni.alumniProfile?.department || "—"}
                  </TableCell>
                  <TableCell>
                    {alumni.alumniProfile?.graduationYear || "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {alumni.alumniProfile?.currentCompany || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alumni.status === "ACTIVE"
                          ? "success"
                          : alumni.status === "PENDING_APPROVAL"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {alumni.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReview(alumni.id)}
                    >
                      {alumni.status === "PENDING_APPROVAL" ? "Review" : "View"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="my-5">
          <TablePagination
            page={params.page ?? 1}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
