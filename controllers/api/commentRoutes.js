const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    //Find the blog corresponding to the clicked blog's id
    const id = await req.body.id;

    // //Set the blog as the currently selected blog
    // await Blog.update({ selected: true }, { where: { id: id } });

    req.session.save(() => {
      req.session.selected_blog_id = id;
      res.status(200).json({ message: 'Successful POST' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    // //Get the clicked blog
    // const blog = await Blog.findOne({ where: { selected: true } });

    await Comment.create({
      comment: req.body.comment,
      author_id: req.session.user_id,
      blog_id: req.session.selected_blog_id,
    });

    res.status(200).json({ message: 'Successful Comment' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
