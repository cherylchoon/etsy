var mongoose = require('mongoose');

var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Shop = mongoose.model('Shop');


module.exports.update = function(req, res){
  var total = 0
  console.log(req.body,"this is the req portion")
  Cart.findOne({ "_product": req.body.product, "_user": req.body.user}, function(err, cart){
    if(err){
      var cart = new Cart({
        _user: req.body.user,
        _product: req.body.product,
        quantity: req.body.quantity
      })
      cart.save(function(err){
        if(err){
          console.log(err)
        }else{
          res.json({
            cart: cart
          })
          console.log("You have a new cart too!", cart)
        }
      })
    }else{
      if(!cart){
        var cart = new Cart({
          _user: req.body.user,
          _product: req.body.product,
          quantity: req.body.quantity
        })
        cart.save(function(err){
          if(err){
            console.log(err)
          }else{
            res.json({
              cart: cart
            })
            console.log("You have a new cart too!", cart)
          }
        })
      }else{
        console.log(cart, "<<<That is the full cart")
        if(cart.quantity){
          total = cart.quantity + req.body.quantity
        }else{
          total = req.body.quantity
        }
        cart._user = req.body.user
        cart._product = req.body.product
        cart.quantity= total
        cart.save(function(err){
          if(err){
            console.log(err)
          }else{
            res.json({
              cart: cart
            })
            console.log("You have a new cart too!", cart)
          }
        })
      }
    }
  })
}
module.exports.edit = function(req,res){
  //your code here
  Cart.findOne({_id: req.params.cart_id}, function(err, cart){
    if(err){
      console.log(err);
    }else{
      cart._user = req.body.user;
      cart._product = req.body.product;
      cart.quantity = req.body.quantity;
      cart.save(function(err, updatedCart){
        if (err){
          console.log(err);
        }else{
          res.json(updatedCart);
        }
      })
    }
  })
};
module.exports.show =function(req, res){
  Cart.find({_user: req.params.user_id}).populate('_user').populate({path: '_product', model: 'Product', populate: { path: '_shop', model: 'Shop'}}).exec( function(err, carts){
    if(err){
      res.json({err:err})
      console.log("Error being shown", err)
    }else{
      console.log(carts);
      res.json({carts:carts})
      console.log("Cart being shown:", carts)
    }
  })
}

module.exports.destroy =function(req, res){
  Cart.remove({_id: req.params.cart_id}, function(err, result){
    if(err){
      res.json({err:err})
      console.log("Error being shown", err)
    }else{
      console.log("Result being shown:", result)
    }
  })
}

module.exports.emptycart = function(req, res){
  Cart.deleteMany({ "_user": req.params.user_id }, function(err, result){
    if (err){
      res.json({err:err})
    } else{
      res.json({result:result})
    }
  } )
}
