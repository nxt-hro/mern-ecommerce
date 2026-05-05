import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Sell from './pages/Sell';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/sell"
              element={
                <ProtectedRoute>
                  <Sell />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
