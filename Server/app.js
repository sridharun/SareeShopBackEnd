const express = require('express');
const cors = require('cors');
const path = require('path'); // ✅ Required to resolve static path
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve static images
// Serve static files (images)
app.use('/images', express.static('public/images'));

// ✅ Import and use the products route
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes); // http://localhost:5000/api/products

// Test route
app.get('/', (req, res) => {
  res.send('API running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
