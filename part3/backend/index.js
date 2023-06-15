const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/person")
const app = express()

require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
    if(request.method != "POST"){
        return null
    } 
    return JSON.stringify(request.body)
})


let persons = [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
]


app.get('/info', (request, response) => {
    const date = new Date().toString()
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
      })
    
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const idReq =request.params.id
    Person.findById(idReq).then(person => {
        response.json(person)
    })
   
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name){
        return response.status(400).json({
            error : "name missing"
        })
    }

    else if (!body.number){
        return response.status(400).json({
            error : "number missing"
        })
    }

    else if (persons.filter(person => person.name === body.name).length > 0){
        return response.status(400).json({
            error : "name must be unique"
        })
    }
    
    const person = new Person({
        name : body.name,
        number : body.number,
    })

   person.save().then(savedPerson => {
    response.json(savedPerson)
   })

})

const generateId = (range) => {
    return Math.floor(Math.random() * range)
}
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})