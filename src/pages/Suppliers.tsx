
import { MRPLayout } from "@/components/mrp/MRPLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useSuppliers } from "@/hooks/useSuppliers";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllSuppliers } = useSuppliers();
  const { data: suppliers, isLoading } = getAllSuppliers();

  // Filter suppliers by search term
  const filteredSuppliers = suppliers?.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_info.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Function to render supplier rating as stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              index < rating ? "fill-mrp-accent" : "fill-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">Suppliers</h1>
        <Button className="bg-mrp-primary hover:bg-mrp-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Supplier
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search suppliers..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Loading supplier data...
                </TableCell>
              </TableRow>
            ) : filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.supplier_id}>
                  <TableCell className="font-medium">{supplier.supplier_id}</TableCell>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact_info}</TableCell>
                  <TableCell>{renderRating(supplier.rating)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No suppliers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </MRPLayout>
  );
};

export default Suppliers;
