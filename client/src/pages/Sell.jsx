import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import api from '../utils/api';

const Sell = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', formData.stock);
      if (image) {
        formDataToSend.append('image', image);
      }

      await api.post('/products', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product uploaded successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          Sell Your Product
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            inputProps={{ step: '0.01', min: '0' }}
            required
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            select
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Stock Quantity"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            margin="normal"
            inputProps={{ min: '0' }}
            required
          />

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={{ width: '100%' }}
            />
          </Box>

          {image && (
            <Typography variant="body2" sx={{ mb: 2, color: 'green' }}>
              Selected: {image.name}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Upload Product'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Sell;
