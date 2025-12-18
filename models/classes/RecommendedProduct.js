const ProductBase = require('./ProductBase');

/**
 * RecommendedProduct Class dengan Inheritance (OOP - CPMK-1)
 * Class ini extends ProductBase dan menambahkan fungsi rekomendasi
 */
class RecommendedProduct extends ProductBase {
  constructor(id, name, price, rating, viewCount, stock, categoryName = '') {
    super(id, name, price, rating, viewCount, stock);
    this.categoryName = categoryName;
    this.recommendationScore = 0;
    this.normalizedScores = {};
  }

  // Method: Set bobot untuk weighted score algorithm
  setWeights(ratingWeight = 0.4, popularityWeight = 0.3, priceWeight = 0.3) {
    this.weights = {
      rating: ratingWeight,
      popularity: popularityWeight,
      price: priceWeight
    };
  }

  // Method: Normalisasi skor (Min-Max Normalization)
  normalizeScore(value, min, max) {
    if (max === min) return 0;
    return (value - min) / (max - min);
  }

  // Method: Calculate Weighted Score (Algoritma Matematis - CPMK-1)
  calculateWeightedScore(allProducts) {
    // Default weights jika belum di-set
    if (!this.weights) {
      this.setWeights();
    }

    // Cari min dan max untuk normalisasi
    const ratings = allProducts.map(p => p.rating);
    const views = allProducts.map(p => p.viewCount);
    const prices = allProducts.map(p => p.price);

    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);
    const minViews = Math.min(...views);
    const maxViews = Math.max(...views);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Normalisasi setiap komponen (0-1)
    const normalizedRating = this.normalizeScore(this.rating, minRating, maxRating);
    const normalizedPopularity = this.normalizeScore(this.viewCount, minViews, maxViews);
    
    // Untuk harga, semakin murah semakin baik (inverse)
    const normalizedPrice = 1 - this.normalizeScore(this.price, minPrice, maxPrice);

    // Simpan normalized scores untuk debugging
    this.normalizedScores = {
      rating: normalizedRating.toFixed(3),
      popularity: normalizedPopularity.toFixed(3),
      price: normalizedPrice.toFixed(3)
    };

    // Hitung weighted score
    // Formula: Score = (w1 * rating) + (w2 * popularity) + (w3 * price)
    this.recommendationScore = (
      (this.weights.rating * normalizedRating) +
      (this.weights.popularity * normalizedPopularity) +
      (this.weights.price * normalizedPrice)
    );

    return this.recommendationScore;
  }

  // Method: Get recommendation level
  getRecommendationLevel() {
    if (this.recommendationScore >= 0.8) return 'Sangat Direkomendasikan';
    if (this.recommendationScore >= 0.6) return 'Direkomendasikan';
    if (this.recommendationScore >= 0.4) return 'Cukup Direkomendasikan';
    return 'Kurang Direkomendasikan';
  }

  // Override method getInfo dari parent class (Polymorphism)
  getInfo() {
    const baseInfo = super.getInfo();
    return {
      ...baseInfo,
      categoryName: this.categoryName,
      recommendationScore: (this.recommendationScore * 100).toFixed(2) + '%',
      recommendationLevel: this.getRecommendationLevel(),
      normalizedScores: this.normalizedScores,
      weights: this.weights
    };
  }
}

module.exports = RecommendedProduct;