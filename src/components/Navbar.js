// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DashboardIcon from '@mui/icons-material/Dashboard';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
});

const StyledButton = styled(Button)({
  margin: '0 10px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Social Photo Manager
        </Typography>
        <Box>
          <StyledButton startIcon={<CloudUploadIcon />} component={Link} to="/upload">
            Upload
          </StyledButton>
          <StyledButton startIcon={<DashboardIcon />} component={Link} to="/dashboard">
            Dashboard
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
