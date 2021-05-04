const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');
const isLoggedIn = require('../middlewares/authorization').isLoggedIn;

//Validation for restaurant
const validateRestaurant = require('../middlewares/validator').validateRestaurant;

router.use('/', isLoggedIn);

router.get('/', restaurantController.getAllRestaurants);

//Validation is required while creating a restaurant
router.post('/', validateRestaurant, restaurantController.createRestaurant);

router.get('/create', restaurantController.getRestaurantCreate);

router.get('/:id', restaurantController.getRestaurantDetail);

router.get('/:id/update', restaurantController.getRestaurantUpdate);

//Validation is required while updating a restaurant
router.put('/:id', validateRestaurant, restaurantController.updateRestaurant);

router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;