app.controller('productController', ['$scope', '$location', '$routeParams', '$cookies', 'productFactory', 'userFactory', 'Upload', 'messageFactory', '$window', function($scope, $location, $routeParams, $cookies, productFactory, userFactory, Upload, messageFactory, $window){
  $scope.user = $cookies.get('loggedusername');
  $scope.user_id = $cookies.get('loggeduserid');
  $scope.favorite = {}
  $scope.foundFavorite = null

  var id = $cookies.get("loggeduserid");
  var inboxrequest = {
        me: id
    }



  var reviewIndex = function(data){
    productFactory.reviewIndex(data, function(returnedData){
      $scope.productReviews = returnedData.data
      console.log($scope.productReviews, "Thes are the product reviews")
    })
  }
  var checkFavorite = function(){
    var checker = {
      user: $scope.user_id,
      product: $scope.currentProduct.product._id
    }
    console.log(checker)
    productFactory.checkFavorite(checker,function(returned_data){
      $scope.foundFavorite = returned_data.data
      console.log($scope.foundFavorite, "This is what was foundFav")
    })
  }

  if($routeParams.prodid){
    productFactory.getProduct($routeParams.prodid, function(productInfo){
      $scope.productinfo = productInfo;
    })
  }

  $scope.addProdPhotos = function(){
    var files = $scope.files
    if (files && files.length){
      for(var i = 0; i < files.length; i++){
        Upload.upload({
          url: '/products/photos',
          data: {
            id: $scope.productinfo.product._id,
            file: files[i]
          }
        })
    }}
    $location.url('/' + $scope.productinfo.product._shop.name + '/products/'+ $scope.productinfo.product._id)
  }

  $scope.create = function(files){
    if($scope.product){
      $scope.product.shop_name = $routeParams.shop_name
    }
    var productdata = $scope.product
    productdata.img = files

    console.log("UPLOAD PIC", productdata.img)

    productFactory.create(productdata, function(data){
      if(data.err){
        $scope.errors = data.err.errors
      } else{
        $location.url('/productphotos/' + data.product._id);
      }
    })
  }

if ($routeParams.shop_name && $routeParams.id){
    productFactory.show($routeParams.shop_name, $routeParams.id, function(factoryData){
      $scope.currentProduct = factoryData;
      checkFavorite();
      $scope.images = $scope.currentProduct.product.img
      $scope.availableQuantity = [];
      for (var i = 1; i <= $scope.currentProduct.product.quantity; i++) {
        $scope.availableQuantity.push(i);
      }
    });
    reviewIndex($routeParams.id)
  }
  $scope.review = {};
  $scope.createReview = function(){
    console.log($scope.review)
    if($scope.review.rating == null){
      $scope.reviewErrors = "Please enter a rating for the product."
    }

    $scope.review.product = $scope.currentProduct.product._id
    $scope.review.author = $scope.user_id
    console.log("hello!:", $scope.review)
    productFactory.createReview($scope.review, function(data){
      if(data.err){
        console.log(data.err)
        $scope.errors = data.err.errors
      } else{
        console.log(data.review)
      }
    })

  }
  $scope.createFavorite= function(){
    $scope.favorite.product = $scope.currentProduct.product._id
    $scope.favorite.user = $scope.user_id
    console.log("hello!:", $scope.favorite)
    productFactory.createFavorite($scope.favorite, function(data){
      if(data.err){
        console.log(data.err)
        $scope.errors = data.err.errors
      } else{
        console.log(data)
        $window.location.reload();
      }
    })

  }


  $scope.deleteFavorite = function(favorite){
    console.log(favorite)
    productFactory.deleteFavorite(favorite, function(data){
      if(data.data.err){
        console.log(data.data.err)
      }else{
        console.log("REMOVE FAV")
        console.log("This worked, here is the cart data", data)
        $window.location.reload();
      }

    })
  }


  $scope.item = {};
  $scope.addCart = function(){
    console.log($scope.item.quantity)
    if(!$scope.item.quantity){
      $scope.error = "Please enter a valid quantity."
    }else{
      $scope.item.user = $scope.user_id
      $scope.item.product = $scope.currentProduct.product._id
      productFactory.updateCart($scope.item, function(data){
        console.log(data,"this is the data")
        if(data.err){
          console.log(data.err)
        }else{
          console.log("This worked, here is the cart data", data)
        }

      })
        $location.url("/cart")
    }
  }

   messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
            console.log("THIS IS AFTER LOGGING IN")
            console.log($scope.unread);
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })

}])
