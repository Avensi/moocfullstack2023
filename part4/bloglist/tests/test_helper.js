const Blog = require('../models/blog')
const User = require('../models/user')

const InitialBlogs = [
  {
    title: 'Life sucks',
    author: 'Helena Li',
    url: '',
    likes: 1,
  },
  {
    title: 'Life is good',
    author: 'Helena Li',
    url: '',
    likes: 2,
  }
]


const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  InitialBlogs, blogsInDb, usersInDb
}

