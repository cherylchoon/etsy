app.controller('shopController', ['$routeParams', '$scope', '$location', '$cookies', 'shopFactory', 'Upload', '$window', function($routeParams, $scope, $location, $cookies, shopFactory, Upload, $window){
  $scope.user = $cookies.get('loggedusername');
  $scope.user_id = $cookies.get('loggeduserid');

  var id = $cookies.get("loggeduserid");
  var inboxrequest = {
        me: id
    }

  $scope.show = function(){
    shopFactory.show($routeParams.shop_name, function(data){
      if (data.err){
        console.log(err)
      } else{
        $scope.shop = data.shop;
        console.log("THIS IS THE SHOP DATA")
        console.log($scope.shop);
      }
    })
  }
  $scope.show();

  $scope.create = function(){
    if($scope.shop){
      $scope.shop.user_id = $scope.user_id;
    }
    shopFactory.create($scope.shop, function(data){
      if (data.err){
        if (data.err.errmsg){
          $scope.duplicate_error = "Sorry shop name has already been taken.";
        }
        $scope.errors = data.err.errors
      } else{
        console.log(data.shop.name);
        $location.url('/' + data.shop.name + '/create_listing');
      }
    })
  }

  $scope.uploadShopImg = function(){
    console.log("CLIENT SIDE SHOP INFO IN SCOPE")
      console.log($routeParams.shopID);
        Upload.upload({
            url: '/api/shopphoto',
            data:{ 
                id: $routeParams.shopID,
                file: $scope.file
            }
        })
        .then(function(data) {
          console.log('uploaded')
          console.log(data);
            $location.url('/')
        }).catch(function(err){
            console.error(err)
        });
    };

  $scope.allProducts = function(){
    shopFactory.allProducts($routeParams.shop_name, function(data){
      console.log("PRODUCT DATA", data)
      if (data.err){
        console.log(data.err)
      } else{
        $scope.products = data.products;
      }
    })
  }
  $scope.allProducts();
}])
