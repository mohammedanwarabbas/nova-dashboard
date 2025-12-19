import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

// Define a generic interface for pagination data
// Using a generic type <T> makes this component reusable with different data types
interface PaginationFooterProps<T> {
  data: T[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

// This component handles pagination controls for tables
// It shows current item range and provides navigation buttons
const PaginationFooter = <T,>({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationFooterProps<T>) => {
  // Calculate total pages based on data length and rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage);
  
  // Calculate which items are currently being shown
  // Example: "Showing 11 to 20 of 150"
  const startItem = page * rowsPerPage + 1;
  const endItem = Math.min((page + 1) * rowsPerPage, data.length);

  // Handle when user changes the rows per page dropdown
  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = Number(event.target.value);
    onRowsPerPageChange(newRowsPerPage);
    // Reset to first page when changing rows per page
    onPageChange(0);
  };

  // Navigate to the previous page
  const handlePreviousPage = () => {
    onPageChange(Math.max(0, page - 1));
  };

  // Navigate to the next page
  const handleNextPage = () => {
    if (page < totalPages - 1) {
      onPageChange(page + 1);
    }
  };

  return (
    <Box className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-nova-gray-200 bg-white gap-4">
      {/* Left section: Shows current item range and rows per page selector */}
      <Box className="flex items-center gap-4">
        <Typography variant="body2" className="text-nova-gray-600">
          Showing {startItem} to {endItem} of {data.length}
        </Typography>
        
        {/* Dropdown to select how many items to show per page */}
        <FormControl size="small" className="w-24">
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="text-sm"
          >
            <MenuItem value={10}>10 / page</MenuItem>
            <MenuItem value={20}>20 / page</MenuItem>
            <MenuItem value={50}>50 / page</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Right section: Page navigation buttons */}
      <Box className="flex items-center gap-2">
        {/* Previous page button - disabled on first page */}
        <Button
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="border-nova-gray-300 text-nova-gray-700 hover:bg-nova-gray-50"
        >
          Previous
        </Button>
        
        {/* Current page indicator */}
        <Typography variant="body2" className="text-nova-gray-700 px-2">
          Page {page + 1} of {totalPages || 1}
        </Typography>
        
        {/* Next page button - disabled on last page */}
        <Button
          size="small"
          endIcon={<ChevronRightIcon />}
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
          className="border-nova-gray-300 text-nova-gray-700 hover:bg-nova-gray-50"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationFooter;