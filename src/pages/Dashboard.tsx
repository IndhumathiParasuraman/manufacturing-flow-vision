
import { MRPLayout } from "@/components/mrp/MRPLayout";
import { Calendar, Clipboard, Database, Package, Settings, Truck, Users } from "lucide-react";
import { DashboardCard } from "@/components/mrp/DashboardCard";
import { mockBOM, mockEmployees, mockInventory, mockPurchaseOrders, mockSchedule, mockSuppliers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Count items that need reorder
  const itemsNeedingReorder = mockInventory.filter(
    (item) => item.quantity_on_hand <= item.reorder_point
  ).length;

  // Get pending purchase orders
  const pendingOrders = mockPurchaseOrders.filter(
    (order) => order.status === "Ordered" || order.status === "Processing"
  ).length;

  // Calculate total planned production
  const totalPlannedProduction = mockSchedule.reduce(
    (sum, schedule) => sum + schedule.planned_qty,
    0
  );

  const inventoryData = [
    { name: "In Stock", value: mockInventory.length - itemsNeedingReorder, color: "#1E5B94" },
    { name: "Low Stock", value: itemsNeedingReorder, color: "#F26419" },
  ];

  const orderData = [
    { name: "Received", value: mockPurchaseOrders.filter(order => order.status === "Received").length, color: "#10B981" },
    { name: "Processing", value: mockPurchaseOrders.filter(order => order.status === "Processing").length, color: "#F59E0B" },
    { name: "Ordered", value: mockPurchaseOrders.filter(order => order.status === "Ordered").length, color: "#1E5B94" },
  ];

  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">Manufacturing Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Inventory Items"
          value={mockInventory.length}
          icon={<Database className="h-4 w-4" />}
          description="Total unique items in inventory"
        />
        <DashboardCard
          title="Items Needing Reorder"
          value={itemsNeedingReorder}
          icon={<Package className="h-4 w-4" />}
          description="Items below reorder point"
          className={itemsNeedingReorder > 0 ? "border-mrp-accent" : ""}
        />
        <DashboardCard
          title="Pending Purchase Orders"
          value={pendingOrders}
          icon={<Truck className="h-4 w-4" />}
          description="Orders awaiting delivery"
        />
        <DashboardCard
          title="Planned Production"
          value={totalPlannedProduction}
          icon={<Clipboard className="h-4 w-4" />}
          description="Total units in production schedule"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Purchase Order Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Production Schedule Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSchedule.slice(0, 3).map((schedule) => (
                <div key={schedule.schedule_id} className="flex items-center p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-mrp-primary/10 text-mrp-primary flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{schedule.item_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {schedule.start_date.toLocaleDateString()} - {schedule.end_date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{schedule.planned_qty}</span>
                    <p className="text-xs text-muted-foreground">units planned</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MRPLayout>
  );
};

export default Dashboard;
