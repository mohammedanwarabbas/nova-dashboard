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

interface ProfileDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  profile: any;
}

const ProfileDetailsDialog = ({ open, onClose, profile }: ProfileDetailsDialogProps) => {
  if (!profile) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-nova-primary-50 text-nova-primary-700">
        <Box className="flex items-center">
          <PersonIcon className="mr-2" />
          Profile Details
        </Box>
      </DialogTitle>
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
                  {/* Chips stack vertically on mobile, horizontally on desktop */}
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
                  <Typography variant="body2">
                    <strong>Passport:</strong> {profile.passport_number} ({profile.passport_type})
                  </Typography>
                  <Typography variant="body2">
                    <strong>Passport Issue:</strong> {profile.passport_date_of_issue} | 
                    <strong> Expiry:</strong> {profile.passport_date_of_expiry}
                  </Typography>
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
                  <Typography variant="body2">
                    <strong>Credit Card:</strong> **** **** **** {profile.credit_card_number?.slice(-4)} 
                    (CVV: {profile.credit_card_cvv}, Exp: {profile.credit_card_expiry}, 
                    Provider: {profile.credit_card_provider})
                  </Typography>
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
      <DialogActions>
        <Button onClick={onClose} className="text-nova-primary-600 hover:bg-nova-primary-50">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDetailsDialog;