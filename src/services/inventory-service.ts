
import { makeRequest } from '@/lib/api-client';
import { wsClient } from '@/lib/websocket-client';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Expiring Soon' | 'Out of Stock';
  image?: string;
}

export interface InventoryAlert {
  id: string;
  item: string;
  expiry: string;
  quantity: string;
  status: 'danger' | 'warning';
}

// Service for inventory data
export const inventoryService = {
  // Get all inventory items
  getAll: () => makeRequest<InventoryItem[]>({ url: '/inventory' }),
  
  // Get a single inventory item by ID
  getById: (id: string) => makeRequest<InventoryItem>({ url: `/inventory/${id}` }),
  
  // Create a new inventory item
  create: (item: Omit<InventoryItem, 'id'>) => 
    makeRequest<InventoryItem>({ 
      url: '/inventory', 
      method: 'POST', 
      data: item 
    }),
  
  // Update an existing inventory item
  update: (id: string, item: Partial<InventoryItem>) => 
    makeRequest<InventoryItem>({ 
      url: `/inventory/${id}`, 
      method: 'PUT', 
      data: item 
    }),
  
  // Delete an inventory item
  delete: (id: string) => 
    makeRequest<void>({ 
      url: `/inventory/${id}`, 
      method: 'DELETE' 
    }),
  
  // Upload an image for inventory scanning
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return makeRequest<{ detectedItems: InventoryItem[] }>({
      url: '/inventory/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  },
  
  // Get expiring inventory alerts
  getAlerts: () => makeRequest<InventoryAlert[]>({ url: '/inventory/alerts' }),
  
  // Subscribe to real-time inventory updates
  subscribeToUpdates: (callback: (items: InventoryItem[]) => void) => {
    // Connect to WebSocket if not already connected
    wsClient.connect();
    
    // Listen for inventory update events
    return wsClient.on('inventory_update', callback);
  },
  
  // Subscribe to inventory alerts
  subscribeToAlerts: (callback: (alerts: InventoryAlert[]) => void) => {
    // Connect to WebSocket if not already connected
    wsClient.connect();
    
    // Listen for alert events
    return wsClient.on('inventory_alert', callback);
  },
};
