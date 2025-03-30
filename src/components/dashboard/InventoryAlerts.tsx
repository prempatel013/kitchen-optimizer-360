
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const alerts = [
  { 
    id: 1, 
    item: 'Tomatoes', 
    expiry: '2 days', 
    quantity: '3.5 kg', 
    status: 'danger' 
  },
  { 
    id: 2, 
    item: 'Lettuce', 
    expiry: '3 days', 
    quantity: '2 kg', 
    status: 'warning' 
  },
  { 
    id: 3, 
    item: 'Chicken Breast', 
    expiry: '1 day', 
    quantity: '5 kg', 
    status: 'danger' 
  },
  { 
    id: 4, 
    item: 'Milk', 
    expiry: '4 days', 
    quantity: '10 L', 
    status: 'warning' 
  },
  { 
    id: 5, 
    item: 'Bell Peppers', 
    expiry: '2 days', 
    quantity: '1.5 kg', 
    status: 'danger' 
  },
];

const InventoryAlerts = () => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Inventory Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-white border rounded-md shadow-sm">
              <div>
                <h4 className="font-medium">{alert.item}</h4>
                <p className="text-sm text-muted-foreground">Quantity: {alert.quantity}</p>
              </div>
              <div className="flex items-center">
                <span 
                  className={`pill ${alert.status === 'danger' ? 'pill-danger' : 'pill-warning'}`}
                >
                  Expires in {alert.expiry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;
