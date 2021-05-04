const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isLoggedOut } = require('../middlewares/authorization');

//Validators for sign-up and login
const validRegistration = require('../middlewares/validator').validateRegistration;
const validLogin = require('../middlewares/validator').validateLogin;

router.get('/create', isLoggedOut, userController.getUserCreate);

//Validate the sign-up form for creating an account
router.post('/', validRegistration, isLoggedOut, userController.postUserCreate);

router.get('/login', isLoggedOut, userController.getUserLogin);

//Validation is requires while user login
router.post('/login', validLogin, isLoggedOut, userController.postUserLogin);

router.get('/profile', isLoggedIn, userController.getUserProfile);

router.get('/logout', isLoggedIn, userController.getUserLogout);

module.exports = router;