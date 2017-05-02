angular.module("app", ["ngRoute", "ngMessages", "ngAnimate", "ngCookies", "ngFileUpload", "angularPayments", "ui.bootstrap", "angularModalService"]);

var app = angular.module("app");

app.config(function ($routeProvider, $windowProvider) {
  $routeProvider
  .when("/login", {
    templateUrl: "/partials/login.html",
    controller: "loginController",
  })
  .when("/", {
    templateUrl: "/partials/home.html",
    controller: "homeController",
  })
  .when("/:shop_name/products/:id", {
    templateUrl: "/partials/product.html",
    controller: "productController"
  })
  .when('/settings', {
    templateUrl: '/partials/settings.html',
    controller: 'settingsController'
  })
  .when('/create_shop', {
    templateUrl: '/partials/create_shop.html',
    controller: 'shopController'
  })
  .when('/shops/:shop_name', {
    templateUrl: '/partials/shop.html',
    controller: 'shopController'
  })
  .when('/:shop_name/create_listing', {
    templateUrl: '/partials/create_product.html',
    controller: 'productController'
  })
  .when('/cart',{
    templateUrl: "/partials/cart.html",
    controller: 'cartController'
  })
  .when('/productphotos/:prodid', {
    templateUrl: '/partials/productphotos.html',
    controller: 'productController'
  })
  .when('/search/:searchParams', {
    templateUrl: '/partials/search.html',
    controller: 'searchController'
  })
  .when('/sendmessage/:userID', {
    templateUrl: '/partials/sendmessage.html',
    controller: 'conversationController'
  })
  .when('/addshopimage/:shopID', {
    templateUrl: '/partials/addshopimage.html',
    controller: 'shopController'
  })
  .when('/favorites', {
    templateUrl: '/partials/favorite.html',
    controller: 'favoriteController'
  })
  .when('/inbox', {
    templateUrl: '/partials/inbox.html',
    controller: 'messageController'
  })
  .otherwise("/");

  var $window = $windowProvider.$get();
  $window.Stripe.setPublishableKey('pk_test_aTiwDlOblwmFlExb5GAiszlU');
  // console.log($window)
})
