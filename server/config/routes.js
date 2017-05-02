/*
    Route Request to Appropriate Contoller
*/
console.log("/server/config/routes.js");
const keyPublishable = process.env.PUBLISHABLE_KEY;

var users = require("../controllers/users.js");  // Require Items Controller
var shops = require("../controllers/shops.js");  // Require Items Controller
var products = require("../controllers/products.js");  // Require Items Controller
var reviews = require("../controllers/reviews.js");  // Require Items Controller
var carts = require("../controllers/carts.js");
var messages = require("../controllers/messages.js");
var favorites = require("../controllers/favorites.js");
var orders = require("../controllers/orders.js")

var multer = require('multer');
var upload = multer({ dest: './uploads' });

module.exports = function (app)
{
    // user routes
    app.post("/api/users", users.register);
    app.post("/api/user", users.updateuser);
    app.get('/api/user/:userID', users.getuser);
    app.post("/api/login", users.login);
    app.post("/api/upload", upload.single("file"), users.uploadphoto);
    // shop routes
    app.get("/shops", shops.index);
    app.post("/shops", shops.create);
    app.get("/shops/:shop_name", shops.show);
    app.post('/api/shopphoto', upload.single('file'), shops.uploadphoto);
    app.get("/search/:searchParams", shops.search);
    // product routes
    app.get("/:shop_name/products", products.index);
    app.get('/api/allproducts', products.allitems);
    app.post("/products", products.create);
    app.post('/products/photos', upload.array('file', 12), products.addphotos);
    app.get("/:shops_name/products/:id", products.show);
    app.get("/product/:prodid", products.getproduct);
    // review routes
    app.get("/reviews/:id/product", reviews.index);
    app.post("/reviews", reviews.create);
    app.get('/api/allreviews', reviews.allreviews);
    // carts routes
    app.get('/carts/:user_id', carts.show);
    app.post("/carts", carts.update); // used for adding elements to a cart
    app.put("/carts/:cart_id", carts.edit); //used for editing a cart from the cart page
    app.delete("/carts/:cart_id", carts.destroy);
    app.get('/emptycart/:user_id', carts.emptycart);
    // messages routes
    app.post('/api/sendmessage', messages.sendmessage);
    app.post('/api/messages', messages.getconversation);
    app.post('/api/inbox', messages.inbox);
    app.post('/api/unread', messages.allunread);
    // favorites routes
    app.post("/favorites", favorites.create)
    app.delete("/favorites/:favorite_id", favorites.destroy);
    app.put("/favorites", favorites.show);
    app.get('/favorites/:user_id', favorites.showAll);
    // orders routes
    app.post('/orders', orders.create); //handling charges
    app.post('/updateinventory', orders.updateinventory);
    // app.get('/checkout', orders.checkout); //rendering checkout page

}
