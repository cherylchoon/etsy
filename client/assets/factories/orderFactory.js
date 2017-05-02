app.factory('orderFactory', ['$http', function($http){
  factory = {};
  factory.create = function(order, callback){
    console.log("order factory")
    $http.post('/orders', order).then(function(returned_data){
      callback(returned_data.data);
    })
  }
  factory.updateInventory = function(products, callback){
    $http.post('/updateinventory', products).then(function(returned_data){
      callback(returned_data.data);
    })
  }
  return factory;
}])
