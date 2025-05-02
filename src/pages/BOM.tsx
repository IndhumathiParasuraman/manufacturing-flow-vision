
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
import { useBOM } from "@/hooks/useBOM";

const BOM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllBOM } = useBOM();
  const { data: bomItems, isLoading } = getAllBOM();

  // Filter BOM items by search term
  const filteredBOM = bomItems?.filter(
    (item) =>
      item.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.component_name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">Bill of Materials</h1>
        <Button className="bg-mrp-primary hover:bg-mrp-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Component
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search BOM entries..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent Item</TableHead>
              <TableHead>Component</TableHead>
              <TableHead className="text-right">Quantity Needed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Loading BOM data...
                </TableCell>
              </TableRow>
            ) : filteredBOM.length > 0 ? (
              filteredBOM.map((item, index) => (
                <TableRow key={`${item.parent_item_id}-${item.component_id}-${index}`}>
                  <TableCell className="font-medium">{item.parent_name}</TableCell>
                  <TableCell>{item.component_name}</TableCell>
                  <TableCell className="text-right">{item.quantity_needed}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                  No BOM entries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </MRPLayout>
  );
};

export default BOM;
