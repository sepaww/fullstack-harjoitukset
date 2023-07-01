const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//const { tokenExtractor } = require('../utils/middleware')

//const getTokenFrom = request => {
//  const authorization = request.get('authorization')
//  if (authorization && authorization.startsWith('Bearer ')) {
//    return authorization.replace('Bearer ', '')
//  }
//  return null
//}

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
     
    response.json(blogs)
      
      
  })
  
notesRouter.post('/', async (request, response) => {
    const body = request.body
    if (request.user === null){
      return response.status(400).json({error: "token invalid"})
    }

    //const user = await User.findById(body.user)
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    

    await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(blog)
     
   
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
  console.log(request.token, request.user)
    const tobedel = await Blog.findById(request.params.id)
    if (tobedel === null){
      return response.status(404)
    }
    const user_id = tobedel.user.toString()
    if (user_id !== request.user.id.toString()){
      console.log("diff in user id", user_id, request.id)
      return response.status(400).json({error:"only creator can delete"})
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })
 
module.exports = notesRouter