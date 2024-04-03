const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(allCategories);
  } catch (err) { // If there is an error, send a 500 status 
    res.status(500).json(err);
  }
});

// Find one category by its `id` value
router.get('/:id', (req, res) => {
  
  // Be sure to include its associated Products
});

// Create a new category
router.post('/', (req, res) => {
  

});

// Update a category by its `id` value
router.put('/:id', (req, res) => {
  

});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try { 
    const deleteCategory = await Category.destroy({ // Deletes a category by its matching id value
      where: {
        id: req.params.id
      }
    });
    // If the category is not found, send a 404 status with a  message and if not return the deleted data
    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id'});
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) { // If there is an error, send a 500 status 
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
