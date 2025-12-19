import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper,
  Alert
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return (
      <Container>
        <Alert severity="error">
          Google OAuth not configured. Set VITE_GOOGLE_CLIENT_ID in .env
        </Alert>
      </Container>
    );
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    
    try {
      // Decode the JWT token from Google
      const decoded: any = jwtDecode(credentialResponse.credential);
      
      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub, // Google ID
      };

      // Check authorization against our users.json
      const result = await login(googleUser);
      
      if (result.success) {
        navigate(ROUTES.DASHBOARD);
      } else {
        navigate(ROUTES.UNAUTHORIZED);
      }
      
    } catch (err) {
      setError('Failed to process Google login');
      console.error(err);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container maxWidth="sm">
        <Box className="min-h-screen flex items-center justify-center p-4">
          <Paper className="w-full p-8 shadow-nova rounded-nova border border-nova-gray-200">
            
            {/* Header */}
            <Box className="text-center mb-8">
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                className="text-nova-primary-500 mb-2"
              >
                Nova Dashboard
              </Typography>
              <Typography variant="body1" className="text-nova-gray-600">
                Sign in to access dashboard
              </Typography>
            </Box>

            {/* Error */}
            {error && (
              <Alert severity="error" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Login Box */}
            <Box className="bg-nova-gray-50 p-6 rounded-nova">
              <Typography variant="h6" className="text-nova-gray-800 !mb-6 text-center">
                Select your Google account
              </Typography>

              {/* REAL Google OAuth Button */}
              <Box className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  locale="en"
                />
              </Box>

              <Typography variant="body2" className="text-nova-gray-500 !mt-6 text-center">
                Only pre-authorized Google accounts can login
              </Typography>
            </Box>

            {/* Footer */}
            <Box className="mt-8 text-center">
              <Typography variant="caption" className="text-nova-gray-400">
                Developed by Anwar
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;