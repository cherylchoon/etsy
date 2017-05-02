var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _author: {
        type: String,
        ref: 'User',
        required: true
    },
    rating:{
      type: Number,
      required: [true, 'Please enter a rating.']
    },
    content: {
        type: String,
        required: [true, "Review field cannot be empty."],
        minlength: [10, "Review has to be at least 10 characters."],
        maxlength: 5000,
    },
    _product: {
        type: String,
        ref: 'Product',
        required: true,
    },

    }, {timestamps: true}
);

mongoose.model('Review', reviewSchema);
