var mongoose = require('mongoose');
var Favorite = mongoose.model('Favorite');

module.exports.create = function(req, res){
  var favorite = new Favorite({
    _user: req.body.user,
    _product: req.body.product
  });
  favorite.save(function(err, product){
    if (err){
      res.json({err:err})
    } else{
      res.json({favorite:favorite})
    }
  })

}
module.exports.destroy =function(req, res){
  console.log(req, "THIS IS THE PARAMS BEING PASSED")
  Favorite.remove({_id: req.params.favorite_id}, function(err, result){
    if(err){
      res.json({err:err})
      console.log("Favorite delete Error being shown", err)
    }else{
      console.log("Favorite delete Result being shown:", result)
    }
  })
}
module.exports.show = function(req,res){
  console.log(req.body, "This is the data getting to the backend controller")
  Favorite.findOne({_user: req.body.user, _product: req.body.product}, function(err, result){
    console.log(result, "***********")
    res.json(result);
  })
};

module.exports.showAll =function(req, res){
  Favorite.find({_user: req.params.user_id}).populate('_user').populate({path: '_product', model: 'Product', populate: { path: '_shop', model: 'Shop'}}).exec( function(err, favorites){
    if(err){
      res.json({err:err})
      console.log("Error being shown", err)
    }else{
      res.json({favorites:favorites})
      console.log("Favorites being shown:", favorites)
    }
  })
}
