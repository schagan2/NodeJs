exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'User must login');
        res.redirect("/users/login");
    } else {
        next();
    }
}


exports.isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        req.flash('error', 'User is already logged-in');
        res.redirect("/runs/myConnections");
    } else {
        req.flash('')
        next();
    }
}