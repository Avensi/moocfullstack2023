const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

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
  },
]

beforeEach( async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(InitialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(InitialBlogs[1])
  await  blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
  
test('the number of blogs returned is correct', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(InitialBlogs.length)
})

test('the identifier of a blog is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be posted', async () => {
  const newBlog = {
    title: 'FFXIV is great',
    author: 'Helena Li',
    url: '',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(InitialBlogs.length + 1)
  expect(titles).toContain('FFXIV is great')
})

afterAll(async () => {
  await mongoose.connection.close()
})
