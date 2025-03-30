
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackendConnection } from '@/hooks/use-backend-connection';

const Index = () => {
  const navigate = useNavigate();
  const { apiStatus } = useBackendConnection();

  useEffect(() => {
    if (apiStatus !== 'checking') {
      // Always navigate to dashboard since we don't require authentication
      navigate('/dashboard');
    }
  }, [navigate, apiStatus]);

  // Show loading spinner while checking backend connection
  if (apiStatus === 'checking') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-kitchen-teal border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return null;
};

export default Index;
