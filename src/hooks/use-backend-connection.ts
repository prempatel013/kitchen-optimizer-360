
import { useState, useEffect } from 'react';
import { inventoryWsClient, wasteTrackingWsClient, WebSocketConnectionStatus } from '@/lib/websocket-client';
import { toast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api-client';

export function useBackendConnection() {
  const [inventoryStatus, setInventoryStatus] = useState<WebSocketConnectionStatus>('disconnected');
  const [wasteTrackingStatus, setWasteTrackingStatus] = useState<WebSocketConnectionStatus>('disconnected');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Monitor WebSocket connections
  useEffect(() => {
    const unsubscribeInventory = inventoryWsClient.onStatusChange(setInventoryStatus);
    const unsubscribeWasteTracking = wasteTrackingWsClient.onStatusChange(setWasteTrackingStatus);

    // Check API server status
    const checkApiStatus = async () => {
      try {
        await apiClient.get('/status');
        setApiStatus('online');
      } catch (error) {
        console.error('Backend API check failed:', error);
        setApiStatus('offline');
        
        // Notify user of backend issue
        toast({
          title: 'Backend connection issue',
          description: 'Some features may be limited. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    checkApiStatus();
    
    // Periodically check API status
    const intervalId = setInterval(checkApiStatus, 60000); // Check every minute

    return () => {
      unsubscribeInventory();
      unsubscribeWasteTracking();
      clearInterval(intervalId);
    };
  }, []);

  // Connect to WebSockets
  const connectWebsockets = () => {
    if (inventoryStatus === 'disconnected') {
      inventoryWsClient.connect('/ws/inventory');
    }
    if (wasteTrackingStatus === 'disconnected') {
      wasteTrackingWsClient.connect('/ws/waste-tracking');
    }
  };

  // Disconnect from WebSockets
  const disconnectWebsockets = () => {
    inventoryWsClient.disconnect();
    wasteTrackingWsClient.disconnect();
  };

  return {
    inventoryStatus,
    wasteTrackingStatus,
    apiStatus,
    connectWebsockets,
    disconnectWebsockets,
    isFullyConnected: inventoryStatus === 'connected' && wasteTrackingStatus === 'connected' && apiStatus === 'online',
  };
}
