var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  fulfilled: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: [true, "Please enter a street address"]
  },
  zipcode: {
    type: String,
    maxlength: [5, "Please enter a valid ZIP code"],
    required: [true, "Please enter a ZIP code"]
  },
  state: {
    type: String,
    maxlength: [2, "State cannot be blank."],
    required: [true, "Please enter a state"]
  },
  _products: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
})

mongoose.model('Order', orderSchema)
