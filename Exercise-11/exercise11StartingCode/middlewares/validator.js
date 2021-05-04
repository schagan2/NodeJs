//Imported required module express-validator
const validate = require('express-validator').check;

//Validation for registration[sign-up page]
exports.validateRegistration = [
    validate('firstName').notEmpty().withMessage('First name should not be empty')
    .isAlpha().withMessage('First name must contain alphabets.'),
    validate('lastName').notEmpty().withMessage('Last name should not be empty')
    .isAlpha().withMessage('Last name must contain alphabets.'),
    validate('email', 'Email entered is not valid').isEmail().normalizeEmail(),
    validate('password', 'Entered password should contain 5 characters.').isLength({min: 5})
];

//Validation for login user[login page]
exports.validateLogin = [
    validate('email', 'Email entered is not valid.').isEmail().normalizeEmail(),
    validate('password', 'Entered password should contain 5 characters.').isLength({min: 5})
];

//Validation for creating a restaurant
exports.validateRestaurant = [
    validate('name').notEmpty().withMessage('Name should not be empty'),
    validate('yearFounded').notEmpty().withMessage('Entered year should not be empty')
    .isInt({min: 1850, max: 2000}).withMessage('Restaurant year should be in between 1850 and 2000'),
    validate('owner').notEmpty().withMessage('Owner should not be empty')
];