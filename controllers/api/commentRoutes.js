const router = require('express').Router();
const { Comment, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // Find the blog corresponding to the clicked blog's id
    const id = await req.body.id;

    req.session.selected_blog_id = id;
    res.status(200).json({ message: 'Successful POST' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/new', async (req, res) => {
  // Multiple return statements are used so that multiple headers aren't sent back to the client
  try {
    //If the User is not logged in, send a redirect URL via JSON that can be handled by the client-side script (/js/comment.js) as res.redirect and the withAuth middleware don't work here
    if (!req.session.loggedIn) {
      return res.status(401).json({ redirectTo: '/login' });
    }

    const user = await User.findByPk(req.session.user_id);

    user.get({ plain: true });

    const username = user.username;

    const comment = await Comment.create({
      comment: req.body.comment,
      author_id: req.session.user_id,
      blog_id: req.session.selected_blog_id,
      username: username,
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
