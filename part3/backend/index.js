const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/person")
const app = express()

require("dotenv").config()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
    if(request.method != "POST"){
        return null
    } 
    return JSON.stringify(request.body)
})



app.get('/info', (request, response) => {
    const date = new Date().toString()
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
      })
    
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const idReq =request.params.id
    Person.findById(idReq).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
    
   
})

app.delete('/api/persons/:id', (request, response) => {
    const idReq = request.params.id
    Person.findByIdAndDelete(idReq).then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
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
   .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const idReq = request.params.id

    const person = {
        name : body.name,
        number : body.number
    }
    
    Person.findByIdAndUpdate(idReq, person, {new : true})
        .then(updatedPerson => {response.json(updatedPerson)})
        .catch(error => next(error))
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.name)
    if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})