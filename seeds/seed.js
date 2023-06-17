const faker = require('faker');
const sequelize = require('../config/connection');
const { Blog, User } = require('../models');
const userData = require('./userData.json');

console.log(userData);

const seed = async () => {
  try {
    //Drop existing tables
    await sequelize.sync({ force: true });

    //Populate an array of 10 blogs using the 'faker' package
    const blogs = [];

    for (let i = 0; i < 10; i++) {
      const blog = {
        id: i + 1,
        title: faker.lorem.sentence(),
        contents: faker.lorem.paragraphs(),
        username: faker.internet.userName(),
        date_created: faker.date.past(),
      };
      blogs.push(blog);
    }

    await User.bulkCreate(userData, { individualHooks: true });

    await Blog.bulkCreate(blogs);
  } catch (error) {
    console.error(error);
  }
};

seed();

module.exports = seed;
