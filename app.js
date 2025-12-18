require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { syncDatabase } = require('./models');

// Import routes
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/productRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/recommendations', recommendationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server dengan async/await
const startServer = async () => {
  try {
    // Sync database dulu
    await syncDatabase();
    
    // Baru start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Recommendations: http://localhost:${PORT}/recommendations`);
      console.log(`📦 Products: http://localhost:${PORT}/products`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();