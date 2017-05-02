var mongoose = require('mongoose');
var fs = require('fs');

var User = mongoose.model("User");
var Cart = mongoose.model("Cart")

module.exports.login = function(request, response) {
  
    //query uses select so that the password entered can be compared to the password stored. will not work without select
    User.findOne({email: request.body.email}).select('password first_name last_name email').exec(function(err, user){
      if(err){
        response.json({errors:err});
      }
      else if(user && user.validPassword(request.body.password)) {
       
        //Creating userdata variable to eliminate password from results returned to client side
        var userdata = {};
        userdata._id = user._id;
        userdata.first_name = user.first_name;
        userdata.last_name = user.last_name;
        userdata.email = user.email;
    
        response.json({
          user: userdata,
        });
      }

      else if(user && !user.validPassword(request.body.password)) {
        response.json({
          errors: {
            login: {
              message: "Password isn't correct"
            }
          },

        })
      }
      else {
        console.log("ERROR 2")
        response.json({
          errors: {
            login: {
              message:"Email not found, try to register"
            }
          }
        })
      }
    })
}

module.exports.register = function (request, response) {
  var user = new User(request.body);
  user.save(function (err) {
    if (err) {
      response.json({errors: err})
      // console.log(err);
    } else {


      response.json({
        message: "Successfully Created User!",
        user: user,

      })

    }
  })

}

module.exports.uploadphoto = function(request, response){
  var file = request.file;
  var ext = file.originalname.split(".");
  ext = ext[ext.length-1];
  fs.rename(file.path, file.path+"."+ext, function(err){
    if (err){
      response.json({err:err});
    } else {
      User.update({_id: request.body.id}, {$set: { profilepic: file.filename+"."+ext }}, function(err, user){
        if (err){
      response.json({err:err});
        }
        else{
      response.json({profilepic: user.profilepic});
        }
      });
    }
  })
}

module.exports.updateuser = function(request, response){
  User.update({_id: request.body._id},
  { $set: {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email
      }
  }, function(error){
    console.log(error);
  })}

//Write code to get a user from db
module.exports.getuser = function(request, response){
  User.findOne({_id: request.params.userID}).then(function(user){
      console.log(user);
      response.json({user:user})
    })
}