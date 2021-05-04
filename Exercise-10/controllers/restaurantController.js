const Restaurant = require('../models/restaurant');

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find()
        .populate('user', 'firstName')
        .then(result => {
            res.render('./restaurants/restaurants', { data: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantDetail = (req, res, next) => {
    //Populated the user with 'FirstName', to display in the restaurant page.
    Restaurant.findById(req.params.id)
        .populate('user', 'firstName')
        .then(result => {
            if (result)
                res.render('./restaurants/restaurant', { data: result, name: 'Fast Food Inc!', firstName: result.user.firstName });
            else
                next();
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantCreate = (req, res) => {
    res.render('./restaurants/create', { name: 'Fast Food Inc!' });
}

exports.getRestaurantUpdate = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(result => {
            ////Added a check whether the user is authorized to update the restaurant.
            if (result && result.user.equals(req.session.user.id))
                res.render('./restaurants/update', { data: result, name: 'Fast Food Inc!' });
            else
                res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.createRestaurant = (req, res, next) => {
    let restaurant = new Restaurant({
        name: req.body.name,
        yearFounded: req.body.yearFounded,
        owner: req.body.owner,
        imageURL: req.body.imageURL,
        //Added user information to the restautant object.
        user: req.session.user.id
    });
    restaurant.save()
        .then(result => {
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.updateRestaurant = (req, res, next) => {
    let restaurantParams = {
        name: req.body.name,
        yearFounded: req.body.yearFounded,
        owner: req.body.owner,
        imageURL: req.body.imageURL
    };
    Restaurant.findById(req.params.id)
        .then(result => {
            //Added a check whether the user is authorized to update the restaurant.
            if (result && result.user.equals(req.session.user.id))
                return Restaurant.findByIdAndUpdate(req.params.id, { $set: restaurantParams });
            else
                res.redirect('/restaurants');
        })
        .then(result => {res.redirect('/restaurants/' + req.params.id);})
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.deleteRestaurant = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(result => 
            {
                //Added a check whether the user is authorized to delete the restaurant.
                if(result.user.equals(req.session.user.id)){
                    return Restaurant.findByIdAndDelete(req.params.id);
                }else{
                    res.redirect('/restaurants');
                }
        })
        .then(result => {
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.authenticate = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}