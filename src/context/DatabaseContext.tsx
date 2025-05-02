
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { testConnection } from '@/lib/mysql';
import { toast } from '@/hooks/use-toast';

interface DatabaseContextType {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  checkConnection: () => Promise<boolean>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    setIsConnecting(true);
    try {
      const connected = await testConnection();
      setIsConnected(connected);
      if (connected) {
        toast({
          title: "Mock Database Connected",
          description: "Using mock data in browser. To use real MySQL, implement a backend API.",
        });
      } else {
        setError("Failed to connect to mock database");
        toast({
          title: "Database Connection Failed",
          description: "Could not connect to the mock database. See console for details.",
          variant: "destructive",
        });
      }
      return connected;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown database error";
      setError(errorMessage);
      toast({
        title: "Database Error",
        description: errorMessage,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <DatabaseContext.Provider value={{ isConnected, isConnecting, error, checkConnection }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
