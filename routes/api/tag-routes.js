const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // Find all tags
  // Be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      through: ProductTag
    }
  })
  .then(data => {
    res.json(data);
  });
});

router.get('/:id', (req, res) => {
  // Find a single tag by its `id`
  // Be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      through: ProductTag
    }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // Create a new tag
  Tag.create(req.body)
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // Update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // Delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
