var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    _user: {
        type: String,
        ref: "User"
    },
    _product: {
      type: String,
      ref: "Product",
    },
    quantity:{
      type: Number,
      required: true
    }
  }
);

mongoose.model('Cart', cartSchema);
