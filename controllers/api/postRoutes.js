const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).render('newPost', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
