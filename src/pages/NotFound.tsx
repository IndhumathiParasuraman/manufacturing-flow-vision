
import { Button } from "@/components/ui/button";
import { Factory } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-mrp-background">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 rounded-full bg-mrp-primary/10 text-mrp-primary flex items-center justify-center mx-auto mb-6">
          <Factory className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-mrp-primary">404</h1>
        <p className="text-xl text-mrp-secondary mb-6">
          The manufacturing resource you're looking for doesn't exist
        </p>
        <Button asChild className="bg-mrp-primary hover:bg-mrp-primary/90">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
