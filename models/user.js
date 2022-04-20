const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  requestLimit: {
      type: Number,
      required: true
  },
  apiKey: {
      type: String,
      required: true
  }
})

module.exports = mongoose.model('User', userSchema)