import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';
import PaginationFooter from './PaginationFooter';

// Define the structure of profile data from the API
interface ProfileData {
  serial?: number;         // Added for display, not from API
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
  id?: string;            // Optional ID field for DataGrid
}

// Props for the ProfileTable component
interface ProfileTableProps {
  data: ProfileData[];            // Array of profile data
  isLoading: boolean;             // Loading state for API call
  error: Error | null;            // Error object if API call fails
  searchTerm: string;             // Current search filter term
  page: number;                   // Current page number (0-indexed)
  rowsPerPage: number;            // Number of rows to show per page
  onPageChange: (page: number) => void;               // Handler for page changes
  onRowsPerPageChange: (rowsPerPage: number) => void; // Handler for rows per page changes
  onViewDetails: (profile: ProfileData) => void;      // Handler for viewing profile details
}

// Main table component for displaying profile data
// Shows loading, error, empty, and data states with pagination
const ProfileTable = ({
  data,
  isLoading,
  error,
  searchTerm,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onViewDetails,
}: ProfileTableProps) => {
  // Add serial numbers to each profile for the table display
  // This makes it easier for users to track their position in the list
  const dataWithSerial = data.map((item, index) => ({
    ...item,
    serial: index + 1,
  }));

  // Define the columns for the DataGrid table
  const profileColumns: GridColDef[] = [
    { 
      field: 'serial', 
      headerName: '#', 
      width: 60,
      align: 'center',
      headerAlign: 'center',
    },
    { field: 'first_name', headerName: 'First Name', width: 120, flex: 0.5 },
    { field: 'last_name', headerName: 'Last Name', width: 120, flex: 0.5 },
    { field: 'sex', headerName: 'Gender', width: 80 },
    { field: 'dob', headerName: 'Date of Birth', width: 110 },
    { field: 'father_name', headerName: 'Father Name', width: 140, flex: 1 },
    { 
      field: 'address', 
      headerName: 'Address', 
      width: 200,
      flex: 2,
      // Truncate long addresses and show full text on hover
      renderCell: (params: GridRenderCellParams<ProfileData, string>) => (
        <Typography variant="body2" className="truncate" title={params.value}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Details',
      width: 130,
      align: 'center',
      headerAlign: 'center',
      // Action button to view full profile details
      renderCell: (params: GridRenderCellParams<ProfileData>) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<InfoIcon />}
          onClick={() => onViewDetails(params.row)}
          className="border-nova-primary-300 text-nova-primary-600 hover:bg-nova-primary-50 whitespace-nowrap"
        >
          View All
        </Button>
      ),
    },
  ];

  // Handler for pagination changes from the DataGrid
  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    onPageChange(model.page);
    onRowsPerPageChange(model.pageSize);
  };

  return (
    <>
      {/* Error state - shown when API call fails */}
      {error && (
        <Alert severity="error" className="m-4">
          Failed to load profiles. Please try again.
        </Alert>
      )}

      {/* Empty state - shown when no profiles match the search/filter */}
      {!isLoading && !error && data.length === 0 && (
        <Box className="p-12 text-center">
          <SearchIcon sx={{ fontSize: 60 }} className="text-nova-gray-300 mb-4" />
          <Typography variant="h6" className="text-nova-gray-500 mb-2">
            No profiles found
          </Typography>
          <Typography variant="body2" className="text-nova-gray-400">
            {searchTerm ? 'Try a different search term' : 'No profiles available'}
          </Typography>
        </Box>
      )}

      {/* Loading state - shown while fetching data */}
      {isLoading && (
        <Box className="p-12 text-center">
          <CircularProgress className="text-nova-primary-500" />
          <Typography variant="body1" className="mt-4 text-nova-gray-500">
            Loading profiles...
          </Typography>
        </Box>
      )}

      {/* Data grid - main table view when data is loaded */}
      {!isLoading && !error && data.length > 0 && (
        <>
          <Box className="h-[500px]">
            <DataGrid
              rows={dataWithSerial}
              columns={profileColumns}
              getRowId={(row) => row.aadhar || row.id || Math.random()}
              rowCount={data.length}
              pageSizeOptions={[10, 20, 50]}
              paginationModel={{ page, pageSize: rowsPerPage }}
              onPaginationModelChange={handlePaginationChange}
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

          {/* Custom pagination footer with additional controls */}
          <PaginationFooter
            data={data}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </>
      )}
    </>
  );
};

export default ProfileTable;