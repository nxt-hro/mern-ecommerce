import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import useCartStore from '../store/cartStore';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, 1);
    alert('Product added to cart!');
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ cursor: 'pointer', objectFit: 'cover' }}
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.seller?.name || 'Unknown Seller'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
