const express = require('express');
const router = express.Router();

//Importing the necessary modules
const userController = require('../controllers/userController.js');
const { isLoggedIn, isLoggedOut } = require('../middleware/authorization');

//Importing validators
const signupValidator = require('../middleware/validator').validateSignup;
const loginValidator = require('../middleware/validator').validateLogin;

//Router for saving the user after signup
router.post('/', signupValidator, isLoggedOut, userController.postSignUp);

//Router to get the sign up page
router.get('/signUp', isLoggedOut, userController.getSignUp);

//Router to get the login page
router.get('/login', isLoggedOut, userController.getLogin);

//Router to enter the application
router.post('/login', loginValidator, isLoggedOut, userController.postUserLogin);

//Router to logout
router.get('/logout', isLoggedIn, userController.getLogout);

module.exports = router;