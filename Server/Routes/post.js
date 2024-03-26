const express = require('express');
const router = express.Router();
const Post = require('../Schemas/Posts');

router.post('/', async (req, res) => {
  try {
    const { title, description, image, video , topic } = req.body;
    if (!image && !video) {
      return res.status(400).json({ error: 'Either imageLink or videoLink is required' });
    }

    const post = new Post({
      title,
      description,
      image,
      video,
      topic,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
