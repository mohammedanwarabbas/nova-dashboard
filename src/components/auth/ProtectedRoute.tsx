import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import {
  Box,
} from '@mui/material';
import Spinner from '../ui/Spinner'
// Props for the ProtectedRoute component
// Accepts any React children that should be protected by authentication
interface ProtectedRouteProps {
  children: React.ReactNode;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication state from our auth context
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication status
  // This prevents flashing content during auth check
 if (isLoading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <Spinner 
          size={48} 
          color="border-blue-500" 
          text="Checking authentication..." 
        />
      </Box>
    );
  }

  // If user is not authenticated (and we're done loading), redirect to login
  // The 'replace' prop prevents users from navigating back to the protected route
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If user is authenticated, render the protected children components
  return <>{children}</>;
};

export default ProtectedRoute;