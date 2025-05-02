
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
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useProductionSchedule } from "@/hooks/useProductionSchedule";

const ProductionSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getAllSchedules } = useProductionSchedule();
  const { data: schedules, isLoading } = getAllSchedules();

  // Filter production schedules by search term
  const filteredSchedules = schedules?.filter(
    (schedule) =>
      schedule.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.schedule_id.toString().includes(searchTerm)
  ) || [];

  // Function to determine if a production is active, upcoming, or completed
  const getProductionStatus = (schedule: { start_date: Date; end_date: Date }) => {
    const today = new Date();
    
    if (schedule.start_date > today) {
      return { status: "Upcoming", color: "bg-blue-100 text-blue-800" };
    } else if (schedule.end_date < today) {
      return { status: "Completed", color: "bg-green-100 text-green-800" };
    } else {
      return { status: "Active", color: "bg-amber-100 text-amber-800" };
    }
  };

  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">Production Schedule</h1>
        <Button className="bg-mrp-primary hover:bg-mrp-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Schedule
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search schedules..."
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
              <TableHead>Item</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Planned Qty</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading production schedule data...
                </TableCell>
              </TableRow>
            ) : filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => {
                const { status, color } = getProductionStatus(schedule);
                return (
                  <TableRow key={schedule.schedule_id}>
                    <TableCell className="font-medium">{schedule.schedule_id}</TableCell>
                    <TableCell>{schedule.item_name}</TableCell>
                    <TableCell>{schedule.start_date.toLocaleDateString()}</TableCell>
                    <TableCell>{schedule.end_date.toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{schedule.planned_qty}</TableCell>
                    <TableCell>
                      <Badge className={color}>{status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No production schedules found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </MRPLayout>
  );
};

export default ProductionSchedule;
