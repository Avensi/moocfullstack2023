const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username : 1, name : 1, id :1})
  response.json(blogs)

})
  
blogRouter.post('/',async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    author : request.body.author,
    title :request.body.title,
    url : request.body.url,
    likes : request.body.likes,
    user : user.id
  })

  if(blog.title ===  undefined || blog.url === undefined){
    response.status(400).end()
  }else {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    const resp = await Blog.findById(result._id).populate('user', {username : 1, name : 1, id :1})
    response.status(201).json(resp)
  }
  
})

blogRouter.delete('/:id', async(request, response) => {

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)

  if(request.user.id === blog.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({error : 'unauthorized access'})
  }
  
})

blogRouter.put('/:id', async(request, response) => {

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user : request.body.user
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, context: 'query'}).populate('user', {username : 1, name : 1, id :1})
  response.status(200).json(result)

})

module.exports = blogRouter