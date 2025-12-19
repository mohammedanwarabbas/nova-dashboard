import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

// Define the structure of a profile object for better type safety
interface ProfileDetails {
  // Personal Information
  first_name: string;
  last_name: string;
  sex: string;
  dob: string;
  father_name: string;
  address: string;
  nationality: string;
  
  // Document Details
  aadhar: string;
  pan_number: string;
  pan_status: string;
  passport_number: string;
  passport_type: string;
  passport_date_of_issue: string;
  passport_date_of_expiry: string;
  driving_licence_number: string;
  driving_licence_date_of_issue: string;
  driving_licence_date_of_expiry: string;
  
  // Card Details
  credit_card_number: string;
  credit_card_cvv: string;
  credit_card_expiry: string;
  credit_card_provider: string;
  debit_card_number: string;
  debit_card_cvv: string;
  debit_card_expiry: string;
  debit_card_provider: string;
}

// Props for the ProfileDetailsDialog component
interface ProfileDetailsDialogProps {
  open: boolean;           // Controls whether the dialog is visible
  onClose: () => void;     // Function to call when closing the dialog
  profile: ProfileDetails | null; // The profile data to display, or null if none
}

// This dialog shows detailed information about a user profile
// It appears when someone clicks "View All" on a profile in the table
const ProfileDetailsDialog = ({ open, onClose, profile }: ProfileDetailsDialogProps) => {
  // If there's no profile data, don't render anything
  // This prevents errors when the dialog opens without data
  if (!profile) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Dialog header with title and icon */}
      <DialogTitle className="bg-nova-primary-50 text-nova-primary-700">
        <Box className="flex items-center">
          <PersonIcon className="mr-2" />
          Profile Details
        </Box>
      </DialogTitle>
      
      {/* Main content area with profile information */}
      <DialogContent className="pt-6">
        <List>
          {/* Personal Information Section */}
          <ListItem>
            <ListItemText 
              primary="Personal Information"
              secondary={
                <Box className="mt-2 space-y-1">
                  <Typography variant="body2">
                    <strong>Name:</strong> {profile.first_name} {profile.last_name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Gender:</strong> {profile.sex}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date of Birth:</strong> {profile.dob}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Father's Name:</strong> {profile.father_name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {profile.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Nationality:</strong> {profile.nationality}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
          
          {/* Document Details Section */}
          <ListItem>
            <ListItemText 
              primary="Document Details"
              secondary={
                <Box className="mt-2 space-y-2">
                  {/* Document status chips - responsive layout */}
                  <Box className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <Chip 
                      label={`Aadhar: ${profile.aadhar}`} 
                      className="bg-nova-success-100 text-nova-success-700 w-full sm:w-auto" 
                    />
                    <Chip 
                      label={`PAN: ${profile.pan_number}`} 
                      className="bg-nova-primary-100 text-nova-primary-700 w-full sm:w-auto" 
                    />
                    <Chip 
                      label={`Status: ${profile.pan_status}`} 
                      className="bg-nova-secondary-100 text-nova-secondary-700 w-full sm:w-auto" 
                    />
                  </Box>
                  
                  {/* Passport information */}
                  <Typography variant="body2">
                    <strong>Passport:</strong> {profile.passport_number} ({profile.passport_type})
                  </Typography>
                  <Typography variant="body2">
                    <strong>Passport Issue:</strong> {profile.passport_date_of_issue} | 
                    <strong> Expiry:</strong> {profile.passport_date_of_expiry}
                  </Typography>
                  
                  {/* Driving license information */}
                  <Typography variant="body2">
                    <strong>Driving License:</strong> {profile.driving_licence_number}
                  </Typography>
                  <Typography variant="body2">
                    <strong>DL Issue:</strong> {profile.driving_licence_date_of_issue} | 
                    <strong> Expiry:</strong> {profile.driving_licence_date_of_expiry}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
          
          {/* Card Details Section */}
          <ListItem>
            <ListItemText 
              primary="Card Details"
              secondary={
                <Box className="mt-2 space-y-2">
                  {/* Credit card information - shows last 4 digits for security */}
                  <Typography variant="body2">
                    <strong>Credit Card:</strong> **** **** **** {profile.credit_card_number?.slice(-4)} 
                    (CVV: {profile.credit_card_cvv}, Exp: {profile.credit_card_expiry}, 
                    Provider: {profile.credit_card_provider})
                  </Typography>
                  
                  {/* Debit card information - shows last 4 digits for security */}
                  <Typography variant="body2">
                    <strong>Debit Card:</strong> **** **** **** {profile.debit_card_number?.slice(-4)}
                    (CVV: {profile.debit_card_cvv}, Exp: {profile.debit_card_expiry}, 
                    Provider: {profile.debit_card_provider})
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        </List>
      </DialogContent>
      
      {/* Dialog footer with close button */}
      <DialogActions>
        <Button onClick={onClose} className="text-nova-primary-600 hover:bg-nova-primary-50">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDetailsDialog;