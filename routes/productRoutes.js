const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Product CRUD Routes
router.get('/', ProductController.index);                  // READ all
router.get('/create', ProductController.create);           // CREATE form
router.post('/', ProductController.store);                 // CREATE store
router.get('/:id/edit', ProductController.edit);          // UPDATE form
router.put('/:id', ProductController.update);             // UPDATE
router.delete('/:id', ProductController.destroy);         // DELETE

module.exports = router;