import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import PaginationFooter from './PaginationFooter';

interface CreditCardTableProps {
  data: any[];
  isLoading: boolean;
  error: any;
  searchTerm: string;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const CreditCardTable = ({
  data,
  isLoading,
  error,
  searchTerm,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CreditCardTableProps) => {
  // Add serial numbers to data for display - FIXED
  const dataWithSerial = data.map((item, index) => ({
    ...item,
    serial: index + 1,
  }));

  // Credit card table columns configuration
  const creditCardColumns: GridColDef[] = [
    { 
      field: 'serial', 
      headerName: '#', 
      width: 60,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'card_number', 
      headerName: 'Card Number', 
      width: 150,
      renderCell: (params: any) => (
        <Typography className="font-mono text-sm">
          {params.value ? `**** **** **** ${params.value.slice(-4)}` : 'Invalid Card'}
        </Typography>
      ),
    },
    { 
      field: 'card_provider', 
      headerName: 'Provider', 
      width: 100,
      renderCell: (params: any) => (
        <Typography className="capitalize">
          {params.value || 'Unknown'}
        </Typography>
      ),
    },
    { 
      field: 'digits', 
      headerName: 'Digits', 
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'card_type', 
      headerName: 'Type', 
      width: 90,
      renderCell: (params: any) => {
        const cardType = params.value?.toLowerCase() || 'unknown';
        const isCredit = cardType === 'credit';
        
        return (
          <Chip 
            label={params.value?.toUpperCase() || 'UNKNOWN'} 
            size="small" 
            className={`${
              isCredit
                ? 'bg-nova-primary-100 text-nova-primary-600' 
                : 'bg-nova-secondary-100 text-nova-secondary-600'
            }`}
          />
        );
      },
    },
    { 
      field: 'card_expiry', 
      headerName: 'Expiry', 
      width: 90,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'cvv', 
      headerName: 'CVV', 
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <>
      {/* Error State */}
      {error && (
        <Alert severity="error" className="m-4">
          Failed to load credit cards. Please try again.
        </Alert>
      )}

      {/* Empty State */}
      {!isLoading && !error && data.length === 0 && (
        <Box className="p-12 text-center">
          <SearchIcon sx={{ fontSize: 60 }} className="text-nova-gray-300 mb-4" />
          <Typography variant="h6" className="text-nova-gray-500 mb-2">
            No credit cards found
          </Typography>
          <Typography variant="body2" className="text-nova-gray-400">
            {searchTerm ? 'Try a different search term' : 'No credit cards available'}
          </Typography>
        </Box>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box className="p-12 text-center">
          <CircularProgress className="text-nova-primary-500" />
          <Typography variant="body1" className="mt-4 text-nova-gray-500">
            Loading credit cards...
          </Typography>
        </Box>
      )}

      {/* Data Grid */}
      {!isLoading && !error && data.length > 0 && (
        <>
          <Box className="h-[500px]">
            <DataGrid
              rows={dataWithSerial}
              columns={creditCardColumns}
              getRowId={(row) => row.card_number || row.id || Math.random()}
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

export default CreditCardTable;