
import { makeRequest } from '@/lib/api-client';
import { inventoryWsClient, wasteTrackingWsClient } from '@/lib/websocket-client';

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

export interface AiAnalysisResult {
  wastagePercentage: number;
  recommendations: string[];
  detectedItems: InventoryItem[];
}

// Service for inventory data
export const inventoryService = {
  // Get all inventory items
  getAll: () => makeRequest<InventoryItem[]>({ url: '/inventory/status' }),
  
  // Get a single inventory item by ID
  getById: (id: string) => makeRequest<InventoryItem>({ url: `/inventory/${id}` }),
  
  // Create a new inventory item
  create: (item: Omit<InventoryItem, 'id'>) => 
    makeRequest<InventoryItem>({ 
      url: '/inventory/update', 
      method: 'POST', 
      data: item 
    }),
  
  // Update an existing inventory item
  update: (id: string, item: Partial<InventoryItem>) => 
    makeRequest<InventoryItem>({ 
      url: `/inventory/update`, 
      method: 'POST', 
      data: { id, ...item } 
    }),
  
  // Delete an inventory item
  delete: (id: string) => 
    makeRequest<void>({ 
      url: `/inventory/remove`, 
      method: 'DELETE',
      data: { id }
    }),
  
  // Upload an image for inventory scanning
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return makeRequest<AiAnalysisResult>({
      url: '/ai/analyze-waste',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
  },
  
  // Get expiring inventory alerts
  getAlerts: () => makeRequest<InventoryAlert[]>({ url: '/inventory/alerts' }),
  
  // Get AI forecasts for ingredient usage
  getForecast: () => makeRequest<any>({ url: '/ai/forecast-usage' }),
  
  // Subscribe to real-time inventory updates
  subscribeToUpdates: (callback: (items: InventoryItem[]) => void) => {
    // Connect to WebSocket if not already connected
    inventoryWsClient.connect('/ws/inventory');
    
    // Listen for inventory update events
    return inventoryWsClient.on('inventory_update', callback);
  },
  
  // Subscribe to inventory alerts
  subscribeToAlerts: (callback: (alerts: InventoryAlert[]) => void) => {
    // Connect to WebSocket if not already connected
    inventoryWsClient.connect('/ws/inventory');
    
    // Listen for alert events
    return inventoryWsClient.on('inventory_alert', callback);
  },

  // Subscribe to waste tracking alerts
  subscribeToWasteTracking: (callback: (data: any) => void) => {
    // Connect to WebSocket if not already connected
    wasteTrackingWsClient.connect('/ws/waste-tracking');
    
    // Listen for waste tracking events
    return wasteTrackingWsClient.on('waste_tracking', callback);
  },
};

