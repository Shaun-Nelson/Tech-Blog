const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
  foreignKey: 'id',
});

Blog.belongsTo(User, {
  foreignKey: 'id',
});

module.exports = { Blog, User };
