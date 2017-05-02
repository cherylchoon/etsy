app.factory('searchFactory', ['$http', function($http){
  factory = {};

  factory.search = function(searchParams, callback){
    $http.get('/search/' + searchParams).then(function(returned_data){
      console.log("FACTORY SIDE", returned_data.data);
      callback(returned_data.data);
    })
  }
  return factory;
}])
