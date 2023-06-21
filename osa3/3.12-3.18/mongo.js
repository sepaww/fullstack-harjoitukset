const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} if (process.argv.length<4){
  
}

const password = process.argv[2]
let name = ""
let num = ""
if (process.argv.length>3){
  name =  process.argv[3]
  num =  process.argv[4]
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
if (process.argv.length==3) {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
person.save().then(result => {
  console.log(`added ${name} number ${num} to phonebook`)
  mongoose.connection.close()

})
}