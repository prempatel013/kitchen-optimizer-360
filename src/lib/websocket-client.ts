
export type WebSocketMessage = {
  type: string;
  payload: any;
};

export type WebSocketConnectionStatus = 'connecting' | 'connected' | 'disconnected';

class WebSocketClient {
  private socket: WebSocket | null = null;
  private reconnectTimeout: number | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000; // 3 seconds
  private statusListeners: Array<(status: WebSocketConnectionStatus) => void> = [];
  private messageHandlers: Record<string, Array<(payload: any) => void>> = {};
  private status: WebSocketConnectionStatus = 'disconnected';
  private url: string;

  constructor() {
    // Updated WebSocket URLs to match your backend endpoints
    this.url = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws/inventory';
  }

  // Connect to a specific WebSocket endpoint
  connect(endpoint?: string) {
    if (this.socket) {
      return;
    }

    const wsUrl = endpoint ? 
      (import.meta.env.VITE_WS_URL || 'ws://localhost:5000') + endpoint : 
      this.url;

    this.updateStatus('connecting');
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.updateStatus('disconnected');
  }

  onStatusChange(callback: (status: WebSocketConnectionStatus) => void) {
    this.statusListeners.push(callback);
    // Immediately call with current status
    callback(this.status);
    
    // Return function to remove listener
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  on(messageType: string, callback: (payload: any) => void) {
    if (!this.messageHandlers[messageType]) {
      this.messageHandlers[messageType] = [];
    }
    
    this.messageHandlers[messageType].push(callback);
    
    // Return function to remove listener
    return () => {
      if (this.messageHandlers[messageType]) {
        this.messageHandlers[messageType] = this.messageHandlers[messageType].filter(
          cb => cb !== callback
        );
      }
    };
  }

  // Add method to send messages to the server
  send(messageType: string, payload: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('Cannot send message: WebSocket is not connected');
      return false;
    }

    try {
      const message: WebSocketMessage = {
        type: messageType,
        payload
      };
      this.socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
      return false;
    }
  }

  private handleOpen() {
    this.updateStatus('connected');
    this.reconnectAttempts = 0;
    console.log('WebSocket connection established');
  }

  private handleMessage(event: MessageEvent) {
    try {
      const message = JSON.parse(event.data) as WebSocketMessage;
      
      // Call registered handlers for this message type
      if (this.messageHandlers[message.type]) {
        this.messageHandlers[message.type].forEach(handler => {
          try {
            handler(message.payload);
          } catch (error) {
            console.error(`Error in message handler for ${message.type}:`, error);
          }
        });
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private handleClose(event: CloseEvent) {
    this.socket = null;
    this.updateStatus('disconnected');
    
    // Attempt to reconnect unless this was an intentional disconnect
    if (this.status !== 'disconnected' && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.attemptReconnect();
    } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      toast({
        title: 'Connection lost',
        description: 'Failed to reconnect to the server after multiple attempts.',
        variant: 'destructive',
      });
    }
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error);
    this.socket?.close();
  }

  private attemptReconnect() {
    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    this.reconnectTimeout = window.setTimeout(() => {
      this.connect();
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  private updateStatus(status: WebSocketConnectionStatus) {
    this.status = status;
    this.statusListeners.forEach(listener => listener(status));
  }
}

// Create two singleton instances for different WebSocket endpoints
export const inventoryWsClient = new WebSocketClient();
export const wasteTrackingWsClient = new WebSocketClient();

// Export the original wsClient for backward compatibility
export const wsClient = inventoryWsClient;

