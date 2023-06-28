const mongoose = require('mongoose')

if (/* eslint-disable-line no-undef */process.argv.length<3) {
  console.log('give password as argument')
  /* eslint-disable-line no-undef */ process.exit(1)
}

const password = /* eslint-disable-line no-undef */process.argv[2]
let name = ''
let num = ''
if (/* eslint-disable-line no-undef */process.argv.length>3){
  name = /* eslint-disable-line no-undef */ process.argv[3]
  num = /* eslint-disable-line no-undef */ process.argv[4]
}
const url =
  `mongodb+srv://fullstack:${password}@cluster0.qhjrwpx.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  num: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  num: num,
})
if (/* eslint-disable-line no-undef */process.argv.length===3) {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(`added ${name} number ${num} to phonebook`)
    mongoose.connection.close()

  })
}