
import { useState, useEffect } from 'react';
import { inventoryService, InventoryItem, InventoryAlert } from '@/services/inventory-service';
import { wsClient, WebSocketConnectionStatus } from '@/lib/websocket-client';

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [wsStatus, setWsStatus] = useState<WebSocketConnectionStatus>('disconnected');

  // Load initial inventory data
  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Subscribe to WebSocket updates
  useEffect(() => {
    // Listen for connection status changes
    const unsubscribeStatus = wsClient.onStatusChange(setWsStatus);
    
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
    
    // Connect to WebSocket
    wsClient.connect();
    
    // Cleanup
    return () => {
      unsubscribeStatus();
      unsubscribeInventory();
      unsubscribeAlerts();
    };
  }, []);

  return {
    items,
    alerts,
    loading,
    error,
    wsStatus,
    refresh: async () => {
      try {
        setLoading(true);
        const data = await inventoryService.getAll();
        setItems(data);
        
        const alertsData = await inventoryService.getAlerts();
        setAlerts(alertsData);
      } catch (err) {
        console.error('Error refreshing inventory:', err);
      } finally {
        setLoading(false);
      }
    },
    addItem: async (item: Omit<InventoryItem, 'id'>) => {
      const newItem = await inventoryService.create(item);
      setItems(prev => [...prev, newItem]);
      return newItem;
    },
    updateItem: async (id: string, updates: Partial<InventoryItem>) => {
      const updatedItem = await inventoryService.update(id, updates);
      setItems(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    },
    deleteItem: async (id: string) => {
      await inventoryService.delete(id);
      setItems(prev => prev.filter(item => item.id !== id));
    },
    uploadImage: inventoryService.uploadImage,
  };
}
