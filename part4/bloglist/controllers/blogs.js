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

module.exports = blogRouter