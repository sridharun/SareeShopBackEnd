const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ GET all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    const updatedProducts = rows.map(product => ({
      ...product,
      image: `http://localhost:5000/${product.image}` // append base URL
    }));

    res.json(updatedProducts);
  });
});

// ✅ GET a single product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, rows) => {
    if (err) {
      console.error('Error fetching product by ID:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = rows[0];
    product.image = `http://localhost:5000/${product.image}`;
    res.json(product);
  });
});

module.exports = router;
