app.controller("loginController", function($scope, $location, userFactory, messageFactory, $cookies){

  $scope.register = function() {
    if ($scope.registerUser.password==$scope.registerUser.confirm){

      userData = $scope.registerUser;

      userFactory.register(userData, function(){
        if (userFactory.user){

          //set cookies for use across the site
          $cookies.put('loggeduserid', userFactory.user.id);
          $cookies.put('loggedusername', userFactory.user.first_name);
          $cookies.put('loggeduserlast', userFactory.user.last_name);
          $cookies.put('loggeduseremail', userFactory.user.email);

          $location.url('/')
        }
        else {
          $scope.errors = userFactory.errors;
        }
      })
    }
  }

  $scope.login = function() {
    userFactory.login($scope.logindata, function(){
      if (userFactory.user){
        
        var id = userFactory.user.user._id;
        console.log(id);
        //set cookies for use across the site
        $cookies.put('loggeduserid', userFactory.user.user._id);
        $cookies.put('loggedusername', userFactory.user.user.first_name);
        $cookies.put('loggeduserlast', userFactory.user.user.last_name);
        $cookies.put('loggeduseremail', userFactory.user.user.email);
        $cookies.put('loggeduserpic', userFactory.user.user.profilepic);

        var inboxrequest = {
          me: id
        }

        messageFactory.getUnread(inboxrequest, function(){
          console.log("LOGGED IN and UPDATED UNREAD IN FACTORY");
          console.log(messageFactory.unread);
        }) 

        $location.url('/')
      }
      else {
        $scope.errors = userFactory.errors;
      }
    })
  }

  //add login function
})
