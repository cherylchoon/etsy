app.factory('productFactory', ['$http', function($http){
  factory = {};

  factory.create = function(product, callback){
    $http.post('/products', product).then(function(returned_data){
      console.log("NEW PRODUCT DATA MAYBE")
      console.log(returned_data.data);
      callback(returned_data.data);
    })
  };

  factory.show = function(shopName, productId, callback){
    $http.get(shopName+ "/products/" + productId).then(function(returned_data){

        var product = returned_data.data;
        callback(product);
      })
  };

  factory.allProducts = function(callback){
    $http.get('/api/allproducts').then(function(products){
      console.log(products);
      callback(products);
    })
  }

  factory.getProduct = function(productId, callback){
    $http.get("/product/" + productId).then(function(returned_data){
      var product = returned_data.data;
        callback(product);
      })
  };

  factory.createReview = function(review, callback){
    $http.post('/reviews', review).then(function(returned_data){
      callback(returned_data.data);
    })
  };

  factory.getReviews = function(callback){
    $http.get('/api/allreviews').then(function(reviews){
      console.log(reviews)
      callback(reviews.data);
    })
  }

  factory.reviewIndex = function(data, callback){
      $http.get("/reviews/"+ data +"/product").then(callback);
  }
  factory.updateCart = function(item, finsihedUpdatingCart){
    console.log("cart data", item)
    $http.post('/carts', item).then(function(response){
      if(response.data.errors){
        factory.errors.push(response.data.errors)
      }else{
        console.log("This is our cart factory response:", response)
      }

      finsihedUpdatingCart(response);
    })
  }
  factory.editCart = function(item, finsihedUpdatingCart){
    console.log("cart data", item._id)
    console.log("cart data", item)
    $http.put('/carts/' + item._id, {
      user: item._user._id,
      product: item._product._id,
      quantity: item.quantity
    }).then(function(response){
      if(response.data.errors){
        console.log(response.data.errors)
      }else{
        console.log("This is our cart factory response:", response)
      }

      finsihedUpdatingCart(response);
    })
  }
  factory.showCart = function(user, callback){
    $http.get("/carts/" + user).then(function(returned_data){
      console.log("The USER cart data we got back is:", returned_data);
      factory.carts = returned_data.data.carts
      callback(returned_data)
    })
  };
  factory.deleteCart = function(product, callback){
    $http.delete("/carts/" + product._id).then(function(returned_data){
      console.log("The DELETED cart data we got back is:", returned_data);
      callback(returned_data)
    })
  };

  factory.createFavorite= function(favorite, callback){
    console.log("THIS IS FACTORY FAVORITE DATA", favorite)
    $http.post('/favorites', favorite).then(function(returned_data){
      callback(returned_data);
    })
  };

  factory.deleteFavorite = function(favorite, callback){
    console.log(favorite)
    $http.delete("/favorites/" + favorite).then(function(returned_data){
      console.log("The DELETED cart data we got back is:", returned_data);
      callback(returned_data)
    })
  };
  factory.checkFavorite = function(data, callback){
    console.log(data, "This stuff got to the factory")
      $http.put('/favorites', data).then(function(returned_data){
        console.log(returned_data, "This is the factory favorite data")
        callback(returned_data)
      });
  }
  factory.showFavorites = function(user, callback){
    $http.get("/favorites/" + user).then(function(returned_data){
      console.log("The USER cart data we got back is:", returned_data);
      factory.favorites = returned_data.data.favorites
      callback(returned_data)
    })
  };
  factory.emptyCart = function(user, callback){
    $http.get("/emptycart/" + user).then(function(returned_data){
      callback(returned_data.data);
    })
  }
  return factory;
}])
