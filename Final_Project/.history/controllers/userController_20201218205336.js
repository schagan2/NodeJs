const User = require('../model/user.js');

const validationResult = require('express-validator').validationResult;

//To get signup page
exports.getSignUp = (req, res) => {
    res.render('./users/signUp');    
};

//After signup
exports.postSignUp = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        res.redirect('back');
    }else{
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
        .then(result => {
            req.flash('success', 'User successfully created an account.');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            next();
        })
    }
};

//Get the login page
exports.getLogin = (req, res) => {
    res.render("./users/login");
};

//Post login
exports.postUserLogin = (req,res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        res.redirect('back');
    }
    
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(user){
            user.comparePassword(password)
            .then(isMatch => {
                if(isMatch){
                    req.flash('success', 'User logged in successfully');
                    req.session.user = {id: user._id, name: user.firstName};
                    res.redirect('/');
                }else{
                    req.flash('error', 'Incorrect password');
                    res.redirect('/users/login');
                }
            })
        }else{
            req.flash('error', 'Incorrect email');
            res.redirect('/users/login');
        }      
    })
    .catch(err => {
        console.log(err);
        next();
    })
};

//Logout
exports.getLogout = (req, res, next) => {
    req.flash('success', 'Sucessfully logged out');
    req.session.destroy(err => {
        res.redirect('/');
    })
};