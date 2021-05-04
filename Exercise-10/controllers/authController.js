exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/users/profile");
    } else {
        next();
    }
}