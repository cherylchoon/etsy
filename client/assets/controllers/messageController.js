app.controller('messageController', function($scope, $location, $routeParams, $cookies, userFactory, messageFactory, Upload){
    
    var sender = $cookies.get("loggeduserid");
    var username = $cookies.get("loggedusername");

    var recipient = $routeParams.userID
    var inboxrequest = {
        me: sender
    }

    $scope.inbox;

    $scope.myid = sender;

    messageFactory.getMyMessages(inboxrequest, function(){
        $scope.inbox = messageFactory.inbox;
    })  


    messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
            console.log("THIS IS AFTER LOGGING IN")
            console.log($scope.unread);
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })
});