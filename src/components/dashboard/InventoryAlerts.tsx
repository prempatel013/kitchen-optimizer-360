
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryAlert, inventoryService } from '@/services/inventory-service';

const InventoryAlerts = () => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial alerts
    const fetchAlerts = async () => {
      try {
        const data = await inventoryService.getAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();

    // Subscribe to real-time alert updates
    const unsubscribe = inventoryService.subscribeToAlerts(newAlerts => {
      setAlerts(newAlerts);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Inventory Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-kitchen-teal border-t-transparent rounded-full"></div>
          </div>
        ) : alerts.length > 0 ? (
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
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No alerts at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryAlerts;
