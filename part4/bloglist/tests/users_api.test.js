const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

beforeEach( async () => {
  await User.deleteMany({})

  let passwordHash = await bcryptjs.hash('azerty', 10)
  let userObject = new User({username : 'heli', name : 'Helena Li', passwordHash})
  await userObject.save()

  passwordHash = await bcryptjs.hash('pokemon', 10)
  userObject = new User({username : 'jluo', name : 'Jodie Luo', passwordHash})
  await  userObject.save()
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('create new user', async () => {

  const userAtStart = await helper.usersInDb()
  const newUser = {
    username : 'mkara',
    name : 'Melis Kara',
    password : 'password'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const userAtEnd = await helper.usersInDb()
  expect(userAtEnd).toHaveLength(userAtStart.length + 1)

  const usernames = userAtEnd.map((user) => user.username)
  expect(usernames).toContain(newUser.username)
})
 

test('error creating when missing username or password', async () => {
  const userAtStart = await helper.usersInDb()

  const newUser = {
    username : 'mkara',
    name : 'Melis Kara',
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  
  expect(response.body.error).toContain('username and password are required')
  const userAtEnd = await helper.usersInDb()
  expect(userAtEnd).toHaveLength(userAtStart.length)

})
/** 
test('error creating when not sufficiently long username or password', async () => {
  const userAtStart = await helper.usersInDb()
  const newUser = {
    username : 'mk',
    name : 'Melis Kara',
    password : 'password'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)++
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(response.body.error).toContain('username and password should be at least 3 characters long')
  const userAtEnd = await helper.usersInDb()
  expect(userAtEnd).toHaveLength(userAtStart.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
*/
 