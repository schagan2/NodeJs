const User = require('../model/user.js');

//To get signup page
exports.getSignUp = (req, res) => {
    res.render('./users/signUp');    
};

//After signup
exports.postSignUp = (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        next();
    })
};

//Get the login page
exports.getLogin = (req, res) => {
    res.render("./users/login");
};

//Post login
exports.postUserLogin = (req,res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(user){
            user.comparePassword(password)
            .then(isMatch => {
                if(isMatch){
                    req.session.user = {id: user._id, name: user.firstName};
                    res.redirect('/');
                }else{
                    //Incorrect password
                    console.log("Incorrect password");
                    res.redirect('/users/login');
                }
            })
        }else{
            //Incorrect email address
            console.log("incorect email");
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
    req.session.destroy(err => {
        res.redirect('/');
    })
};