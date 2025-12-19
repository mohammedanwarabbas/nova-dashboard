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

type ViewMode = 'profiles' | 'creditCards';

/**
 * DashboardPage - Main dashboard component that displays profiles and credit card data
 * Features:
 * - Toggle between Profiles and Credit Cards view
 * - Real-time search filtering
 * - Pagination with customizable rows per page
 * - Detailed profile view dialog
 * - Responsive design for all screen sizes
 */
const DashboardPage = () => {
  // Current user from auth context
  const { user } = useAuth();
  
  // State for view mode (Profiles or Credit Cards)
  const [viewMode, setViewMode] = useState<ViewMode>('profiles');
  
  // Search term for filtering data
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Profile details dialog state
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch data from APIs using React Query hooks
  const { 
    data: profilesData = [], 
    isLoading: profilesLoading, 
    error: profilesError 
  } = useProfiles();

  const { 
    data: creditCardsData = [], 
    isLoading: cardsLoading, 
    error: cardsError 
  } = useCreditCards();

  /**
   * Handle switching between Profiles and Credit Cards view
   * Resets pagination and search when changing views
   */
  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
    setPage(0); // Reset to first page
    setSearchTerm(''); // Clear search
  };

  /**
   * Filter data based on search term
   * Searches all fields in the data objects
   */
  const filteredData = useMemo(() => {
    const data = viewMode === 'profiles' ? profilesData : creditCardsData;
    
    // If no search term, return all data
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    
    // Filter data where any field contains the search term
    return data.filter((item: any) => {
      return Object.values(item).some((value: any) => 
        value?.toString().toLowerCase().includes(term)
      );
    });
  }, [viewMode, profilesData, creditCardsData, searchTerm]);

  // Determine loading and error states based on current view
  const isLoading = viewMode === 'profiles' ? profilesLoading : cardsLoading;
  const error = viewMode === 'profiles' ? profilesError : cardsError;

  /**
   * Open profile details dialog
   */
  const handleViewDetails = (profile: any) => {
    setSelectedProfile(profile);
    setDialogOpen(true);
  };

  return (
    <>
      <Container maxWidth="xl" className="py-8">
        {/* Page Header */}
        <Box className="mb-8">
          <Typography variant="h3" fontWeight="bold" className="text-nova-gray-900 mb-2">
            Dashboard
          </Typography>
          <Typography variant="body1" className="text-nova-gray-600">
            Welcome back, {user?.name}! Manage your profiles and credit card data.
          </Typography>
        </Box>

        {/* Stats Cards - Show counts and metrics */}
        <StatsCards 
          profilesCount={profilesData.length}
          cardsCount={creditCardsData.length}
          filteredCount={filteredData.length}
          rowsPerPage={rowsPerPage}
        />

        {/* Controls Section - Toggle buttons and search */}
        <ControlsSection
          viewMode={viewMode}
          onViewChange={handleViewChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
          profilesCount={profilesData.length}
          cardsCount={creditCardsData.length}
        />

        {/* Data Table Section */}
        <Paper className="rounded-nova border border-nova-gray-200 overflow-hidden">
          {/* Conditional rendering based on view mode */}
          {viewMode === 'profiles' ? (
            <ProfileTable
              data={filteredData}
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
              data={filteredData}
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

        {/* Info Footer - API information */}
        <Box className="mt-8 p-4 bg-nova-gray-50 rounded-nova border border-nova-gray-200">
          <Typography variant="body2" className="text-nova-gray-600 text-center">
            Data fetched from external APIs • Profiles: {profilesData.length} items • Credit Cards: {creditCardsData.length} items
          </Typography>
        </Box>
      </Container>

      {/* Profile Details Dialog - Shows when "View All" button is clicked */}
      <ProfileDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        profile={selectedProfile}
      />
    </>
  );
};

export default DashboardPage;