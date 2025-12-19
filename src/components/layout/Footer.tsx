import { Box, Container, Typography, Divider } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box className="bg-nova-gray-50 border-t border-nova-gray-200 mt-auto">
      <Container maxWidth="xl">
        <Box className="py-4">
          <Box className="text-center">
            <Typography variant="caption" className="text-nova-gray-800">
              © {currentYear} Nova Dashboard.
            </Typography>
            <Typography variant="caption" className="text-nova-gray-800 block mt-1">
             Developed by Mohammed Anwar
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;