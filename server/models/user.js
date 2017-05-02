var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({

    first_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },

    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength:8,
        validate: {
            validator: function(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "Email is invalid. Do better."
        },
    },
    password: {
        type: String,
        required: true,
        minlength:8,
        maxlength:1024,
        select: false,
        validate: {
          validator: function( value ) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        },

    },
    profilepic: {
        data: Buffer,
        contentType: String,
    }

    }, {timestamps: true}
);

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.pre('save', function(done) {
  this.password = this.generateHash(this.password);
  done();
})

mongoose.model('User', userSchema);
