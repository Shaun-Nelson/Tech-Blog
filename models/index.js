const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

//User and Blog relationship
User.hasMany(Blog, {
  foreignKey: 'user_id',
  //Delete Blog posts associated to User when User is deleted
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

//User and Comment relationship
User.hasMany(Comment, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'author_id',
});

// Blog and Comment relationship
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

module.exports = { Blog, User, Comment };
