require('dotenv').config('.env')

const MONGODB_URI = process.env.MONGODB_URI
const PORT = 3003

module.exports = {
  MONGODB_URI, 
  PORT
}