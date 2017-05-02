app.controller('favoriteController', ['$scope', '$location', '$routeParams', '$cookies', 'productFactory', 'userFactory', 'Upload', 'messageFactory', function($scope, $location, $routeParams, $cookies, productFactory, userFactory, Upload, messageFactory){
  $scope.user = $cookies.get('loggedusername');
  $scope.user_id = $cookies.get('loggeduserid');
  $scope.favorites ={}

  var id = $cookies.get("loggeduserid");
  var inboxrequest = {
        me: id
    }

  console.log($scope.user_id)
  var showFavorites = function(){
    productFactory.showFavorites($scope.user_id, function(returnedData){
      console.log(productFactory.favorites)
      $scope.favorites = productFactory.favorites
    })
  }
  showFavorites()

  $scope.deleteFavorite = function(favorite){
    console.log(favorite)
    productFactory.deleteFavorite(favorite, function(data){
      if(data.data.err){
        console.log(data.data.err)
      }else{
        console.log("This worked, here is the cart data", data)
      }

    })
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
