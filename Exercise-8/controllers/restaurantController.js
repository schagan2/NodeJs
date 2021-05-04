const Restaurant = require('../models/Restaurant');

//restaurant page
const restaurants_page = (req,res, next) => {
    Restaurant.find()
        .then(result => {
            res.render('restaurants', { restaurants: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        })
};

//To save the new restaurant
const restaurants_post = (req, res, next) => {
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
};

//For creating a restaurant
const create_restaurant = (req, res) => {
    res.render('create', { name: 'Fast Food Inc!' });
};

//Getting restaurant with id
const restaurant_object = (req, res, next) => {
    id = req.params.id;
    Restaurant.findById(req.params.id)
        .then(result => {
            res.render('restaurant', { restaurant: result, name: result.name });
        })
        .catch(err => {
            console.log(err);
            next();
        });
};

//Deleting a restaurant
const delete_restaurant = (req, res, next) => {
    id = req.params.id;
    Restaurant.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
};

//Updating the restaurant
const update_restaurant = (req, res, next) => {
    id = req.params.id;
    Restaurant.findById(id)
        .then(restaurant => {
            res.render('update', {restaurant, name: restaurant.name});
        })
        .catch(err => {
            console.log(err);
            next();
        });
};

//Put method for restaurant
const put_restaurant = (req, res, next) => {
    id = req.params.id;
    
    Restaurant.updateOne({"_id": id}, {$set: {"name": req.body.name,
    "yearFounded": req.body.yearFounded,
    "owner": req.body.owner,
    "imageURL": req.body.imageURL}})
        .then(restaurant => {
            res.redirect('/restaurants/'+id);
        })
        .catch(err => {
            console.log(err);
            next();
        });
};

//Exporting the callbacks
module.exports = {
    restaurants_page,
    restaurants_post,
    create_restaurant,
    restaurant_object,
    delete_restaurant,
    update_restaurant,
    put_restaurant
};