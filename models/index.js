const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
  foreignKey: 'id',
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { Blog, User };
