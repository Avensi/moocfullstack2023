const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})
  
blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(blog.title ===  undefined || blog.url === undefined){
    response.status(400).end()
  }else {
    const result = await blog.save()
    response.status(201).json(result)
  }
  
})

blogRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async(request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, context: 'query'})
  response.status(200).json(result)

})

module.exports = blogRouter