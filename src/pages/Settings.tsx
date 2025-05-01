
import { MRPLayout } from "@/components/mrp/MRPLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <MRPLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-mrp-primary">System Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-reorder">Automatic Reordering</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create purchase orders when inventory is low
                    </p>
                  </div>
                  <Switch id="auto-reorder" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekend-prod">Weekend Production</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow scheduling production on weekends
                    </p>
                  </div>
                  <Switch id="weekend-prod" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Collect anonymous usage data to improve system
                    </p>
                  </div>
                  <Switch id="analytics" />
                </div>
                
                <Button className="w-full mt-4 bg-mrp-primary hover:bg-mrp-primary/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>
                  Details about the system configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="text-sm font-medium">1.0.0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="text-sm font-medium">May 1, 2025</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Database</p>
                    <p className="text-sm font-medium">PostgreSQL 14.0</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full">
                    Check for Updates
                  </Button>
                  <Button variant="outline" className="w-full text-mrp-accent hover:text-mrp-accent/90">
                    Backup System Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="low-stock">Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when items fall below reorder point
                  </p>
                </div>
                <Switch id="low-stock" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="order-status">Order Status Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when purchase orders change status
                  </p>
                </div>
                <Switch id="order-status" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="prod-complete">Production Completion</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when scheduled production is completed
                  </p>
                </div>
                <Switch id="prod-complete" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications via email
                  </p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              
              <Button className="w-full mt-4 bg-mrp-primary hover:bg-mrp-primary/90">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>
                Connect with other systems and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="erp-connect">ERP System</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect with enterprise resource planning system
                  </p>
                </div>
                <Switch id="erp-connect" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="api-access">API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable external API access to system data
                  </p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="warehouse-sync">Warehouse Management</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync with warehouse management system
                  </p>
                </div>
                <Switch id="warehouse-sync" />
              </div>
              
              <Button className="w-full mt-4 bg-mrp-primary hover:bg-mrp-primary/90">
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MRPLayout>
  );
};

export default Settings;
