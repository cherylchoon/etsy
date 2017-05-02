app.controller("settingsController", function($scope, $location, userFactory, $cookies, $route, $window, Upload){

    var logincookie = $cookies.get("loggeduserid")
    var firstname = $cookies.get('loggedusername')
    var lastname = $cookies.get('loggeduserlast')
    var email = $cookies.get('loggeduseremail')
    var profilepic = $cookies.get('loggeduserpic')

    var id = $cookies.get("loggeduserid");
    var inboxrequest = {
            me: id
        }

if(logincookie){
    $scope.fileSelected = function(files) {
        if (files && files.length) {
            $scope.file = files[0];
        }
    }

    userFactory.getUser(logincookie, function(userdata){
            $scope.userinfo = userdata.data.user;
            console.log($scope.userinfo);
    })


    $scope.updatedInfo = {
        first_name: firstname,
        last_name: lastname,
        email: email
    }

    $scope.updateUser = function(){
        var userData = $scope.updatedInfo;
        userData._id = logincookie;
        userFactory.updateInfo(userData, function(){
            $cookies.remove("loggedusername")
            $cookies.remove("loggeduserlast")
            $cookies.remove("loggeduseremail")
            $cookies.put('loggedusername', $scope.updatedInfo.first_name)
            $cookies.put('loggeduserlast', $scope.updatedInfo.last_name)
            $cookies.put('loggeduseremail', $scope.updatedInfo.email)
            $location.url('/')
        })
    }
    
    $scope.uploadFile = function(){
            Upload.upload({
                url: '/api/upload',
                data:{ 
                    id: logincookie,
                    file: $scope.file
                }
            })
            .then(function(data) {
                $cookies.remove('loggeduserpic')
                console.log(data, 'uploaded');
                $window.location.reload();
            }).catch(function(err){
                console.error(err)
            });
        };

    $scope.logout = function(){
      $cookies.remove("loggeduserid")
      $cookies.remove("loggedusername")
      $cookies.remove("loggeduserlast")
      $cookies.remove("loggeduseremail")

      $location.url("/login")

    }

  } else {
    $location.url("/login")
  }
});
