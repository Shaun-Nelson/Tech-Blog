const router = require('express').Router();
const Blog = require('../../models/Blog');

router.post('/', async (req, res) => {
  try {
    //Find the blog corresponding to the clicked blog's id
    const id = await req.body;
    const blogData = await Blog.findOne({ where: { id: id.id } });
    const blog = blogData.get({ plain: true });

    //Set the blog as the currently selected blog
    await Blog.update({ selected: true }, { where: { id: id.id } });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  try {
    //Get the clicked blog
    const blog = await Blog.findOne({ where: { selected: true } });

    //Enter comment into blog table
    await blog.update(
      { comment: req.body.comment },
      { where: { selected: true } }
    );

    //De-select the clicked blog
    await blog.update(
      { selected: false },
      { where: { comment: req.body.comment } }
    );
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
