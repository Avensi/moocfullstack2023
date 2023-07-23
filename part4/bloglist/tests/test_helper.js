const Blog = require('../models/blog')
const User = require('../models/user')

const InitialBlogs = [
  {
    title: 'Life sucks',
    author: 'Helena Li',
    url: '',
    likes: 1,
    user : '64bc2e802521bc2c3fe61e50'
  },
  {
    title: 'Life is good',
    author: 'Helena Li',
    url: '',
    likes: 2,
    user : '64bc2e802521bc2c3fe61e50'
  }
]

const testUser = {
  username : 'heli',
  password : 'azerty'
}


const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  InitialBlogs, blogsInDb, usersInDb, testUser
}

