const { Product, Category } = require('../models');

/**
 * Product Controller - Handle CRUD Operations
 * Menggunakan Promise/Async-Await (CPMK-2)
 */

class ProductController {
  // READ: Get all products (Async/Await)
  static async index(req, res) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Category,
          as: 'category'
        }],
        order: [['createdAt', 'DESC']]
      });

      res.render('products/index', {
        title: 'Daftar Produk',
        products: products
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
    }
  }

  // CREATE: Show form untuk tambah produk
  static async create(req, res) {
    try {
      const categories = await Category.findAll();
      
      res.render('products/create', {
        title: 'Tambah Produk',
        categories: categories
      });
    } catch (error) {
      console.error('Error loading form:', error);
      res.status(500).send('Error loading form');
    }
  }

  // CREATE: Store produk baru (Async/Await)
  static async store(req, res) {
    try {
      const { name, description, price, rating, viewCount, stock, categoryId } = req.body;

      await Product.create({
        name,
        description,
        price: parseFloat(price),
        rating: parseFloat(rating),
        viewCount: parseInt(viewCount) || 0,
        stock: parseInt(stock),
        categoryId: parseInt(categoryId)
      });

      res.redirect('/products');
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send('Error creating product');
    }
  }

  // UPDATE: Show form edit
  static async edit(req, res) {
    try {
      const { id } = req.params;
      
      const product = await Product.findByPk(id);
      const categories = await Category.findAll();

      if (!product) {
        return res.status(404).send('Product not found');
      }

      res.render('products/edit', {
        title: 'Edit Produk',
        product: product,
        categories: categories
      });
    } catch (error) {
      console.error('Error loading edit form:', error);
      res.status(500).send('Error loading edit form');
    }
  }

  // UPDATE: Update produk (Async/Await)
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, rating, viewCount, stock, categoryId } = req.body;

      await Product.update({
        name,
        description,
        price: parseFloat(price),
        rating: parseFloat(rating),
        viewCount: parseInt(viewCount),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId)
      }, {
        where: { id }
      });

      res.redirect('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).send('Error updating product');
    }
  }

  // DELETE: Hapus produk (Async/Await)
  static async destroy(req, res) {
    try {
      const { id } = req.params;

      await Product.destroy({
        where: { id }
      });

      res.redirect('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Error deleting product');
    }
  }
}

module.exports = ProductController;