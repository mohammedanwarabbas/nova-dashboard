import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Search as SearchIcon, Info as InfoIcon } from '@mui/icons-material';
import PaginationFooter from './PaginationFooter';

interface ProfileTableProps {
  data: any[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onViewDetails: (profile: any) => void;
}

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
  // Add serial numbers to data for display - FIXED
  const dataWithSerial = data.map((item, index) => ({
    ...item,
    serial: index + 1,
  }));

  // Profile table columns configuration
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
      renderCell: (params: any) => (
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
      renderCell: (params: any) => (
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

  return (
    <>
      {/* Error State */}
      {error && (
        <Alert severity="error" className="m-4">
          Failed to load profiles. Please try again.
        </Alert>
      )}

      {/* Empty State */}
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

      {/* Loading State */}
      {isLoading && (
        <Box className="p-12 text-center">
          <CircularProgress className="text-nova-primary-500" />
          <Typography variant="body1" className="mt-4 text-nova-gray-500">
            Loading profiles...
          </Typography>
        </Box>
      )}

      {/* Data Grid */}
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
              onPaginationModelChange={(model: { page: number; pageSize: number }) => {
                onPageChange(model.page);
                onRowsPerPageChange(model.pageSize);
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

          {/* Pagination Footer */}
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