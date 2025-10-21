"use client"

import * as React from "react"
import {
  LayoutDashboard,
 
  CheckSquare,

  Settings,
 
  Users,
} from "lucide-react"



import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Mohammed ",
    email: "Test@example.com",
    avatar: "",
  },
  navGroups: [
    ,
    {
      label: "Features",
      items: [
        {
          title: "Tasks",
          url: "/tasks",
          icon: CheckSquare,
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
      ],
    },
    {
      label: "Pages",
      items: [
       ,
     ,
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            {
              title: "User Settings",
              url: "/settings/user",
            },
            {
              title: "Account Settings",
              url: "/settings/account",
            },
           ,
          
          ],
        },
      ,
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
            
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
      
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
