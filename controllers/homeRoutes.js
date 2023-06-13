const router = require('express').Router();
const Blog = require('../models/Blog');

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
    const blog = await Blog.create({
      title: req.body.title,
      contents: req.body.contents,
      username: req.body.username,
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
        contents: req.body.contents,
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
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = router;
