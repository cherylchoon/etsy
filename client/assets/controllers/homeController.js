app.controller("homeController", function($scope, $location, userFactory, shopFactory, messageFactory, productFactory, $cookies, $routeParams){
  var logincookie = $cookies.get("loggeduserid");

  if(logincookie){
    var id = $cookies.get("loggeduserid");
    var name = $cookies.get("loggedusername");

    var id = $cookies.get("loggeduserid");
     var inboxrequest = {
        me: id
    }
   
    $scope.user = { id:id, username:name }

    $scope.allShops = function(){
      shopFactory.index(function(data){
        $scope.shops = data.shops;
      });
    }
    $scope.allShops();

    productFactory.getReviews(function(data){
      $scope.reviews = data.reviews;
      console.log("REVIEW DATA")
      console.log(data.reviews);
    })

    productFactory.allProducts(function(data){
      $scope.products = data.data.products;
    })

    messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })

  } else {
    $location.url("/login")
  }
})
