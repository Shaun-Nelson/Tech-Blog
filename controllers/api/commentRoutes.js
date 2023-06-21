const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    //Find the blog corresponding to the clicked blog's id
    const id = await req.body.id;

    req.session.save(() => {
      req.session.selected_blog_id = id;
      res.status(200).json({ message: 'Successful POST' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  // Multiple return statements are used so that multiple headers aren't sent back to the client

  // If User isn't logged in, redirect them to the login page
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      author_id: req.session.user_id,
      blog_id: req.session.selected_blog_id,
    });

    if (!comment) {
      return res.status(400).json({ message: 'Cannot create comment' });
    }

    return res.status(200).json({ message: 'Successful Comment' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
