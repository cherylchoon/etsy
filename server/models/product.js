var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    price:{
      type: Number,
      minlength: 1,
      required: true,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 256,
        required: [true, "Please fill in product name."]
    },
    quantity:{
      type: Number,
      required: true,
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 5000,
        required: [true, "Please fill in product description."]
    },
    img: {
        type: [String],
        validate: [arrayLimit, 'Product Images exceeds the limit of 12']
    }
  }, {timestamps: true}
);

function arrayLimit(val) {
  return val.length <= 12;
}

mongoose.model('Product', productSchema);
