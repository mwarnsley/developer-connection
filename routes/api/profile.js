const express = require('express');
const router = express.Router();

// @route GET api/profile
router.get('/', (req, res) => {
  res.json({ profile: 'PROFILE' });
});

module.exports = router;
