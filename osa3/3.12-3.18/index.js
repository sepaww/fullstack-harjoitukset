


const express = require('express')
const app = express()
const cors = require('cors')


require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
var morgan = require('morgan')

morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :req-body'));
//app.use(morgan('tiny'))


const Person = require('./models/person')






app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



app.get('/api/info', (req, res) => {
  
    const len = persons.length;
    const currDate = new Date().toUTCString();
    const ret=`Phonebook has info for ${len} and the current date is ${currDate}`
    res.json(ret)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = Person.find({id:id})

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  let randomNumber = 0
  min = 1
  max = 10000
  return randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body, "jee")
  if (!body.name) {
    return response.status(400).json({ 
      error: 'no name given' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'no num given' 
    })
  }
  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({ 
        error: 'already added' 
      })
    }
  })
  console.log("pls")
  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })
  console.log("opls2")
  person.save()
  console.log("saved")
  //Person.find({}).then(persons => {
  //  response.json(persons)
  //})
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log("put through")
  const body = request.body
  const id = Number(request.params.id)
  console.log(id)
  const person = {
    name: body.name,
    number: body.number,
    //id: id,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

