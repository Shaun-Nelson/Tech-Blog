const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');
const withAuth = require('../utils/auth.js');

// Read
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create
router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.session.user_id } });
    const username = user.dataValues.username;

    const blog = await Blog.create({
      title: req.body.title,
      contents: req.body.content,
      username: username,
      user_id: req.session.user_id,
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.update(
      {
        title: req.body.title,
        contents: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const blog = Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

// Login route
router.get('/login', (req, res) => {
  try {
    // If the user is already logged in, send them to the dashboard page
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
    }
    return res.status(200).render('login');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { user_id: req.session.user_id },
    });
    blogs.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'You must be logged in to view the dashboard' });
  }
});

router.get('/comment', async (req, res) => {
  try {
    // Find the clicked blog
    const blog = await Blog.findOne({
      where: { id: req.session.selected_blog_id },
    });

    if (blog) {
      await blog.get({ plain: true });

      // Get the comment associated with the clicked blog
      const comments = await Comment.findAll({ where: { blog_id: blog.id } });

      // // Get the currently logged in user's information
      // const user = await User.findOne({ where: { id: req.session.user_id } });

      res.status(200).render('comment', {
        blog,
        comments,
      });
    } else {
      res.status(404).json({ message: 'Selected blog not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit', async (req, res) => {
  console.log('logged in:', req.session.loggedIn);
  try {
    //Get the clicked blog from the dashboard
    const blog = await Blog.findOne({
      where: { id: req.session.selected_blog_id },
    });
    await blog.get({ plain: true });

    res.status(200).render('editPost', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
