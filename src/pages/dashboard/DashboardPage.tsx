import { useState, useMemo } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import StatsCards from '../../components/dashboard/StatsCards';
import ControlsSection from '../../components/dashboard/ControlsSection';
import ProfileTable from '../../components/dashboard/ProfileTable';
import CreditCardTable from '../../components/dashboard/CreditCardTable';
import ProfileDetailsDialog from '../../components/dashboard/ProfileDetailsDialog';
import { useProfiles } from '../../hooks/useProfiles';
import { useCreditCards } from '../../hooks/useCreditCards';
import { useAuth } from '../../hooks/useAuth';

// Define the two view modes for the dashboard
type ViewMode = 'profiles' | 'creditCards';

// Define ProfileData interface locally since it's not exported from ProfileTable
interface ProfileData {
  serial?: number;
  first_name: string;
  last_name: string;
  sex: string;
  dob: string;
  father_name: string;
  address: string;
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
  nationality: string;
  credit_card_number: string;
  credit_card_cvv: string;
  credit_card_expiry: string;
  credit_card_provider: string;
  debit_card_number: string;
  debit_card_cvv: string;
  debit_card_expiry: string;
  debit_card_provider: string;
  id?: string;
}

// Define CreditCardData interface locally since it's not exported from CreditCardTable
interface CreditCardData {
  card_number: string;
  card_provider: string;
  digits: number;
  card_type: string;
  card_expiry: string;
  cvv: string;
  serial?: number;
}

// Main dashboard component that displays profiles and credit card data
// Features:
// - Toggle between Profiles and Credit Cards view
// - Real-time search filtering across all fields
// - Pagination with customizable rows per page (10, 20, 50)
// - Detailed profile view dialog with complete information
// - Responsive design that works on mobile, tablet, and desktop
const DashboardPage = () => {
  // Get current user information from authentication context
  const { user } = useAuth();
  
  // State for view mode - defaults to showing profiles
  const [viewMode, setViewMode] = useState<ViewMode>('profiles');
  
  // Search term for filtering the displayed data
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state - page is 0-indexed (0 = page 1)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for profile details dialog
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch profiles data from the API using React Query
  // Default to empty array if data is undefined
  const { 
    data: profilesData = [], 
    isLoading: profilesLoading, 
    error: profilesError 
  } = useProfiles();

  // Fetch credit cards data from the API using React Query
  // Default to empty array if data is undefined
  const { 
    data: creditCardsData = [], 
    isLoading: cardsLoading, 
    error: cardsError 
  } = useCreditCards();

  // Switch between profiles and credit cards view
  // Resets pagination and search when changing views for better UX
  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
    setPage(0); // Always go back to first page when changing views
    setSearchTerm(''); // Clear search filter
  };

  // Filter data based on search term
  // Searches across all fields in the data objects
  const filteredData = useMemo(() => {
    // Select the appropriate dataset based on current view mode
    const data = viewMode === 'profiles' ? profilesData : creditCardsData;
    
    // Return all data if search is empty or just whitespace
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    
    // Filter items where any field contains the search term
    return data.filter((item: ProfileData | CreditCardData) => {
      return Object.values(item).some((value) => {
        // Handle null/undefined values safely
        if (value == null) return false;
        // Convert to string and check for search term match
        return value.toString().toLowerCase().includes(term);
      });
    });
  }, [viewMode, profilesData, creditCardsData, searchTerm]);

  // Determine which loading and error states to use based on current view
  const isLoading = viewMode === 'profiles' ? profilesLoading : cardsLoading;
  const error = viewMode === 'profiles' ? profilesError : cardsError;

  // Open the profile details dialog with the selected profile
  const handleViewDetails = (profile: ProfileData) => {
    setSelectedProfile(profile);
    setDialogOpen(true);
  };

  return (
    <>
      <Container maxWidth="xl" className="py-8">
        {/* Page Header with greeting */}
        <Box className="mb-8">
          <Typography variant="h3" fontWeight="bold" className="text-nova-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography variant="body1" className="text-nova-gray-600">
            Welcome back, {user?.name}! Manage your profiles and credit card data.
          </Typography>
        </Box>

        {/* Stats Cards - Shows counts and metrics at a glance */}
        <StatsCards 
          profilesCount={profilesData.length}
          cardsCount={creditCardsData.length}
          filteredCount={filteredData.length}
          rowsPerPage={rowsPerPage}
        />

        {/* Controls Section - Toggle buttons and search input */}
        <ControlsSection
          viewMode={viewMode}
          onViewChange={handleViewChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          profilesCount={profilesData.length}
          cardsCount={creditCardsData.length}
        />

        {/* Main Data Table Section */}
        <Paper className="rounded-nova border border-nova-gray-200 overflow-hidden">
          {/* Conditionally render either profiles or credit cards table */}
          {viewMode === 'profiles' ? (
            <ProfileTable
              data={filteredData as ProfileData[]}
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <CreditCardTable
              data={filteredData as CreditCardData[]}
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          )}
        </Paper>

        {/* Info Footer - Shows API data counts */}
        <Box className="mt-8 p-4 bg-nova-gray-50 rounded-nova border border-nova-gray-200">
          <Typography variant="body2" className="text-nova-gray-600 text-center">
            Data fetched from external APIs • Profiles: {profilesData.length} items • Credit Cards: {creditCardsData.length} items
          </Typography>
        </Box>
      </Container>

      {/* Profile Details Dialog - Modal showing full profile information */}
      <ProfileDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        profile={selectedProfile}
      />
    </>
  );
};

export default DashboardPage;