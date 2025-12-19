import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate(ROUTES.LOGIN);
  };

  const firstName = user?.name?.split(' ')[0] || 'User';
  const displayName = firstName.length > 12 
    ? `${firstName.substring(0, 10)}...` 
    : firstName;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      className="!bg-gradient-to-r from-nova-gray-100 to-nova-gray-50 border-b border-nova-gray-200"
    >
      <Container maxWidth="xl">
        <Toolbar className="px-0 py-3">
          
          {/* Logo with gradient */}
          <Box className="flex items-center flex-1">
            <Typography
              component={Link}
              to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
              className="no-underline"
            >
              <Typography
                variant="h4"
                fontWeight="800"
                className="bg-gradient-to-r from-nova-primary-500 to-nova-accent-500 bg-clip-text text-transparent tracking-tight"
                sx={{ 
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.5px'
                }}
              >
                Nova
              </Typography>
            </Typography>
            <Box className="ml-2 h-8 w-1 bg-gradient-to-b from-nova-secondary-500 to-nova-primary-500 rounded-full"></Box>
          </Box>

          {/* Right side */}
          <Box className="flex items-center gap-4">
            { isAuthenticated && (
              <>
                {/* Avatar with dropdown */}
                <Button
                  onClick={handleAvatarClick}
                  className="p-1 hover:bg-nova-gray-100 rounded-full transition-all duration-200 min-w-0"
                  disableRipple
                >
                  <Avatar
                    src={user?.picture}
                    alt={user?.name}
                    className="border-2 border-nova-primary-100 w-10 h-10 shadow-nova"
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </Button>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className="mt-2"
                  PaperProps={{
                    className: "min-w-[280px] rounded-nova shadow-nova-lg border border-nova-gray-200"
                  }}
                >
                  {/* User info */}
                  <MenuItem className="px-6 py-4 hover:bg-transparent cursor-default">
                    <Box className="flex flex-col w-full">
                      <Typography 
                        className="text-nova-gray-800 font-semibold text-lg mb-1 break-words"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {displayName}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        className="text-nova-gray-500 break-words"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {user?.email}
                      </Typography>
                    </Box>
                  </MenuItem>

                  <Box className="px-6 pb-3">
                    <Box className="h-px bg-nova-gray-200"></Box>
                  </Box>

                  {/* Logout */}
                  <MenuItem 
                    onClick={handleLogout}
                    className="px-6 py-3 text-nova-error-500 hover:bg-nova-error-50 hover:text-nova-error-600 transition-colors"
                  >
                    <Box className="flex items-center w-full">
                      <Box className="w-2 h-2 rounded-full bg-nova-error-500 mr-3"></Box>
                      <Typography className="font-medium">
                        Logout
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;