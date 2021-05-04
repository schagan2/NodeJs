const Restaurant = require('../models/restaurant');
const User = require('../models/User');

exports.getUserCreate = (req, res, next) => {
    res.render('./users/create', { name: 'Fast Food Inc!' });
}

exports.postUserCreate = (req, res, next) => {
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
        });
}

exports.getUserLogin = (req, res, next) => {
    res.render('./users/login', { name: 'Fast Food Inc!' });
}

exports.postUserLogin = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            req.session.user = { id: user._id, name: user.firstName };
                            res.redirect('/');
                        } else {
                            //Incorrect password
                            res.redirect('/users/login');
                        }

                    })
            } else {
                //Incorrect email address
                res.redirect('/users/login');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });

}

exports.getUserProfile = (req, res, next) => {
    //Query is update to get the results for the logged in user.
    Restaurant.find({user: req.session.user.id})
        .then(result => {
            res.render('./users/profile', { data: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getUserLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}