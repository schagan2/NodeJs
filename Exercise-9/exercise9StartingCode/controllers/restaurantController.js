const Restaurant = require('../models/restaurant');

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find()
        .then(result => {
            res.render('./restaurants/restaurants', { data: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantDetail = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(result => {
            res.render('./restaurants/restaurant', { data: result, name: result.name });
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
            res.render('./restaurants/update', { data: result, name: 'Fast Food Inc!' });
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
        imageURL: req.body.imageURL
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
    Restaurant.findByIdAndUpdate(req.params.id, { $set: restaurantParams })
        .then(result => {
            res.redirect('/restaurants/' + req.params.id);
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.deleteRestaurant = (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}