import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import api from '../utils/api';
import useCartStore from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      setError('Quantity exceeds available stock');
      return;
    }
    addItem(product, parseInt(quantity));
    alert('Product added to cart!');
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
      setError('');
    } else if (value > product.stock) {
      setError('Quantity exceeds available stock');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        ← Back to Home
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', objectFit: 'cover', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {product.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Seller: {product.seller?.name || 'Unknown'}
          </Typography>

          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            Stock Available: {product.stock}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: product.stock }}
              sx={{ width: 100 }}
            />

            <Button
              variant="contained"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </Box>

          {product.stock === 0 && (
            <Typography color="error">Out of Stock</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
