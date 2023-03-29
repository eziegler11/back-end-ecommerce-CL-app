const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product }
      ]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product }
      ]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  const tagData = (req.body, {
    tag_name: "Tag"
  });
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).json(error);
  });
});

router.put('/:id', (req, res) => {
  // update a tag by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((error) => {
    console.log(error);
    res.status(400).json(error);
  })
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
try {
  const tagData = await Tag.destroy({
    where: { id: req.params.id }
  });
  if (!tagData) {
    res.status(404).json({ message: 'No tag with this id' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
