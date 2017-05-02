app.factory("userFactory", function($http) {
  var factory={};
  factory.user=null;
  factory.errors=[];

  factory.register = function(user, finishedAddingUser){
    $http.post('/api/users', user).then(function(response) {
      if (response.data.errors){

        factory.errors.push(response.data.errors)
      }
      else {
        factory.user= {
          id: response.data.user._id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email
        }
        factory.cart = response.data.cart

      }
    finishedAddingUser();
    })
  }

  factory.login = function(user, finishedLoggingUser) {
    $http.post('/api/login', user).then(function(response){
      console.log("FACTORY LOGIN RESPONSE")
      console.log(response.data);

      if(response.data.errors){
        factory.errors.push(response.data.errors)
      }
      else {
        factory.user={
          user:response.data.user,

        }
        factory.cart= response.data.cart
      }
      finishedLoggingUser();
    })
  }

  factory.updateInfo = function(user, finsihedUpdatingUser){
    $http.post('/api/user', user).then(function(response){
      if (response.data.errors){
        factory.errors.push(response.data.errors)
      }
      else{
        factory.user={
          user: response.data.user
        }
      }
      finsihedUpdatingUser();
    })
  }

  factory.getUser = function(user, finishedGettingUser){
    console.log("FACTORY FXN");
    console.log(user);
    $http.get('/api/user/' + user).then(function(userData){
      console.log("User data response in factory")
      console.log(userData.data.user);
      finishedGettingUser(userData);
    })
  }

  return factory;
})
