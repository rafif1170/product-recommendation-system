/**
 * Base Class untuk Product (OOP Implementation - CPMK-1)
 * Class ini merepresentasikan produk dasar dengan properti dan method
 */
class ProductBase {
  constructor(id, name, price, rating, viewCount, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.rating = rating;
    this.viewCount = viewCount;
    this.stock = stock;
  }

  // Method: Format harga ke Rupiah
  getFormattedPrice() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(this.price);
  }

  // Method: Cek ketersediaan stok
  isAvailable() {
    return this.stock > 0;
  }

  // Method: Get popularity level berdasarkan view count
  getPopularityLevel() {
    if (this.viewCount >= 200) return 'Sangat Popular';
    if (this.viewCount >= 100) return 'Popular';
    if (this.viewCount >= 50) return 'Cukup Popular';
    return 'Baru';
  }

  // Method: Calculate base score (untuk inheritance)
  calculateBaseScore() {
    return {
      rating: this.rating,
      popularity: this.viewCount,
      availability: this.stock
    };
  }

  // Method: Get product info
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      price: this.getFormattedPrice(),
      rating: this.rating,
      viewCount: this.viewCount,
      stock: this.stock,
      available: this.isAvailable(),
      popularityLevel: this.getPopularityLevel()
    };
  }
}

module.exports = ProductBase;