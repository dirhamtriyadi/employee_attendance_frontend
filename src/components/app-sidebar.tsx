import * as React from "react";
import { Command, LayoutDashboard, Users, ListCheck } from "lucide-react";

import { NavMenu } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/app/hooks";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = useAppSelector((state) => state.auth);

  const data = {
    user: {
      name: auth?.user?.fullName,
      email: auth?.user?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    menu: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Attendances",
        url: "#",
        icon: ListCheck,
      },
      {
        name: "Users",
        url: "#",
        icon: Users,
      },
    ],
  };

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Employee Attendance
                  </span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu projects={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
