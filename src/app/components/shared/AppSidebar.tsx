import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { useNavigateTo } from "@/hooks/use-navigate";
import { Calendar, Home, Inbox, Box, Table, Palette } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
  {
    title: "Data Table",
    url: "/dashboard",
    icon: Table,
  },
  {
    title: "Feature",
    url: "/feature",
    icon: Calendar,
  },
  {
    title: "Container Demo",
    url: "/container-demo",
    icon: Box,
  },
  {
    title: "Design Editor",
    url: "/design-editor",
    icon: Palette,
  },
];

export function AppSidebar() {
  const navigate = useNavigateTo();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton onClick={() => navigate(item.url)}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
