import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import api from '../utils/api';
import useCartStore from '../store/cartStore';

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        total: getTotalPrice,
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          zip: formData.zip,
        },
      };

      await api.post('/orders', orderData);
      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Order placement failed');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your cart is empty. Add items before checkout.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Shipping Information
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="ZIP Code"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Order Summary
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ borderTop: '1px solid #ddd', mt: 2, pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${getTotalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  ${getTotalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
