const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach( async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.InitialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(helper.InitialBlogs[1])
  await  blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
  
test('the number of blogs returned is correct', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length)
})

test('the identifier of a blog is named id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].id).toBeDefined()
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

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length + 1)
  expect(titles).toContain('FFXIV is great')
})

test('if like undefined, default value is 1', async () => {
  const newBlog = {
    title: 'FFXIV is great',
    author: 'Helena Li',
    url: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(0)
})

test('if missing title or url, error 400', async () => {
  const newBlog = {
    author: 'Helena Li',
    url: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})