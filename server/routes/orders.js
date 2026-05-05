const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create order (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    const order = new Order({
      user: req.user.userId,
      items,
      total,
      shippingAddress,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
