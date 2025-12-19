import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  ErrorOutline as ErrorIcon,
  CheckCircleOutline as CheckIcon,
  Language as LanguageIcon,
  Support as SupportIcon,
} from '@mui/icons-material';
import { ROUTES } from '../../utils/constants';

const NotFoundPage = () => {
  // Fallback route if ROUTES.HOME is missing
  const homePath = ROUTES?.HOME || '/dashboard';
  const loginPath = ROUTES?.LOGIN || '/login';

  const helpfulLinks = [
    { text: 'Double-check the URL for typos', icon: <CheckIcon /> },
    { text: 'Verify the page still exists', icon: <LanguageIcon /> },
    { text: 'Contact support if needed', icon: <SupportIcon /> },
  ];

  return (
    <Container maxWidth="md">
      <Box 
        className="min-h-screen flex flex-col items-center justify-center py-12 animate-fade-in"
      >
        
        {/* Error Icon with Badge */}
        <Box className="relative inline-block mb-8">
          <Box className="relative">
            <ErrorIcon sx={{ fontSize: 120 }} className="text-red-500" />
            <Box className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-white">
              <Typography variant="caption" fontWeight="bold">
                404
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Heading */}
      <Typography 
  variant="h2" 
  fontWeight="bold" 
  align="center"
  className="text-slate-900 !mb-4 leading-tight sm:leading-normal"
  sx={{ 
    // MUI way - more control
    lineHeight: { xs: 1, sm: 1.5 } 
  }}
>
  Lost in Space?
</Typography>
        
        <Typography 
          variant="h5" 
          align="center"
          className="text-slate-600 max-w-2xl mx-auto"
          sx={{ mb: 6 }}
        >
          The page you're looking for seems to have drifted off into the digital cosmos. 
          Don't worry, we'll help you navigate back home.
        </Typography>

        {/* Help Card */}
        <Card className="w-full max-w-lg bg-slate-50 mb-10 border border-slate-200 shadow-sm">
          <CardContent>
            <Typography variant="subtitle1" align="center" className="text-slate-800 mb-4 font-semibold">
              Quick Navigation Guide
            </Typography>
            
            <List>
              {helpfulLinks.map((item, index) => (
                <ListItem 
                  key={index}
                  className="bg-white rounded-md mb-2 border border-slate-100"
                >
                  <ListItemIcon className="min-w-10 text-blue-500">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    className="text-slate-700"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          className="w-full max-w-md mb-12"
        >
          <Button
            component={Link}
            to={homePath}
            variant="contained"
            startIcon={<HomeIcon />}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg capitalize text-lg flex-1"
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
            className="border-slate-300 text-slate-700 py-3 px-6 rounded-lg capitalize text-lg flex-1"
          >
            Go Back
          </Button>
        </Stack>

        {/* Footer Note */}
        <Typography variant="body2" align="center" className="text-slate-500">
          Still having trouble?{' '}
          <a 
            href="mailto:support@novadashboard.com" 
            className="text-blue-600 hover:underline font-medium"
          >
            Contact support
          </a>{' '}
          or{' '}
          <Link 
            to={loginPath} 
            className="text-slate-800 hover:underline font-medium"
          >
            return to login
          </Link>
        </Typography>

        {/* Decorative Footer */}
        <Box className="mt-12 opacity-40">
          <Typography variant="caption" className="tracking-widest uppercase">
            Nova Dashboard • Systems Offline
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;