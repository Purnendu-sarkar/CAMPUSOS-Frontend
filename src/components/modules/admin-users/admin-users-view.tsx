"use client";

import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/debounce.hook";
import type { AdminUsersParams, UserRole, UserStatus } from "@/types";
import AdminUsersLoading from "./admin-users-loading";
import AdminUsersTable from "./admin-users-table";
import CreateStaffDialog from "./create-staff-dialog";

export default function AdminUsersView() {
  const [role, setRole] = useState<"ALL" | UserRole>("ALL");
  const [status, setStatus] = useState<"ALL" | UserStatus>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: AdminUsersParams = {
    page,
    limit: 10,
    ...(role === "ALL" ? {} : { role }),
    ...(status === "ALL" ? {} : { status }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            type="search"
            className="w-64"
            placeholder="Search name or email..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
          />

          <select
            aria-label="Filter by role"
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring"
            value={role}
            onChange={(e) => {
              setRole(e.target.value as "ALL" | UserRole);
              setPage(1);
            }}
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ALUMNI">Alumni</option>
            <option value="CLUB_ADMIN">Club Admin</option>
            <option value="MODERATOR">Moderator</option>
            <option value="UNIVERSITY_ADMIN">University Admin</option>
          </select>

          <select
            aria-label="Filter by status"
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as "ALL" | UserStatus);
              setPage(1);
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>

        <CreateStaffDialog />
      </div>

      <Suspense fallback={<AdminUsersLoading />}>
        <AdminUsersTable {...queryParams} handlePageChange={setPage} />
      </Suspense>
    </div>
  );
}
