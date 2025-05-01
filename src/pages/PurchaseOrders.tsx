
import { MRPLayout } from "@/components/mrp/MRPLayout";
import { mockPurchaseOrders } from "@/data/mockData";
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
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter purchase orders by search term
  const filteredOrders = mockPurchaseOrders.filter(
    (order) =>
      order.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-green-100 text-green-800";
      case "Ordered":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-amber-100 text-amber-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">Purchase Orders</h1>
        <Button className="bg-mrp-primary hover:bg-mrp-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Create Order
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search orders..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell className="font-medium">{order.order_id}</TableCell>
                <TableCell>{order.item_name}</TableCell>
                <TableCell>{order.supplier_name}</TableCell>
                <TableCell className="text-right">{order.quantity_ordered}</TableCell>
                <TableCell>{order.order_date.toLocaleDateString()}</TableCell>
                <TableCell>{order.expected_date.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No purchase orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </MRPLayout>
  );
};

export default PurchaseOrders;
