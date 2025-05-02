
import { SidebarProvider } from "@/components/ui/sidebar";
import { MRPSidebar } from "./MRPSidebar";
import { ReactNode } from "react";
import { useDatabase } from "@/context/DatabaseContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, AlertCircle } from "lucide-react";

interface MRPLayoutProps {
  children: ReactNode;
}

export function MRPLayout({ children }: MRPLayoutProps) {
  const { isConnected, isConnecting, error } = useDatabase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MRPSidebar />
        <main className="flex-1 overflow-auto bg-mrp-background">
          {isConnecting ? (
            <div className="p-4 md:p-6">
              <Alert className="bg-blue-50">
                <Database className="h-4 w-4" />
                <AlertTitle>Connecting to Database</AlertTitle>
                <AlertDescription>
                  Establishing connection to the MySQL database...
                </AlertDescription>
              </Alert>
            </div>
          ) : !isConnected && (
            <div className="p-4 md:p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Database Connection Failed</AlertTitle>
                <AlertDescription>
                  {error || "Could not connect to the MySQL database. Please check your configuration."}
                </AlertDescription>
              </Alert>
            </div>
          )}
          <div className="container p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
