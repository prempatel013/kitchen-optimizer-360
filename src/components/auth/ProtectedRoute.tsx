
import React from 'react';
import { useBackendConnection } from '@/hooks/use-backend-connection';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Modified to not require authentication but still check backend connectivity
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { apiStatus } = useBackendConnection();

  // Show loading state while checking backend connectivity
  if (apiStatus === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-kitchen-teal border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Render children regardless of authentication status
  return <>{children}</>;
};

export default ProtectedRoute;
