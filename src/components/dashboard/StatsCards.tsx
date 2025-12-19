import { Paper, Box, Typography } from '@mui/material';
import {
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

interface StatsCardsProps {
  profilesCount: number;
  cardsCount: number;
  filteredCount: number;
  rowsPerPage: number;
}

const StatsCards = ({
  profilesCount,
  cardsCount,
  filteredCount,
  rowsPerPage,
}: StatsCardsProps) => {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Profiles Card */}
      <Paper className="p-6 rounded-nova border border-nova-gray-200 hover:shadow-nova transition-shadow">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" className="text-nova-primary-500">
              {profilesCount}
            </Typography>
            <Typography variant="body2" className="text-nova-gray-600">
              Total Profiles
            </Typography>
          </Box>
          <PersonIcon className="text-nova-primary-300" sx={{ fontSize: 40 }} />
        </Box>
      </Paper>

      {/* Credit Cards Card */}
      <Paper className="p-6 rounded-nova border border-nova-gray-200 hover:shadow-nova transition-shadow">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" className="text-nova-secondary-500">
              {cardsCount}
            </Typography>
            <Typography variant="body2" className="text-nova-gray-600">
              Credit Cards
            </Typography>
          </Box>
          <CreditCardIcon className="text-nova-secondary-300" sx={{ fontSize: 40 }} />
        </Box>
      </Paper>

      {/* Filtered Items Card */}
      <Paper className="p-6 rounded-nova border border-nova-gray-200 hover:shadow-nova transition-shadow">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" className="text-nova-accent-500">
              {filteredCount}
            </Typography>
            <Typography variant="body2" className="text-nova-gray-600">
              Filtered Items
            </Typography>
          </Box>
          <SearchIcon className="text-nova-accent-300" sx={{ fontSize: 40 }} />
        </Box>
      </Paper>

      {/* Per Page Card */}
      <Paper className="p-6 rounded-nova border border-nova-gray-200 hover:shadow-nova transition-shadow">
        <Box className="flex items-center justify-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" className="text-nova-gray-500">
              {rowsPerPage}
            </Typography>
            <Typography variant="body2" className="text-nova-gray-600">
              Items Per Page
            </Typography>
          </Box>
          <RefreshIcon className="text-nova-gray-400" sx={{ fontSize: 40 }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default StatsCards;