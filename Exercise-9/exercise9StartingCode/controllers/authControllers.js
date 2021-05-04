//Authentication for the logged-in user
exports.isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.redirect("/users/login");
    }else{
        next();
    }
};

//Authentication for the logged-out user
exports.isLoggedOut = (req, res, next) => {
    if(req.session.user){
        res.redirect("/users/profile");
    }else{
        next();
    }
};