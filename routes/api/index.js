// Require Express and create a new router instance
const router = require('express').Router();
// Require category, product and tag routes
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the categories, products and tags routes for their endpoints
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Export router instance 
module.exports = router;
