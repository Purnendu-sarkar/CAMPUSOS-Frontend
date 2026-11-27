"use client";

import { Suspense, useState } from "react";
import AdminUsersLoading from "@/components/modules/admin-users/admin-users-loading";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type { AdminUsersParams, UserStatus } from "@/types";
import AlumniApprovalsTable from "./alumni-approvals-table";
import AlumniReviewSheet from "./alumni-review-sheet";

const statusTabs: ["ALL" | UserStatus, string][] = [
  ["PENDING_APPROVAL", "Pending"],
  ["ACTIVE", "Approved"],
  ["BLOCKED", "Rejected"],
  ["ALL", "All"],
];

export default function AlumniApprovalsView() {
  const [tab, setTab] = useState<"ALL" | UserStatus>("PENDING_APPROVAL");
  const [selectedId, setSelectedId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: AdminUsersParams = {
    role: "ALUMNI",
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3">
        <Input
          type="search"
          className="w-64"
          placeholder="Search alumni name or email..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
        />
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as "ALL" | UserStatus);
            setPage(1);
          }}
        >
          <TabsList>
            {statusTabs.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense fallback={<AdminUsersLoading />}>
        <AlumniApprovalsTable
          {...queryParams}
          handleReview={setSelectedId}
          handlePageChange={setPage}
        />
      </Suspense>

      <AlumniReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
}
