const listHelper = require('../utils/list_helper')
const alblogs = require('../utils/blogs')
test('find favorite', () => {
const blogs = alblogs.blogs
  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual(
    { 
   __v: 0,
   _id: "5a422b3a1b54a676234d17f9",
  author: "Edsger W. Dijkstra",
 likes: 12,
  title: "Canonical string reduction",
  
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    })
})