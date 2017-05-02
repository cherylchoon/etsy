var mongoose = require('mongoose');

var Review = mongoose.model('Review');
var User = mongoose.model('User');

module.exports.create = function(req, res){
  console.log(req.body);
  var review = new Review({
    _author: req.body.author,
    rating: req.body.rating,
    content: req.body.content,
    _product: req.body.product
  });

  review.save(function(err, product){
    if (err){
      res.json({err:err})
    } else{
      res.json({review:review})
    }
  })
}

module.exports.allreviews = function(req, res){
  Review.find({}).populate('_author').populate({path: '_product', model: 'Product', populate: { path: '_shop', model: 'Shop'}}).exec(function(err, reviews){
    if (err){
      res.json({err: err})
    }
    else{
      res.json({reviews})
    }
  })
}

module.exports.index = function(req, res){
  Review.find({_product: req.params.id}).populate("_author").exec(function(err, data) {
    console.log("***************", err)
    res.json(data);
  });

}
