import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Badge,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import useCartStore from '../store/cartStore';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          E-Shop
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>

          {token && (
            <Button color="inherit" onClick={() => navigate('/sell')}>
              Sell
            </Button>
          )}

          <Button
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ position: 'relative' }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>

          {token ? (
            <>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                startIcon={<AccountCircleIcon />}
              >
                Account
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
