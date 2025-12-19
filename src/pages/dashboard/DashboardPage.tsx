// src/pages/dashboard/DashboardPage.tsx
import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Refresh as RefreshIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useProfiles } from '../../hooks/useProfiles';
import { useCreditCards } from '../../hooks/useCreditCards';
import { useAuth } from '../../hooks/useAuth';
import { PAGE_SIZE } from '../../utils/constants';

type ViewMode = 'profiles' | 'creditCards';

const DashboardPage = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('profiles');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);

  // Fetch data
  const {
    data: profilesData = [],
    isLoading: profilesLoading,
    error: profilesError,
    refetch: refetchProfiles,
  } = useProfiles();

  const {
    data: creditCardsData = [],
    isLoading: cardsLoading,
    error: cardsError,
    refetch: refetchCreditCards,
  } = useCreditCards();

  // Handle view change
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null,
  ) => {
    if (newView !== null) {
      setViewMode(newView);
      setPage(0);
      setSearchTerm('');
    }
  };

  // Filter data based on search
  const filteredData = useMemo(() => {
    const data = viewMode === 'profiles' ? profilesData : creditCardsData;
    
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter((item: any) => {
      if (viewMode === 'profiles') {
        return (
          item.name?.toLowerCase().includes(term) ||
          item.email?.toLowerCase().includes(term) ||
          item.country?.toLowerCase().includes(term)
        );
      }
      return (
        item.card_number?.toLowerCase().includes(term) ||
        item.card_provider?.toLowerCase().includes(term) ||
        item.card_type?.toLowerCase().includes(term)
      );
    });
  }, [viewMode, profilesData, creditCardsData, searchTerm]);

  // Profile columns
  const profileColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 180, flex: 1 },
    { field: 'email', headerName: 'Email', width: 220, flex: 1 },
    { field: 'country', headerName: 'Country', width: 120 },
    {
      field: 'documents',
      headerName: 'Documents',
      width: 200,
      renderCell: (params: any) => (
        <Box className="flex flex-wrap gap-1">
          {params.value?.aadhar && <Chip label="Aadhar" size="small" className="bg-nova-success-100 text-nova-success-600" />}
          {params.value?.dl && <Chip label="DL" size="small" className="bg-nova-primary-100 text-nova-primary-600" />}
          {params.value?.pan && <Chip label="PAN" size="small" className="bg-nova-secondary-100 text-nova-secondary-600" />}
          {params.value?.passport && <Chip label="Passport" size="small" className="bg-nova-accent-100 text-nova-accent-600" />}
        </Box>
      ),
    },
    { field: 'createdAt', headerName: 'Created', width: 120 },
  ];

  // Credit card columns
  const creditCardColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { 
      field: 'card_number', 
      headerName: 'Card Number', 
      width: 200,
      renderCell: (params: any) => (
        <Typography className="font-mono">
          **** **** **** {params.value?.slice(-4) || '0000'}
        </Typography>
      ),
    },
    { field: 'card_provider', headerName: 'Provider', width: 120 },
    { 
      field: 'card_type', 
      headerName: 'Type', 
      width: 100,
      renderCell: (params: any) => (
        <Chip 
          label={params.value} 
          size="small" 
          className={`${
            params.value === 'Credit' 
              ? 'bg-nova-primary-100 text-nova-primary-600' 
              : 'bg-nova-secondary-100 text-nova-secondary-600'
          }`}
        />
      ),
    },
    { field: 'card_holder', headerName: 'Holder', width: 180, flex: 1 },
    { field: 'card_expiry', headerName: 'Expiry', width: 100 },
    { field: 'cvv', headerName: 'CVV', width: 80 },
  ];

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Refresh data
  const handleRefresh = () => {
    if (viewMode === 'profiles') {
      refetchProfiles();
    } else {
      refetchCreditCards();
    }
  };

  const isLoading = viewMode === 'profiles' ? profilesLoading : cardsLoading;
  const error = viewMode === 'profiles' ? profilesError : cardsError;

  return (
    <Container maxWidth="xl" className="py-8">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h3" fontWeight="bold" className="text-nova-gray-900 mb-2">
          Dashboard
        </Typography>
        <Typography variant="body1" className="text-nova-gray-600">
          Welcome back, {user?.name}! Manage your profiles and credit card data.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Paper className="p-6 rounded-nova border border-nova-gray-200">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" className="text-nova-primary-500">
                {profilesData.length}
              </Typography>
              <Typography variant="body2" className="text-nova-gray-600">
                Total Profiles
              </Typography>
            </Box>
            <PersonIcon className="text-nova-primary-300" sx={{ fontSize: 40 }} />
          </Box>
        </Paper>

        <Paper className="p-6 rounded-nova border border-nova-gray-200">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" className="text-nova-secondary-500">
                {creditCardsData.length}
              </Typography>
              <Typography variant="body2" className="text-nova-gray-600">
                Credit Cards
              </Typography>
            </Box>
            <CreditCardIcon className="text-nova-secondary-300" sx={{ fontSize: 40 }} />
          </Box>
        </Paper>

        <Paper className="p-6 rounded-nova border border-nova-gray-200">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" className="text-nova-accent-500">
                {filteredData.length}
              </Typography>
              <Typography variant="body2" className="text-nova-gray-600">
                Filtered Items
              </Typography>
            </Box>
            <SearchIcon className="text-nova-accent-300" sx={{ fontSize: 40 }} />
          </Box>
        </Paper>

        <Paper className="p-6 rounded-nova border border-nova-gray-200">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" className="text-nova-gray-500">
                {Math.min(rowsPerPage, filteredData.length)}
              </Typography>
              <Typography variant="body2" className="text-nova-gray-600">
                Per Page
              </Typography>
            </Box>
            <RefreshIcon className="text-nova-gray-400" sx={{ fontSize: 40 }} />
          </Box>
        </Paper>
      </Box>

      {/* Controls Section */}
      <Paper className="p-6 rounded-nova border border-nova-gray-200 mb-6">
        <Box className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            className="h-12"
          >
            <ToggleButton 
              value="profiles" 
              className={`px-6 ${viewMode === 'profiles' ? '!bg-nova-primary-500 !text-white' : ''}`}
            >
              <PersonIcon className="mr-2" />
              Profiles ({profilesData.length})
            </ToggleButton>
            <ToggleButton 
              value="creditCards" 
              className={`px-6 ${viewMode === 'creditCards' ? '!bg-nova-secondary-500 !text-white' : ''}`}
            >
              <CreditCardIcon className="mr-2" />
              Credit Cards ({creditCardsData.length})
            </ToggleButton>
          </ToggleButtonGroup>

          <Box className="flex flex-col sm:flex-row gap-4">
            <TextField
              placeholder={`Search ${viewMode === 'profiles' ? 'profiles' : 'credit cards'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="text-nova-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <IconButton
              onClick={handleRefresh}
              className="border border-nova-gray-300"
              title="Refresh data"
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Data Table Section */}
      <Paper className="rounded-nova border border-nova-gray-200 overflow-hidden">
        {error && (
          <Alert severity="error" className="m-4">
            Failed to load {viewMode === 'profiles' ? 'profiles' : 'credit cards'}. Please try again.
          </Alert>
        )}

        {!isLoading && !error && filteredData.length === 0 && (
          <Box className="p-12 text-center">
            <SearchIcon sx={{ fontSize: 60 }} className="text-nova-gray-300 mb-4" />
            <Typography variant="h6" className="text-nova-gray-500 mb-2">
              No data found
            </Typography>
            <Typography variant="body2" className="text-nova-gray-400">
              {searchTerm ? 'Try a different search term' : `No ${viewMode === 'profiles' ? 'profiles' : 'credit cards'} available`}
            </Typography>
          </Box>
        )}

        {isLoading && (
          <Box className="p-12 text-center">
            <CircularProgress className="text-nova-primary-500" />
            <Typography variant="body1" className="mt-4 text-nova-gray-500">
              Loading {viewMode === 'profiles' ? 'profiles' : 'credit cards'}...
            </Typography>
          </Box>
        )}

        {!isLoading && !error && filteredData.length > 0 && (
          <>
            <Box className="h-[500px]">
              <DataGrid
                rows={filteredData}
                columns={viewMode === 'profiles' ? profileColumns : creditCardColumns}
                getRowId={(row) => row.id || row.aadhar || row.card_number || Math.random()}
                paginationMode="server"
                rowCount={filteredData.length}
                pageSizeOptions={[10, 20, 50]}
                paginationModel={{ page, pageSize: rowsPerPage }}
                onPaginationModelChange={(model: { page: number; pageSize: number }) => {
                  setPage(model.page);
                  setRowsPerPage(model.pageSize);
                }}
                className="border-0"
                sx={{
                  '& .MuiDataGrid-cell:focus': { outline: 'none' },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'var(--color-nova-gray-50)',
                    borderBottom: '2px solid var(--color-nova-gray-200)',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'var(--color-nova-gray-50)',
                  },
                }}
              />
            </Box>

            {/* Single Clean Footer */}
            <Box className="flex items-center justify-between p-4 border-t border-nova-gray-200 bg-white">
              <Typography variant="body2" className="text-nova-gray-600">
                Total: {filteredData.length} items
              </Typography>
              
              <Box className="flex items-center gap-2">
                <Button
                  size="small"
                  startIcon={<ChevronLeftIcon />}
                  onClick={() => setPage(prev => Math.max(0, prev - 1))}
                  disabled={page === 0}
                  className="border-nova-gray-300 text-nova-gray-700"
                >
                  Previous
                </Button>
                
                <Typography variant="body2" className="text-nova-gray-700">
                  Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
                </Typography>
                
                <Button
                  size="small"
                  endIcon={<ChevronRightIcon />}
                  onClick={() => setPage(prev => 
                    prev < Math.ceil(filteredData.length / rowsPerPage) - 1 ? prev + 1 : prev
                  )}
                  disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                  className="border-nova-gray-300 text-nova-gray-700"
                >
                  Next
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>

      {/* Info Footer */}
      <Box className="mt-8 p-4 bg-nova-gray-50 rounded-nova border border-nova-gray-200">
        <Typography variant="body2" className="text-nova-gray-600 text-center">
          Data fetched from external APIs • Profiles: {profilesData.length} items • Credit Cards: {creditCardsData.length} items
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;