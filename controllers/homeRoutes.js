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
router.put('/:id', withAuth, async (req, res) => {
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
router.delete('/:id', withAuth, async (req, res) => {
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

router.get('/dashboard', withAuth, async (req, res) => {
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
    res.status(500).redirect('/login');
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

      // Serialize comment data
      comments.map((comment) => comment.get({ plain: true }));

      // const author_ids = comments.map((comment) => comment.author_id);

      // const users = await Promise.all(
      //   author_ids.map(async (user) => {
      //     const foundUser = await User.findOne({ where: { id: user } });
      //     if (foundUser) {
      //       return foundUser.get({ plain: true });
      //     }
      //     return null; // Return null if user not found
      //   })
      // );

      res.status(200).render('comment', {
        blog,
        comments,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).json({ message: 'Selected blog not found.' });
    }
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

router.get('/edit', async (req, res) => {
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
