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
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    // If the category is not found, send a 404 status with a  message
    if (!oneCategory) {
    res.status(404).json({ message: 'No Category found with this id' });
    return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {  // If there is an error, send a 500 status
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) // If there is an error, send a 400 status
 {
  res.status(400).json(err); 
 }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, { where: { id: req.params.id } });
    !updateCategory[0] ? res.status(404).json({ message: 'ID not found!' }) : res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json({ message: 'Update failed!' });
  }
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
