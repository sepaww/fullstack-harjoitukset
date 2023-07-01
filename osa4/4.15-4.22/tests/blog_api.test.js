const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialblogs= require('../utils/blogs')
const blogs = initialblogs.blogs
blogsInDB = initialblogs.blogsInDB
const Blog = require('../models/blog')
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
  })
console.log("added")
//console.log(blogsInDb())
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are right amount', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialblogs.blogs.length)
  })
  
test('id exists', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body
    //console.log(contents)
    contents.forEach((blog) => {
        expect(blog.id).toBeDefined()
      })
  })



  test('a blog with likes can be added ', async () => {
    const newBlog = {
        title: 'ahah',
        author: 'jee mies',
        url: 'wewewe',
        likes: 10
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialblogs.blogs.length + 1)
    
    
  })

  test('a blog without likes can be added', async () => {
    await Blog.deleteMany({})
    const newBlog = {
        title: 'ahah',
        author: 'jee mies',
        url: 'wewewe',
        
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].likes).toBe(0)
  })

  test('a blog without title/url cant be added', async () => {
    
    const newBlog = {
        author: 'jee mies',
        title: 'juu juu'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const newBlog2 = {
        author: 'jee mies',
        url: 'wewewe'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  
    
  })

  test('a blog can be deleted', async () => {

    const blogsbefore = await initialblogs.blogsInDb()
    const tobedel = blogsbefore[0]
    await api
      .delete(`/api/blogs/${tobedel.id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialblogs.blogs.length - 1)
  })

  test('a blog can be updated', async () => {
    
    const blogsbefore = await initialblogs.blogsInDb()
    console.log(blogsbefore[0])
    const tobedel = blogsbefore[0]

    const newBlog = {
        title: 'ahah',
        author: 'jee mies',
        url: 'wewewe',
        likes: 10
        
    }
  
    await api
      .put(`/api/blogs/${tobedel.id}`)
      .send(newBlog)
      .expect(202)
  
  })

afterAll(async () => {
  await mongoose.connection.close()
})
//npm test -- tests/blog_api.test.js