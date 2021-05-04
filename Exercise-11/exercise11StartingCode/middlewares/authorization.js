exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.flash('success', 'Successfully logged out.');
        res.redirect("/users/login");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        req.flash('error', 'Users profile.');
        res.redirect("/users/profile");
    } else {
        next();
    }
}