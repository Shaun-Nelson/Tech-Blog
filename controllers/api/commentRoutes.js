const router = require('express').Router();
const Blog = require('../../models/Blog');

router.post('/', async (req, res) => {
  try {
    const id = await req.body;
    const blogData = await Blog.findOne({ where: { id: id.id } });
    const blog = blogData.get({ plain: true });

    await Blog.update({ selected: true }, { where: { id: id.id } });

    // console.log('created blog:', blog);

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
