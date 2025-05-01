
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar, Clipboard, Database, Factory, Package, Settings, Truck, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MRPSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: Factory,
    },
    {
      title: "Bill of Materials",
      path: "/bom",
      icon: Clipboard,
    },
    {
      title: "Production Schedule",
      path: "/production",
      icon: Calendar,
    },
    {
      title: "Purchase Orders",
      path: "/orders",
      icon: Package,
    },
    {
      title: "Employees",
      path: "/employees",
      icon: Users,
    },
    {
      title: "Suppliers",
      path: "/suppliers",
      icon: Truck,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <div className="flex flex-col h-screen">
        <div className="flex items-center h-16 px-4 border-b bg-mrp-primary text-white">
          <h1 className="text-xl font-bold">MRP System</h1>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </div>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Manufacturing</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      className={location.pathname === item.path ? "bg-sidebar-accent" : ""}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
