import {
  Paper,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Person as PersonIcon,
  CreditCard as CreditCardIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

interface ControlsSectionProps {
  viewMode: 'profiles' | 'creditCards';
  onViewChange: (mode: 'profiles' | 'creditCards') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
  profilesCount: number;
  cardsCount: number;
}

const ControlsSection = ({
  viewMode,
  onViewChange,
  searchTerm,
  onSearchChange,
  onClearSearch,
  profilesCount,
  cardsCount,
}: ControlsSectionProps) => {
  // Handle toggle button change
  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'profiles' | 'creditCards' | null,
  ) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return (
    <Paper className="p-6 rounded-nova border border-nova-gray-200 mb-6">
      <Box className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Toggle Buttons - Switch between Profiles and Credit Cards */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleToggleChange}
          aria-label="view mode"
          className="h-12"
        >
          <ToggleButton 
            value="profiles" 
            className={`px-6 ${viewMode === 'profiles' ? '!bg-nova-primary-500 !text-white' : ''}`}
          >
            <PersonIcon className="mr-2" />
            Profiles ({profilesCount})
          </ToggleButton>
          <ToggleButton 
            value="creditCards" 
            className={`px-6 ${viewMode === 'creditCards' ? '!bg-nova-secondary-500 !text-white' : ''}`}
          >
            <CreditCardIcon className="mr-2" />
            Credit Cards ({cardsCount})
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Search and Controls */}
        <Box className="flex flex-col sm:flex-row gap-4">
          {/* Search Input - Filters data in real-time */}
          <TextField
            placeholder={`Search ${viewMode === 'profiles' ? 'profiles' : 'credit cards'}...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
                  <IconButton size="small" onClick={onClearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Refresh Button - Re-fetches data from API */}
          <IconButton
            onClick={() => window.location.reload()} // Simple refresh for now
            className="border border-nova-gray-300 hover:bg-nova-gray-50"
            title="Refresh data"
          >
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ControlsSection;