const router = require('express').Router();
const { Blog, Comment, User } = require('../models/');

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
    res.status(200).json({ message: 'Already logged in' }).redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/comment', async (req, res) => {
  try {
    // Find the clicked blog
    const blog = await Blog.findOne({
      where: { id: req.session.selected_blog_id },
    });

    console.log(blog);

    if (blog) {
      blog.get({ plain: true });

      // Get the comment associated with the clicked blog
      const comment = await Comment.findOne({ where: { blog_id: blog.id } });

      console.log('COMMENT:', comment);

      // Get the currently logged in user's information
      const user = await User.findOne({ where: { id: req.session.user_id } });

      console.log('USER:', user);

      res.status(200).render('comment', {
        blog,
        comment,
        user,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).json({ message: 'Selected blog not found.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
