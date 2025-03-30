
import { useState, useEffect } from 'react';
import { inventoryService, InventoryItem, InventoryAlert } from '@/services/inventory-service';
import { useBackendConnection } from '@/hooks/use-backend-connection';
import { toast } from '@/hooks/use-toast';

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { inventoryStatus, connectWebsockets } = useBackendConnection();

  // Load initial inventory data
  useEffect(() => {
    connectWebsockets();
    
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getAll();
        setItems(data);
        
        const alertsData = await inventoryService.getAlerts();
        setAlerts(alertsData);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch inventory'));
        console.error('Error fetching inventory:', err);
        
        // If API fails, set some mock data for demo purposes
        setItems([
          { id: '1', name: 'Tomatoes', quantity: '8.5 kg', unit: 'kg', expiryDate: '2023-06-30', status: 'In Stock' },
          { id: '2', name: 'Chicken Breast', quantity: '12 kg', unit: 'kg', expiryDate: '2023-06-25', status: 'Low Stock' },
          { id: '3', name: 'Lettuce', quantity: '5 kg', unit: 'kg', expiryDate: '2023-06-21', status: 'Expiring Soon' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [connectWebsockets]);

  // Subscribe to WebSocket updates
  useEffect(() => {
    // Subscribe to inventory updates
    const unsubscribeInventory = inventoryService.subscribeToUpdates((updatedItems) => {
      setItems(prevItems => {
        // Merge updated items with existing items
        const itemMap = new Map(prevItems.map(item => [item.id, item]));
        
        updatedItems.forEach(item => {
          itemMap.set(item.id, item);
        });
        
        return Array.from(itemMap.values());
      });
    });
    
    // Subscribe to alert updates
    const unsubscribeAlerts = inventoryService.subscribeToAlerts(setAlerts);
    
    // Cleanup
    return () => {
      unsubscribeInventory();
      unsubscribeAlerts();
    };
  }, []);

  return {
    items,
    alerts,
    loading,
    error,
    wsStatus: inventoryStatus,
    refresh: async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getAll();
        setItems(data);
        
        const alertsData = await inventoryService.getAlerts();
        setAlerts(alertsData);
      } catch (err) {
        console.error('Error refreshing inventory:', err);
        toast({
          title: 'Refresh failed',
          description: 'Could not refresh inventory data. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    },
    addItem: async (item: Omit<InventoryItem, 'id'>) => {
      try {
        const newItem = await inventoryService.create(item);
        setItems(prev => [...prev, newItem]);
        toast({
          title: 'Item added',
          description: `${item.name} has been added to inventory.`,
          variant: 'default',
        });
        return newItem;
      } catch (error) {
        console.error('Error adding item:', error);
        toast({
          title: 'Add failed',
          description: 'Could not add item to inventory. Please try again.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    updateItem: async (id: string, updates: Partial<InventoryItem>) => {
      try {
        const updatedItem = await inventoryService.update(id, updates);
        setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
        toast({
          title: 'Item updated',
          description: `${updatedItem.name} has been updated.`,
          variant: 'default',
        });
        return updatedItem;
      } catch (error) {
        console.error('Error updating item:', error);
        toast({
          title: 'Update failed',
          description: 'Could not update item. Please try again.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    deleteItem: async (id: string) => {
      try {
        await inventoryService.delete(id);
        setItems(prev => prev.filter(item => item.id !== id));
        toast({
          title: 'Item deleted',
          description: 'Item has been removed from inventory.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Error deleting item:', error);
        toast({
          title: 'Delete failed',
          description: 'Could not delete item. Please try again.',
          variant: 'destructive',
        });
        throw error;
      }
    },
    uploadImage: inventoryService.uploadImage,
  };
}
