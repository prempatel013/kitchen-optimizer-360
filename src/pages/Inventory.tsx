
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Upload, ChevronRight } from 'lucide-react';
import { inventoryService, InventoryItem } from '@/services/inventory-service';
import { useBackendConnection } from '@/hooks/use-backend-connection';
import { toast } from '@/hooks/use-toast';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scanning, setScanning] = useState(false);
  const [recentScans, setRecentScans] = useState<{id: string, timestamp: string, count: number}[]>([]);
  const { connectWebsockets, isFullyConnected } = useBackendConnection();

  // Connect to WebSockets and fetch initial data
  useEffect(() => {
    connectWebsockets();
    
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getAll();
        setInventoryItems(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        toast({
          title: 'Error fetching inventory',
          description: 'Could not retrieve inventory data from the server.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();

    // Subscribe to real-time inventory updates
    const unsubscribe = inventoryService.subscribeToUpdates((updatedItems) => {
      setInventoryItems(prev => {
        // Merge updated items with existing items
        const itemMap = new Map(prev.map(item => [item.id, item]));
        
        updatedItems.forEach(item => {
          itemMap.set(item.id, item);
        });
        
        return Array.from(itemMap.values());
      });
    });

    return () => {
      unsubscribe();
    };
  }, [connectWebsockets]);

  // Filter inventory items based on search term
  const filteredItems = searchTerm
    ? inventoryItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : inventoryItems;

  // Handle image upload for scanning
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setScanning(true);
      const file = files[0];
      const result = await inventoryService.uploadImage(file);
      
      // Add scanned items to inventory
      if (result.detectedItems && result.detectedItems.length > 0) {
        // Update inventory items with new scan data
        setInventoryItems(prev => {
          const itemMap = new Map(prev.map(item => [item.id, item]));
          
          result.detectedItems.forEach(item => {
            itemMap.set(item.id, item);
          });
          
          return Array.from(itemMap.values());
        });

        // Add to recent scans
        const newScan = {
          id: `scan-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          count: result.detectedItems.length
        };
        
        setRecentScans(prev => [newScan, ...prev.slice(0, 2)]);
        
        toast({
          title: 'Scan complete',
          description: `${result.detectedItems.length} items detected and added to inventory.`,
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Error scanning inventory:', error);
      toast({
        title: 'Scan failed',
        description: 'Could not process the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setScanning(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  // Handle manual item addition
  const handleAddManually = () => {
    toast({
      title: 'Coming soon',
      description: 'Manual item addition will be available in the next update.',
      variant: 'default',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track your inventory and get AI-powered insights on expiring items.</p>
      </div>

      {!isFullyConnected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Limited connectivity to backend services. Some features may not work properly.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search inventory..."
            className="pl-9 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button className="bg-kitchen-teal hover:bg-kitchen-teal/90">
            <label className="flex items-center cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Scan New Items
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={scanning}
              />
            </label>
          </Button>
          <Button variant="outline" onClick={handleAddManually}>
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
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-kitchen-teal border-t-transparent rounded-full"></div>
            </div>
          ) : filteredItems.length > 0 ? (
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
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/20">
                      <td className="py-3">{item.name}</td>
                      <td className="py-3">{item.quantity}</td>
                      <td className="py-3">{item.expiryDate}</td>
                      <td className="py-3">
                        <span 
                          className={`pill ${
                            item.status === 'Expiring Soon' ? 'pill-danger' : 
                            item.status === 'Low Stock' ? 'pill-warning' : 
                            item.status === 'Out of Stock' ? 'pill-danger' :
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
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No inventory items found</p>
              {searchTerm && (
                <Button variant="link" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              )}
            </div>
          )}
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
                {scanning ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin h-10 w-10 border-4 border-kitchen-teal border-t-transparent rounded-full mb-4"></div>
                    <p className="text-muted-foreground">Processing image...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground">Camera feed will appear here</p>
                    <Button className="mt-4 bg-kitchen-teal hover:bg-kitchen-teal/90">
                      <label className="flex items-center cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Start Scanning
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    </Button>
                  </>
                )}
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
            {recentScans.length > 0 ? (
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="p-3 rounded-lg border border-border">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Batch Scan #{scan.id.split('-')[1].slice(-4)}</h4>
                      <span className="text-sm text-muted-foreground">{scan.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scan.count} items detected and added to inventory
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No recent scans</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Use the scanning tool to detect items with computer vision
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;
