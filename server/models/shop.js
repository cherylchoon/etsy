var mongoose = require('mongoose');
var productSchema = require("./product.js")

var shopSchema = mongoose.Schema({
    name: {
      type:String,
      required: [true, "Please enter a shop name."],
      unique: [true, "Sorry shop name has already been taken."],
      maxlength: [15, "Shop name cannot be greater than 15 characters."]
    },
    _shop_owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a shop description.'],
        minlength: [20, 'Please say more about your shop.'],
        maxlength: [500, 'Try to keep it short.'],
    },
    _products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    shoppic: {
        contentType: String,
    }
});

mongoose.model('Shop', shopSchema);
