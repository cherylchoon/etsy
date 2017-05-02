var mongoose = require('mongoose');

var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports.create = function(req, res){
  // console.log("this is request body----", req.body);
  var order = new Order({
    _user: req.body.user,
    _products: req.body.allItems,
    total: req.body.total,
    address: req.body.address,
    zipcode: req.body.zipcode,
    state: req.body.state,
    paid: true
  })
  order.save(function(err, order){
    if (err){
      res.json({err:err})
    } else{
      res.json({order:order})
    }
  });
}

module.exports.updateinventory = function(req, res){
  console.log("updating inventory", req.body);
  for(var i=0; i<req.body.length; i++){
    Product.findOneAndUpdate(
      { "_id": req.body[i].id },
      { $inc: { "quantity": -(req.body[i].quantity) } },
      function(err, result){
        if (err){
          console.log("updating inventory error", err)

        } else{
          console.log("updated inventory!")
        }
      }
    )
  }
}
