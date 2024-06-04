const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
// This route uses async/await with '.catch()' for errors
router.get('/', async (req, res) => {
  // Find all products
  // Be sure to include its associated Category and Tag data
  //   Product.findAll({
  //     include: [{
  //       model: Category,
  //     },
  //   {
  //     model: Tag,
  //     through: ProductTag,
  //   })
  //   })
  //   .then(data => {
  //   res.json(data);
  //   })
  //   .catch(err => {
  //   console.log(err);
  //  });
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag}]
    });
    res.status(200).json(products); // 200 status code means the rrequest is successful
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// Get one product
router.get('/:id', async (req, res) => {
  // Find a single product by its `id`
  // Be sure to include its associated Category and Tag data
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!product) {
      res.status(404).json({ message: 'No product found with this id!'});
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', (req, res) => {
  Product.create(req.body)
  .then((product) => {
    // If there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIds);
    }
    res.status(200).json(product);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

// Create a product - from Activity 26
// router.post('/', async (req, res) => {
//   try {
//     const locationData = await Product.create({
//       reader_id: req.body.reader_id,
//     });
//     res.status(200).json(locationData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // Create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // Figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Delete one product by its `id` value
  Product.destroy({
    where: {
      id:req.params.id
    }
  })
  .then((data) => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
