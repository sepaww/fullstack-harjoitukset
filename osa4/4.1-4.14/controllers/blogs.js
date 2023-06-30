const notesRouter = require('express').Router()
const Blog = require('../models/blog')



notesRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })
  
notesRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

  notesRouter.put('/:id', async (request, response) => {

    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(202).json(blog)
      
      
  })
  

notesRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })
 
module.exports = notesRouter