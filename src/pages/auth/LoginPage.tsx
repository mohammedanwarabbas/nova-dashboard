import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Alert
} from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';

// Define the shape of the decoded JWT token from Google
interface GoogleJWTDecoded {
  email: string;
  name?: string;
  picture?: string;
  sub: string; // Google's unique user ID
}

// Use the library's CredentialResponse type instead of creating our own
// The credential field might be undefined if login fails

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Check if Google OAuth is properly configured
  if (!clientId) {
    return (
      <Container>
        <Alert severity="error">
          Google OAuth not configured. Set VITE_GOOGLE_CLIENT_ID in .env
        </Alert>
      </Container>
    );
  }

  // Handle successful Google OAuth login
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError(''); // Clear any previous errors
    
    // Check if we actually got a credential (should always be there on success)
    if (!credentialResponse.credential) {
      setError('No credential received from Google');
      return;
    }
    
    try {
      // Decode the JWT token to extract user information
      const decoded: GoogleJWTDecoded = jwtDecode(credentialResponse.credential);
      
      // Format the user data for our auth system
      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub, // Store Google ID for reference
      };

      // Send user data to our auth context for verification and login
      const result = await login(googleUser);
      
      if (result.success) {
        // Redirect to dashboard on successful login
        navigate(ROUTES.DASHBOARD);
      } else {
        // Redirect to unauthorized page if user is not in our allowed list
        navigate(ROUTES.UNAUTHORIZED);
      }
      
    } catch (err) {
      setError('Failed to process Google login');
      console.error(err);
    }
  };

  // Handle Google OAuth errors (user cancelled, popup blocked, etc.)
  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Container maxWidth="sm">
        <Box className="min-h-screen flex items-center justify-center p-4">
          <Paper className="w-full p-8 shadow-nova rounded-nova border border-nova-gray-200">
            
            {/* Header section with app title */}
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

            {/* Error message display */}
            {error && (
              <Alert severity="error" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Main login box */}
            <Box className="bg-nova-gray-50 p-6 rounded-nova">
              <Typography variant="h6" className="text-nova-gray-800 !mb-6 text-center">
                Select your Google account
              </Typography>

              {/* Google OAuth button - this triggers the Google login popup */}
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

              {/* Info text about authorization requirements */}
              <Typography variant="body2" className="text-nova-gray-500 !mt-6 text-center">
                Only pre-authorized Google accounts can login
              </Typography>
            </Box>

            {/* Footer with developer credit */}
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