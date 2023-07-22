const userRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')


userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)

})

userRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  if(!username || !password){
    return response.status(400).json({error : "username and password are required"})
  }

  else if (username.length < 3 || password.length < 3){
    return response.status(400).json({error : "username and password should be at least 3 characters long"})
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  
})

module.exports = userRouter