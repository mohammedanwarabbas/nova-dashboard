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

// Props for the ControlsSection component
// These control the toggle between profiles/credit cards and the search functionality
interface ControlsSectionProps {
  viewMode: 'profiles' | 'creditCards';        // Current active view mode
  onViewChange: (mode: 'profiles' | 'creditCards') => void;  // Called when view mode changes
  searchTerm: string;                           // Current search input value
  onSearchChange: (term: string) => void;       // Called when search input changes
  onClearSearch: () => void;                    // Called to clear the search input
  profilesCount: number;                        // Total number of profiles available
  cardsCount: number;                           // Total number of credit cards available
}

// This component provides the control panel for the dashboard
// It includes toggle buttons to switch between views and a search box for filtering data
const ControlsSection = ({
  viewMode,
  onViewChange,
  searchTerm,
  onSearchChange,
  onClearSearch,
  profilesCount,
  cardsCount,
}: ControlsSectionProps) => {
  // Handles when the user clicks on the toggle buttons
  // Only changes if a valid button is clicked (not null)
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
        {/* Toggle Buttons Section - Left side of the controls */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleToggleChange}
          aria-label="view mode"
          className="h-12"
        >
          {/* Profiles button - shows profile count */}
          <ToggleButton 
            value="profiles" 
            className={`px-6 ${viewMode === 'profiles' ? '!bg-nova-primary-500 !text-white' : ''}`}
          >
            <PersonIcon className="mr-2" />
            Profiles ({profilesCount})
          </ToggleButton>
          
          {/* Credit Cards button - shows card count */}
          <ToggleButton 
            value="creditCards" 
            className={`px-6 ${viewMode === 'creditCards' ? '!bg-nova-secondary-500 !text-white' : ''}`}
          >
            <CreditCardIcon className="mr-2" />
            Credit Cards ({cardsCount})
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Search and Refresh Section - Right side of the controls */}
        <Box className="flex flex-col sm:flex-row gap-4">
          {/* Search input field with clear button when text is entered */}
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
              // Show clear button only when there's text in the search box
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={onClearSearch}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Refresh button - reloads the page to fetch fresh data from APIs */}
          <IconButton
            onClick={() => window.location.reload()}
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