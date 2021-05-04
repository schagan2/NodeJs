const express = require("express");
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

//Router to get all the restaurants
router.get('/', restaurantController.restaurants_page);

//Router to save new restaurant
router.post('/', restaurantController.restaurants_post);

//Router to create page of the restaurant
router.get('/create', restaurantController.create_restaurant);

//Router to get the restaurant object
router.get('/:id', restaurantController.restaurant_object);

//Router to delete the restaurant object
router.delete('/:id', restaurantController.delete_restaurant);

//Router to update the restaurant
router.get('/:id/update', restaurantController.update_restaurant);

//Router to put method to update the restaurant
router.put('/:id', restaurantController.put_restaurant);

module.exports = router;