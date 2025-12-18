const RecommendedProduct = require('../models/classes/RecommendedProduct');

/**
 * Algoritma Matematis: Weighted Score Recommendation System
 * CPMK-1: Penerapan algoritma matematis dalam pemrograman
 * 
 * Formula:
 * Score = (w1 × normalized_rating) + (w2 × normalized_popularity) + (w3 × normalized_price)
 * 
 * Normalisasi menggunakan Min-Max Normalization:
 * normalized_value = (value - min) / (max - min)
 */

class RecommendationAlgorithm {
  /**
   * Generate rekomendasi produk dengan weighted score
   * @param {Array} products - Array of product objects from database
   * @param {Object} weights - Bobot untuk setiap faktor
   * @returns {Array} - Sorted array of RecommendedProduct instances
   */
  static generateRecommendations(products, weights = { rating: 0.4, popularity: 0.3, price: 0.3 }) {
    // Convert database products ke RecommendedProduct instances (OOP)
    const recommendedProducts = products.map(p => {
      const recProduct = new RecommendedProduct(
        p.id,
        p.name,
        parseFloat(p.price),
        parseFloat(p.rating),
        p.viewCount,
        p.stock,
        p.category ? p.category.name : ''
      );
      
      // Set custom weights
      recProduct.setWeights(weights.rating, weights.popularity, weights.price);
      
      return recProduct;
    });

    // Calculate weighted score untuk setiap produk
    recommendedProducts.forEach(product => {
      product.calculateWeightedScore(recommendedProducts);
    });

    // Sort berdasarkan recommendation score (descending)
    return recommendedProducts.sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  /**
   * Calculate statistics dari produk
   * @param {Array} products - Array of products
   * @returns {Object} - Statistics object
   */
  static calculateStatistics(products) {
    if (products.length === 0) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        averageRating: 0,
        totalViews: 0
      };
    }

    const totalPrice = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
    const totalRating = products.reduce((sum, p) => sum + parseFloat(p.rating), 0);
    const totalViews = products.reduce((sum, p) => sum + p.viewCount, 0);

    return {
      totalProducts: products.length,
      averagePrice: (totalPrice / products.length).toFixed(2),
      averageRating: (totalRating / products.length).toFixed(2),
      totalViews: totalViews,
      averageViews: Math.round(totalViews / products.length)
    };
  }

  /**
   * Filter produk berdasarkan kategori
   * @param {Array} products - Array of products
   * @param {Number} categoryId - Category ID
   * @returns {Array} - Filtered products
   */
  static filterByCategory(products, categoryId) {
    if (!categoryId) return products;
    return products.filter(p => p.categoryId === parseInt(categoryId));
  }
}

module.exports = RecommendationAlgorithm;