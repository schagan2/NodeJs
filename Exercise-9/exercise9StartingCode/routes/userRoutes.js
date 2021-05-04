const express = require('express');
const router = express.Router();

//Controller for the userRoutes
const userController = require('../controllers/userController');

//Logged-in and logged-out authentications
const loggedIn = require('../controllers/authControllers').isLoggedIn;
const loggedOut = require('../controllers/authControllers').isLoggedOut;

//Router for sign-up page
router.get('/create', loggedOut, userController.create);

//Router for sign-up page to save into DB
router.post('/', userController.createAndSave);

//Router for login page
router.get('/login', loggedOut, userController.getLogin);

//Router for login page and authenticate the password
router.post('/login', userController.authorizePassword);

//Router for profile page
router.get('/profile', loggedIn, userController.getProfile);

//Router for logout
router.get('/logout', loggedIn, userController.logout);

//Exporting the router
module.exports = router;