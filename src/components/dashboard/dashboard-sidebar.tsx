"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks";
import {
  adminRoutes,
  alumniRoutes,
  clubAdminRoutes,
  moderatorRoutes,
  studentRoutes,
  teacherRoutes,
} from "@/routes";
import type { UserRole } from "@/types";
import type { SidebarItems } from "@/types/sidebar.type";
import { formatRoleLabel } from "@/utils";

const sidebarRoutes: Record<UserRole, SidebarItems> = {
  STUDENT: studentRoutes,
  TEACHER: teacherRoutes,
  ALUMNI: alumniRoutes,
  CLUB_ADMIN: clubAdminRoutes,
  MODERATOR: moderatorRoutes,
  UNIVERSITY_ADMIN: adminRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <div className="flex flex-col">
            <span className="font-semibold leading-none">CampusOS</span>
            <span className="text-xs text-muted-foreground">
              {formatRoleLabel(role)}
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          disabled={isPending}
          onClick={() =>
            logout(undefined, { onSuccess: () => router.push("/login") })
          }
        >
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
