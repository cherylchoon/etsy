app.controller('conversationController', function($scope, $location, $routeParams, $cookies, userFactory, messageFactory, Upload){

    var sender = $cookies.get("loggeduserid");
    var username = $cookies.get("loggedusername");

    var recipient = $routeParams.userID
    var inboxrequest = {
        me: sender
    }

    $scope.inbox;

    $scope.myid = sender;

    var conversation = {};
    conversation.me = sender;
    conversation.you = recipient;

    messageFactory.getConversation(conversation, function(){
        $scope.myMessages = messageFactory.mymessages;
        console.log($scope.myMessages)
    });

       $scope.sendMessage = function(){
        var messagecontent = $scope.newMessage;
        messagecontent._sender = sender;
        messagecontent._recipient = recipient;
        messageFactory.sendMessage(messagecontent, function(messagedata){
            var newmessage = messagedata;
            newmessage.sendername = username;
            if (messagedata.err){
                $scope.errors = messagedata.error;
            }
            else{
                $scope.newMessage = {};
                $scope.myMessages = messageFactory.mymessages;
            }
        });
        messageFactory.getUnread(inboxrequest, function(){
                    var unreadcount = messageFactory.unread
                    $scope.unread = {count: unreadcount.length};
                })  

    }
    // Constantly checking for unread messages
    messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
    })  

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })

})