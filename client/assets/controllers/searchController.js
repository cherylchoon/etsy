app.controller('searchController', ['$scope', '$location', '$cookies', '$routeParams', 'searchFactory','messageFactory', function($scope, $location, $cookies, $routeParams, searchFactory, messageFactory){
  
  var id = $cookies.get("loggeduserid");
  var inboxrequest = {
        me: id
    }
  
  $scope.logout = function(){
    $cookies.remove("loggeduserid")
    $cookies.remove("loggedusername")
    $cookies.remove("loggeduserlast")
    $cookies.remove("loggeduseremail")
    $location.url("/login")
  }

  $scope.shopResults = [];
  // $scope.productResults = [];

  searchFactory.search($routeParams.searchParams, function(data){
    console.log("SEARCH RESULTS DATA")
    console.log(data);
    $scope.shopResults = data.shops;
    $scope.productResults = data.products;
  });

   messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })

  console.log("ROUTE", $routeParams);
  // console.log("RESULT----", $scope.shopResults)
}])
