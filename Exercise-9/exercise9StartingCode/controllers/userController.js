const User = require('../models/user');

//For displaying the sign-up page
exports.create = (req,res) => {
    res.render('./users/create', { name: 'Fast Food Inc!' });
};

//For creating the account
exports.createAndSave = (req,res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then(user => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        next();
    });
};

//For the login page
exports.getLogin = (req,res) => {
    res.render('./users/login', { name: 'Fast Food Inc!' });
};

//For authenticating the password entered by the user
exports.authorizePassword = (req,res,next)=> {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({'email': email})
    .then(user => {
        if(!user){
            res.redirect('/users/login');
        }else{
            user.comparePassword(password)
            .then(result => {
                if(result){
                    req.session.user = { id: user._id, name: user.firstName };
                    res.redirect('/');
                }
                else{
                res.redirect('/users/login');    
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        next();
    })
};

//To display the profile page
exports.getProfile = (req, res, next) => {
    res.render("./users/profile", { name: 'Fast Food Inc!', userName: res.locals.user.name });
};

//Logout page
exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/');
       });
};