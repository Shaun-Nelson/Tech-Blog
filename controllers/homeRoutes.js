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
    const user = await User.findOne({ where: { id: req.session.user_id } });
    const username = user.dataValues.username;

    const blog = await Blog.create({
      title: req.body.title,
      contents: req.body.content,
      username: username,
      user_id: req.session.user_id,
    });
    console.log('BLOG: ', blog);
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
  try {
    return res.status(200).render('login', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
});
// // If the user is already logged in, redirect to the homepage
// if (req.session.loggedIn) {
//   res.status(200).json({ message: 'Already logged in' }).redirect('/');
//   return;
// }
// // Otherwise, render the 'login' template
// res.render('login');
// });

router.get('/dashboard', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { user_id: req.session.user_id },
    });
    blogs.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment', async (req, res) => {
  try {
    // Find the clicked blog
    const blog = await Blog.findOne({
      where: { id: req.session.selected_blog_id },
    });

    if (blog) {
      blog.get({ plain: true });

      // Get the comment associated with the clicked blog
      const comments = await Comment.findAll({ where: { blog_id: blog.id } });

      // Get the currently logged in user's information
      const user = await User.findOne({ where: { id: req.session.user_id } });

      res.status(200).render('comment', {
        blog,
        comments,
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
