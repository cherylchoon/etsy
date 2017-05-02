app.controller('cartController', ['$scope', '$location', '$routeParams', '$cookies', 'productFactory', 'userFactory', 'orderFactory', 'messageFactory', 'Upload', '$uibModal', 'ModalService', function($scope, $location, $routeParams, $cookies, productFactory, userFactory, orderFactory, messageFactory, Upload, $uibModal, ModalService){
  $scope.user = $cookies.get('loggedusername');
  $scope.user_id = $cookies.get('loggeduserid');
  $scope.states = [ "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN",
                    "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY",
                    "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]
  Stripe.setPublishableKey('pk_test_aTiwDlOblwmFlExb5GAiszlU');

  var id = $cookies.get("loggeduserid");
  var inboxrequest = {
      me: id
  };
  var showCart = function(){
    productFactory.showCart($scope.user_id, function(returnedData){
      console.log("-----", returnedData)
      $scope.cart = returnedData.data.carts
      var cartTotal = 0;
      var allItems = [];
      for(var i=0; i<returnedData.data.carts.length; i++){
        var item = {};
        item.id = returnedData.data.carts[i]._product._id;
        item.quantity = returnedData.data.carts[i].quantity;
        allItems.push(item);
        cartTotal += (returnedData.data.carts[i].quantity * returnedData.data.carts[i]._product.price);
      }
      console.log("All items outside-----", allItems)
      $scope.allItems = allItems;
      $scope.cartTotal = Math.round(cartTotal * 100) / 100
    })
  };
  showCart();
  $scope.updateCart = function(product){
    if(!product.quantity){
      $scope.error = "Please submit a quantity first!"
    }else{
      productFactory.editCart(product, function(data){
        if(data.err){
          console.log(data.err)
        }else{
          console.log("This worked, here is the cart data", data)
        }
      })
    }
    $location.url("/cart")
  }
  $scope.deleteCart = function(product){
    console.log(product)
    productFactory.deleteCart(product, function(data){
      if(data.err){
        console.log(data.err)
      }else{
        console.log("This worked, here is the cart data", data)
      }

    })
    console.log("current URL", $location.url)
    showCart();
  }
  $scope.stripeCallback = function (code, result) {
    if (result.error) {
        $scope.paymentErrors = "Please fill in your payment details."
    } else {
        window.alert('success! token: ' + result.id);
        console.log("SUCCESS STRIPE")
    }
  }

$scope.order = {};
$scope.openModal = function(){
   ModalService.showModal({
      templateUrl: "../../partials/checkout.html",
      controller: "cartController"
    }).then(function(modal){
      $scope.order.user = $scope.user_id;
      $scope.order.total = $scope.cartTotal;
      orderFactory.create($scope.order, function(data){
        if (data.err){
          $scope.orderErrors = data.err
        }
      })
      orderFactory.updateInventory($scope.allItems, function(data){
        if (data.err){
          console.log("updating inventory fail")
        }
      })
      modal.element.modal();
      modal.close.then(function(result) {
        // console.log('hello ')
        productFactory.emptyCart($scope.user_id, function(data){
          if (data.err){
            console.log(data.err);
          } else{
          console.log("emptied cart", data);
          }
        });
        $location.url('/cart')
      });
    });
// $scope.modalInstance = $uibModal.open({
//       animation: true,
//       ariaLabelledBy: 'modal-title-top',
//       ariaDescribedBy: 'modal-body-top',
//       templateUrl: './partials/checkout.html',
//       controller: 'cartController'
//     })
//     $scope.modalInstance.result.then(function(hello){
//       console.log('closed')
//     }, function(){
//       $route.reload()
//     })
  }
 $scope.createOrder = function(){
   if ($scope.order.address == null || !$scope.order.zipcode == null || !$scope.order.state == null){
     $scope.orderErrors = "Please fill in your shipping details."
   } else{
     $scope.order.user = $scope.user_id;
     $scope.order.total = $scope.cartTotal;
     orderFactory.create($scope.order, function(data){
       if (data.err){
         $scope.orderErrors = data.err
       } else{
         $location.url('/')
       }
     });
   }
 }
   messageFactory.getUnread(inboxrequest, function(){
        var unreadcount = messageFactory.unread
        $scope.unread = { count: unreadcount };
            console.log("THIS IS AFTER LOGGING IN")
            console.log($scope.unread);
    })

    messageFactory.onUnreadChange(function(count){
      $scope.unread = { count: count };
    })
}])
