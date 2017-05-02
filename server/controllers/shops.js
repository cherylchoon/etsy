var mongoose = require('mongoose');
var fs = require('fs');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Shop = mongoose.model('Shop');

module.exports.index = function(req, res){
  Shop.find({}, function(err, shops){
    if (err){
      res.json({err:err})
    } else{
      res.json({shops:shops})
    }
  })
}

module.exports.create = function(req, res){
  User.findOne({_id: req.body.user_id}, function(err, user){
    if (err){
      res.json({err:err})
    } else{
      var shop = new Shop({
        name: req.body.name,
        _shop_owner: user,
        description: req.body.description,
      })
      shop.save(function(err, shop){
        if (err){
          console.log(err)
          res.json({err:err})
        } else{
          res.json({shop:shop})
        }
      })
    }
  })
}

module.exports.show = function(req, res){
  Shop.findOne({name: req.params.shop_name}).populate('_shop_owner').exec(function(err, shop){
    if (err){
      res.json({err:err})
    } else{
      res.json({shop:shop})
    }
  })
}

module.exports.search = function(req, res){
  Shop.find(
    {"name": {"$regex": req.params.searchParams } },
    function(err, shops){
      if (err){
        res.json({err:err})
      } else{
        Product.find(
          {$or: [
            {"name": {"$regex": req.params.searchParams, "$options": "i" } },
            {"description": {"$regex": req.params.searchParams, "$options": "i" } }
          ]}).populate('_shop').exec(function(err, products){
            if (err){
              res.json({err:err})
            } else{
              console.log("PRODUCTS", products)
              res.json({
                shops:shops,
                products:products
              })
            }
          }
        )
      }
    }
  )
}

module.exports.uploadphoto = function(request, response){
  var file = request.file;
  var ext = file.originalname.split(".");
  ext = ext[ext.length-1];
  fs.rename(file.path, file.path+"."+ext, function(err){
    if (err){
      response.json({err:err});
    } else {
      Shop.update({_id: request.body.id}, {$set: { shoppic: file.filename+"."+ext }}, function(err, shop){
        if (err){
      response.json({err:err});
        }
        else{
      response.json({shop: shop});
        }
      });
    }
  })
}
