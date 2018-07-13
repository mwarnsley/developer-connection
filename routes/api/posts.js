const express = require('express');
const router = express.Router();

// @route GET api/posts
router.get('/', (req, res) => {
  res.json({ post: 'POST' });
});

module.exports = router;
