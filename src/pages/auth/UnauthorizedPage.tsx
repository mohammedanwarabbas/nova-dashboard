import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { ROUTES } from '../../utils/constants';

const UnauthorizedPage = () => {
  return (
    <Container maxWidth="sm">
      <Box className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        {/* Icon */}
        <Box className="mb-6">
          <Lock sx={{ fontSize: 80 }} className="text-red-500" />
        </Box>

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" className="mb-3">
          Access Denied
        </Typography>

        {/* Message */}
        <Typography variant="body1" className="text-gray-600 mb-8">
          Your email is not authorized for this dashboard.
          Contact admin to get access.
        </Typography>
  
        {/* Buttons */}
        <Box className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            component={Link}
            to={ROUTES.LOGIN}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            fullWidth
          >
            Try Again
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => window.history.back()}
            className="border-gray-300"
            fullWidth
          >
            Go Back
          </Button>
        </Box>

        {/* Footer */}
        <Typography variant="caption" className="text-gray-400 mt-12">
         <a 
            href="mailto:support@novadashboard.com" 
            className="text-blue-600 hover:underline font-medium"
          >
            Contact support
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;