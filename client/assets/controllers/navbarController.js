app.controller("navbarController", function($scope, $location, userFactory, shopFactory, messageFactory, $cookies, $routeParams){
     
     var id = $cookies.get("loggeduserid");
     var inboxrequest = {
        me: id
    }

    $scope.search = function(){
      $location.url('/search/' + $scope.searchParams)
    }

    messageFactory.getMyMessages(inboxrequest, function(){
        $scope.inbox = messageFactory.inbox;
    })  

    $scope.logout = function(){
      $cookies.remove("loggeduserid")
      $cookies.remove("loggedusername")
      $cookies.remove("loggeduserlast")
      $cookies.remove("loggeduseremail")
      $scope.unread.count = 0;
      $location.url("/login")
    }

    messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })
})