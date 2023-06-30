const listHelper = require('../utils/list_helper')
const alblogs = require('../utils/blogs')

test('dummy returns one', () => {
    const blogs = alblogs.blogs

  const result = listHelper.mostLikes(blogs)
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    likes: 17
  })
})