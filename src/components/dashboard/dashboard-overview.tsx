"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetMe } from "@/hooks";
import { formatRoleLabel } from "@/utils";

interface DashboardOverviewProps {
  title: string;
  description: string;
  highlights: { label: string; value: string; hint: string }[];
}

export default function DashboardOverview({
  title,
  description,
  highlights,
}: DashboardOverviewProps) {
  const { data } = useGetMe();
  const user = data?.data;

  return (
    <section className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {user && (
          <div className="flex items-center gap-2">
            <Badge variant="outline">{formatRoleLabel(user.role)}</Badge>
            <Badge variant={user.status === "ACTIVE" ? "success" : "warning"}>
              {user.status}
            </Badge>
          </div>
        )}
      </div>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Your CampusOS workspace is ready. Use the sidebar navigation to
            access your role modules.
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.label}>
            <CardHeader className="pb-2">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {item.hint}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
