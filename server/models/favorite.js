var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({
    _user: {
        type: String,
        ref: "User"
    },

    _product: {
      type: String,
      ref: "Product",
    }
  }
);



mongoose.model('Favorite', favoriteSchema);
