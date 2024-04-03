const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // Find all categories
  // Be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // Find one category by its `id` value
  // Be sure to include its associated Products
});

router.post('/', (req, res) => {
  // Create a new category

});

router.put('/:id', (req, res) => {
  // Update a category by its `id` value

});

router.delete('/:id', async (req, res) => {
  // Delete a category by its `id` value
  try { 
    // Deletes a category by its matching id value
    const deleteCategory = await Category.destroy({
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
    
    // If there is an error, send a 500 status 
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
