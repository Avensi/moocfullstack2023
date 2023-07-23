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
  const login = await api.post('/api/login').send(helper.testUser)
  const newBlog = {
    title: 'FFXIV is great',
    author: 'Helena Li',
    url: '',
    likes: 1,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  
  expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length + 1)
  expect(titles).toContain('FFXIV is great')
})


test('if like undefined, default value is 1', async () => {
  const login = await api.post('/api/login').send(helper.testUser)
  const newBlog = {
    title: 'FFXIV is great',
    author: 'Helena Li',
    url: '',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(0)
})

test('if missing title or url, error 400', async () => {
  const login = await api.post('/api/login').send(helper.testUser)
  const newBlog = {
    author: 'Helena Li',
    url: '',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(newBlog)
    .expect(400)
})

test('delete a blog', async () => {
  const login = await api.post('/api/login').send(helper.testUser)
  
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(204)

  const blogAtEnd = await helper.blogsInDb()
  const titles = blogAtEnd.map(b => b.title)

  expect(blogAtEnd).toHaveLength(blogAtStart.length - 1)
  expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog', async () => {
  const blogAtStart = await helper.blogsInDb()
  const idToUpdate = blogAtStart[0].id
  const newBlog = {
    id : blogAtStart[0].id,
    title: 'FFXIV is great',
    author: 'Helena Li',
    url: '',
    likes : 1,
    user : '64bc2e802521bc2c3fe61e50'
  }

  await api
    .put(`/api/blogs/${idToUpdate}`)
    .send(newBlog)
    .expect(200)

  const blogAtEnd = await helper.blogsInDb()
  const titles = blogAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)
  expect(blogAtEnd).toHaveLength(blogAtStart.length )

})

afterAll(async () => {
  await mongoose.connection.close()
})