//Imported required module express-validator
const validate = require('express-validator').check;


var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1; 
var year = today.getFullYear();
if (day < 10) {
    day = '0' + day
}
if (month < 10) {
    month = '0' + month
}
    
today = year + '-' + month + '-' + day;

document.getElementById("date").setAttribute("min", today);
            var startTime = document.getElementById("startTime");
            startTime.addEventListener("input", function () {
                document.getElementById("endTime").setAttribute("min", startTime.value);
            }, false);

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
    .isDate().withMessage('Date should be in date format')
    .min(today).withMessage('Date should be in future'),
    validate('startTime').notEmpty().withMessage('Entered time should not be empty'),
    validate('endTime').notEmpty().withMessage('End time should not be empty'),
    validate('description').notEmpty().withMessage('Atleast one line description is necessary')
];