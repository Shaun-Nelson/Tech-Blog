const faker = require('faker');

function seed() {
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
  return blogs;
}

module.exports = seed;
