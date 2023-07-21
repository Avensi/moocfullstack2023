const userRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

userRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  
})

module.exports = userRouter