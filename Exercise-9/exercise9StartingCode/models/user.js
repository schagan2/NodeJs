//User model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Bcrypt is used to hash the password
const bcrpt = require('bcrypt');

//Creating a Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

/*Before saving the password, it is checked whether changed or not
If changed it is hashed and then saved orelse continue.*/
userSchema.pre('save', function(next) {
    let user = this;
    if(!this.isModified('password')){
        return next();
    }
    bcrpt.hash(user.password, 10)
    .then(hash => {
        user.password = hash,
        next();
    }).catch(err => {
        console.log('Error in the password.');
        next();
    })
});

//Used to compare the entered password with the DB password
userSchema.methods.comparePassword = function(inputPassword){
    let user = this;
    return bcrpt.compare(inputPassword, user.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;