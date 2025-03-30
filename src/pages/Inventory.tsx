
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Upload, ChevronRight } from 'lucide-react';

const inventoryItems = [
  { id: 1, name: 'Tomatoes', quantity: '8.5 kg', expiry: '2023-06-30', status: 'In Stock' },
  { id: 2, name: 'Chicken Breast', quantity: '12 kg', expiry: '2023-06-25', status: 'Low Stock' },
  { id: 3, name: 'Lettuce', quantity: '5 kg', expiry: '2023-06-21', status: 'Expiring Soon' },
  { id: 4, name: 'Milk', quantity: '15 L', expiry: '2023-06-28', status: 'In Stock' },
  { id: 5, name: 'Onions', quantity: '10 kg', expiry: '2023-07-15', status: 'In Stock' },
  { id: 6, name: 'Bell Peppers', quantity: '4 kg', expiry: '2023-06-22', status: 'Expiring Soon' },
  { id: 7, name: 'Rice', quantity: '25 kg', expiry: '2023-09-30', status: 'In Stock' },
  { id: 8, name: 'Flour', quantity: '20 kg', expiry: '2023-08-15', status: 'In Stock' },
];

const Inventory = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track your inventory and get AI-powered insights on expiring items.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search inventory..."
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex gap-2">
          <Button className="bg-kitchen-teal hover:bg-kitchen-teal/90">
            <Upload className="mr-2 h-4 w-4" />
            Scan New Items
          </Button>
          <Button variant="outline">
            Add Manually
          </Button>
        </div>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Manage all your kitchen ingredients and supplies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Item</th>
                  <th className="pb-2 text-left font-medium">Quantity</th>
                  <th className="pb-2 text-left font-medium">Expiry Date</th>
                  <th className="pb-2 text-left font-medium">Status</th>
                  <th className="pb-2 text-left font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/20">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.quantity}</td>
                    <td className="py-3">{item.expiry}</td>
                    <td className="py-3">
                      <span 
                        className={`pill ${
                          item.status === 'Expiring Soon' ? 'pill-danger' : 
                          item.status === 'Low Stock' ? 'pill-warning' : 
                          'pill-success'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Computer Vision Detection</CardTitle>
            <CardDescription>Scan items with your camera to auto-detect and log inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-md border flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-muted-foreground">Camera feed will appear here</p>
                <Button className="mt-4 bg-kitchen-teal hover:bg-kitchen-teal/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>Items recently added via computer vision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-border">
                <div className="flex justify-between">
                  <h4 className="font-medium">Batch Scan #1082</h4>
                  <span className="text-sm text-muted-foreground">Today, 3:45 PM</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">10 items detected and added to inventory</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <div className="flex justify-between">
                  <h4 className="font-medium">Batch Scan #1081</h4>
                  <span className="text-sm text-muted-foreground">Yesterday, 11:30 AM</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">8 items detected and added to inventory</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <div className="flex justify-between">
                  <h4 className="font-medium">Batch Scan #1080</h4>
                  <span className="text-sm text-muted-foreground">Yesterday, 9:15 AM</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">5 items detected and added to inventory</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
