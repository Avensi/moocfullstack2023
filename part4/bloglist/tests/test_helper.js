const Blog = require('../models/blog')

const InitialBlogs = [
  {
    title: 'Life sucks',
    author: 'Helena Li',
    url: '',
    likes: 1,
    id: '649358ad388310db81d3a158'
  },
  {
    title: 'Life is good',
    author: 'Helena Li',
    url: '',
    likes: 2,
    id: '64935a310de6d2eff2d551e6'
  }
]

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  InitialBlogs, blogsInDb
}