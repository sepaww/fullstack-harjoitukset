


const express = require('express')

const app = express()
app.use(express.json())
var morgan = require('morgan')
morgan.token('req-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :req-body'));
app.use(morgan('tiny'))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "ffff",
    "id": 5,
    "number": "34234234"
  },
  {
    "name": "jeee",
    "id": 6,
    "number": "234234"
  }
]



app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
  
    const len = persons.length;
    const currDate = new Date().toUTCString();
    const ret=`Phonebook has info for ${len} and the current date is ${currDate}`
    res.json(ret)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  let randomNumber = 0
  min = 1
  max = 10000
  return randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  //console.log(body, "jee")
  if (!body.name) {
    return response.status(400).json({ 
      error: 'no name given' 
    })
  }
  if (!body.num) {
    return response.status(400).json({ 
      error: 'no num given' 
    })
  }
  if (persons.some(person => person.name === body.name)){
    return response.status(400).json({ 
      error: 'already added' 
    })
  }
  const person = {
    name: body.name,
    number: body.num,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

