const sequelize = require('../config/database');
const Category = require('./Category');
const Product = require('./Product');

// Sync database (Promise/Async - CPMK-2)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully.');
    
    // Seed data jika belum ada
    await seedData();
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

// Function untuk seed initial data
const seedData = async () => {
  try {
    const categoryCount = await Category.count();
    
    if (categoryCount === 0) {
      // Seed Categories
      await Category.bulkCreate([
        { name: 'Elektronik', description: 'Produk elektronik dan gadget' },
        { name: 'Fashion', description: 'Pakaian dan aksesoris' },
        { name: 'Makanan', description: 'Makanan dan minuman' },
        { name: 'Olahraga', description: 'Peralatan olahraga' }
      ]);

      // Seed Products
      await Product.bulkCreate([
        { name: 'Laptop Gaming', description: 'Laptop untuk gaming', price: 15000000, rating: 4.5, viewCount: 150, stock: 10, categoryId: 1 },
        { name: 'Smartphone', description: 'Smartphone terbaru', price: 5000000, rating: 4.8, viewCount: 300, stock: 25, categoryId: 1 },
        { name: 'Kaos Polos', description: 'Kaos polos berbagai warna', price: 50000, rating: 4.2, viewCount: 80, stock: 100, categoryId: 2 },
        { name: 'Celana Jeans', description: 'Celana jeans premium', price: 250000, rating: 4.0, viewCount: 60, stock: 50, categoryId: 2 },
        { name: 'Kopi Premium', description: 'Kopi arabica pilihan', price: 75000, rating: 4.7, viewCount: 120, stock: 200, categoryId: 3 },
        { name: 'Sepatu Lari', description: 'Sepatu untuk lari', price: 800000, rating: 4.6, viewCount: 95, stock: 30, categoryId: 4 }
      ]);

      console.log('✅ Seed data created successfully.');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

module.exports = {
  sequelize,
  Category,
  Product,
  syncDatabase
};