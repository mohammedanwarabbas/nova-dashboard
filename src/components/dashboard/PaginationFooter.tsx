import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface PaginationFooterProps {
  data: any[];
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const PaginationFooter = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PaginationFooterProps) => {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startItem = page * rowsPerPage + 1;
  const endItem = Math.min((page + 1) * rowsPerPage, data.length);

  return (
    <Box className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-nova-gray-200 bg-white gap-4">
      {/* Items per page selector and showing count */}
      <Box className="flex items-center gap-4">
        <Typography variant="body2" className="text-nova-gray-600">
          Showing {startItem} to {endItem} of {data.length}
        </Typography>
        
        <FormControl size="small" className="w-24">
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              onRowsPerPageChange(Number(e.target.value));
              onPageChange(0); // Reset to first page when changing rows per page
            }}
            className="text-sm"
          >
            <MenuItem value={10}>10 / page</MenuItem>
            <MenuItem value={20}>20 / page</MenuItem>
            <MenuItem value={50}>50 / page</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Page navigation buttons */}
      <Box className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={page === 0}
          className="border-nova-gray-300 text-nova-gray-700 hover:bg-nova-gray-50"
        >
          Previous
        </Button>
        
        {/* Page indicator */}
        <Typography variant="body2" className="text-nova-gray-700 px-2">
          Page {page + 1} of {totalPages || 1}
        </Typography>
        
        {/* Next button */}
        <Button
          size="small"
          endIcon={<ChevronRightIcon />}
          onClick={() => {
            if (page < totalPages - 1) {
              onPageChange(page + 1);
            }
          }}
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