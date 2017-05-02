var mongoose = require('mongoose');
var fs = require('fs');

var Product = mongoose.model('Product');
var Shop = mongoose.model('Shop');

module.exports.index = function(req, res){
  Shop.findOne({name: req.params.shop_name}, function(err, shop){
    if (err){
      res.json({err:err})
    } else{
      Product.find({_shop: shop}, function(err, products){
        if (err){
          res.json({err:err})
        } else{
          res.json({products:products})
        }
      })
    }
  })
}

module.exports.allitems = function(req,res){
  Product.find({}).populate('_shop').exec(function(err, products){
    if (err){
      console.log(err)
    }
    else{
      console.log(products)
      res.json({products})
    }
  })
}

module.exports.create = function(req, res){
  Shop.findOne({name: req.body.shop_name}, function(err, shop){
    if (err){
      res.json({err:err})
    } else{
      var product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        _shop: shop
      });
      product.save(function(err, product){
        if (err){
          res.json({
            err:err
          })
        } else{

          var product_id = product.id
          Shop.findByIdAndUpdate(
            shop._id,
            {$push:
              {"_products": product_id
            }},
            {safe: true, upsert: true},
            function(err, model){
              console.log(err);
            }
          )
          res.json({product:product})
        }
      })
    }
  })
}
module.exports.addphotos = function(req, res){
  var files = req.files;
  var prodID = req.body.id
  for(var i = 0; i < files.length; i++){
    var ext = files[i].originalname.split(".");
    ext = ext[ext.length-1];
    fs.rename(files[i].path, files[i].path+"."+ext, function(err){
      console.log(err)
    })
    console.log(files[i].filename+'.'+ext);
    Product.findByIdAndUpdate(prodID, { $push: {
      'img': files[i].filename+'.'+ext
    }}, function(err, product){
      if (err){
        console.log(err);
        res.json({err:err});
      }
      else{
        console.log(product);
        res.json({product: product});
      }
    })
    }
}

module.exports.show = function(req, res){
  Product.findOne({_id: req.params.id}).populate('_shop').exec(function(err, product){
    console.log(err);
    res.json({product:product});
  }) ;
}

module.exports.search = function(req, res){
  Product.find(
    {"name": {"$regex": req.params.searchParams} },
    function(err, products){
      if (err){
        res.json({err:err})
      } else{
        res.json({products:products})
      }
    }
  )
}

module.exports.getproduct = function(req, res){
  console.log(req.body)
  Product.findOne({ _id: req.params.prodid }).populate('_shop').exec(function(err, product){
    res.json({
      product:product
    })
  })
}
