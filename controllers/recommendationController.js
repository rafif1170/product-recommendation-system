const { Product, Category } = require('../models');
const RecommendationAlgorithm = require('../utils/algorithm');

/**
 * Recommendation Controller
 * Menggunakan Algoritma Weighted Score (CPMK-1)
 * Menggunakan Promise/Async-Await (CPMK-2)
 */

class RecommendationController {
  // Show recommendation page with weighted score algorithm
  static async index(req, res) {
    try {
      // Get custom weights from query params (default: 0.4, 0.3, 0.3)
      const ratingWeight = parseFloat(req.query.ratingWeight) || 0.4;
      const popularityWeight = parseFloat(req.query.popularityWeight) || 0.3;
      const priceWeight = parseFloat(req.query.priceWeight) || 0.3;
      const categoryId = req.query.categoryId || null;

      // Fetch all products with category (Async/Await - CPMK-2)
      const allProducts = await Product.findAll({
        include: [{
          model: Category,
          as: 'category'
        }]
      });

      // Filter by category if selected
      let products = categoryId 
        ? RecommendationAlgorithm.filterByCategory(allProducts, categoryId)
        : allProducts;

      // Generate recommendations using weighted score algorithm (CPMK-1)
      const recommendations = RecommendationAlgorithm.generateRecommendations(
        products,
        {
          rating: ratingWeight,
          popularity: popularityWeight,
          price: priceWeight
        }
      );

      // Calculate statistics
      const statistics = RecommendationAlgorithm.calculateStatistics(products);

      // Get all categories for filter
      const categories = await Category.findAll();

      res.render('recommendations/index', {
        title: 'Rekomendasi Produk',
        recommendations: recommendations,
        statistics: statistics,
        categories: categories,
        selectedCategory: categoryId,
        weights: {
          rating: ratingWeight,
          popularity: popularityWeight,
          price: priceWeight
        }
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      res.status(500).send('Error generating recommendations');
    }
  }
}

module.exports = RecommendationController;