const express = require('express');
const { isLoggedIn } = require('../controllers/authControllers');
const router = express.Router();

const restaurantController = require('../controllers/restaurantController');

const loggedIn = require('../controllers/authControllers').isLoggedIn;

router.use('/', loggedIn);

router.get('/', restaurantController.getAllRestaurants);

router.post('/', restaurantController.createRestaurant);

router.get('/create', restaurantController.getRestaurantCreate);

router.get('/:id', restaurantController.getRestaurantDetail);

router.get('/:id/update', restaurantController.getRestaurantUpdate);

router.put('/:id', restaurantController.updateRestaurant);

router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;