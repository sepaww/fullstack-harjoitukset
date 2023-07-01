const listHelper = require('../utils/list_helper')
const alblogs = require('../utils/blogs')

test('most blogs', () => {
  const blogs = alblogs.blogs

  const result = listHelper.mostBlogs(blogs)
  expect(result).toEqual({
    author: "Robert C. Martin",
    blogs: 3
  })
})