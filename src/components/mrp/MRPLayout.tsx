
import { SidebarProvider } from "@/components/ui/sidebar";
import { MRPSidebar } from "./MRPSidebar";
import { ReactNode } from "react";

interface MRPLayoutProps {
  children: ReactNode;
}

export function MRPLayout({ children }: MRPLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MRPSidebar />
        <main className="flex-1 overflow-auto bg-mrp-background">
          <div className="container p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
