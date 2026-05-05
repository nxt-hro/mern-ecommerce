import { useNavigate } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Your cart is empty
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
        Shopping Cart
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value);
                      if (newQty > 0 && newQty <= item.stock) {
                        updateQuantity(item._id, newQty);
                      }
                    }}
                    inputProps={{ min: 1, max: item.stock }}
                    sx={{ width: 70 }}
                  />
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => removeItem(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Subtotal: ${getTotalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/checkout')}
          sx={{ ml: 'auto' }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
