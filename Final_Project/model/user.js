const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    run: {
        type: Schema.Types.ObjectId,
        ref: 'Run'
    },
    enrolled: {
        type: String
    }
},{ _id: false });

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    rsvp: [rsvpSchema]
});

userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    }).catch(err => {
        console.log(err);
        next();
    })
});

userSchema.methods.comparePassword = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
}

const user = mongoose.model("user", userSchema);
module.exports = user;