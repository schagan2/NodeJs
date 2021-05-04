//Imported required module express-validator
const validate = require('express-validator').check;
let ts = Date.now();

let date_ob = new Date(ts);
console.log(date_ob);

//Validation for registration[sign-up page]
exports.validateSignup = [
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

//Validation for creating a run
exports.validateConnection = [
    validate('connectionName').notEmpty().withMessage('Connection name should not be empty'),
    validate('category').notEmpty().withMessage('Entered year should not be empty'),
    validate('date').notEmpty().withMessage('Date should not be empty')
    .isDate().withMessage('Date should be in date format'),
    validate('startTime').notEmpty().withMessage('Entered time should not be empty'),
    validate('endTime').notEmpty().withMessage('End time should not be empty')
    .matches('/^\d{1,2}[:][0-5][0-9]$/').withMessage('Enter valid time')
    .isAfter('startTime').withMessage('End time should be after start rime'),
    //.isBefore('startTime').withMessage('End time should be after start time'),
    validate('description').notEmpty().withMessage('Atleast one line description is necessary')
];