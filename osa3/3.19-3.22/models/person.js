const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url =/* eslint-disable-line no-undef */ process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    validate: {
      validator: function(value) {
        return value.length>3
      },
      message: 'Name validation failed'
    }
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(value) {
        return /^(\d{2}|\d{3})-\d+$/.test(value)
      },
      message: 'Number validation failed'
    }
  },
  //id: Number,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)