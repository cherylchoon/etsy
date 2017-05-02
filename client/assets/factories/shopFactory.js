app.factory('shopFactory', ['$http', function($http){
  factory = {};

  factory.index = function(callback){
    $http.get('/shops').then(function(returned_data){
      callback(returned_data.data);
    })
  }

  factory.create = function(shop, callback){
    $http.post('/shops', shop).then(function(returned_data){
      callback(returned_data.data);
    })
  }

  factory.show = function(shop_name, callback){
    $http.get('/shops/' + shop_name).then(function(returned_data){
      callback(returned_data.data);
    })
  }

  factory.allProducts = function(shop_name, callback){
    $http.get('/' + shop_name + '/products').then(function(returned_data){
      callback(returned_data.data);
    })
  }

  return factory;
}])
