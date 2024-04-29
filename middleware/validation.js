const {check, validationResult, body} = require('express-validator');
const ErrorHandler = require('../Utils/errorHandler');


const adminValidator = {
    adminValidate: [
        check('emp_id')
        .trim()
        .notEmpty().withMessage('Emp ID is required.')
        .isString()
        .isLength({ min: 6, max: 10 }).withMessage('Emp ID should be between 6 and 10 characters.'),
        check('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
        // check('role_type')
        // .trim()
        // .notEmpty().withMessage('Role type is required.')
        // .isString()
        // .isLength({min: 2, max: 10}).withMessage('Plese enter valid role type.'),
    ],
    branchValidate: [
        check('branch_name')
        .trim()
        .notEmpty().withMessage('Branch name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Branch name should be between 2 and 50 characters.'),
        check('country')
        .trim()
        .notEmpty().withMessage('Country is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Country should be between 2 and 50 characters.'),
        check('state')
        .trim()
        .notEmpty().withMessage('State is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('State should be between 2 and 50 characters.'),
        check('city')
        .trim()
        .notEmpty().withMessage('City is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('City should be between 2 and 50 characters.'),
        check('address')
        .trim()
        .notEmpty().withMessage('Address is required.')
        .isString()
        .isLength({ min: 5, max: 500 }).withMessage('Address should be between 5 and 500 characters.'),
        check('pincode')
        .trim()
        .notEmpty().withMessage('Pincode is required.')
        .isNumeric()
        .isLength({ min: 6, max: 6 }).withMessage('Pincode should be 6 digit.'),
    ],
    clusterHeadValidate: [
        check('emp_id')
        .trim()
        .notEmpty().withMessage('Employee ID is required.')
        .isString()
        .isLength({ min: 6, max: 10 }).withMessage('Employee ID should be between 6 and 10 characters.'),
        check('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
        check('branch_id')
        .trim()
        .notEmpty().withMessage('Branch is required.')

        // check('role_type')
        // .trim()
        // .notEmpty().withMessage('Role type is required.')
        // .isString()
        // .isLength({min: 2, max: 10}).withMessage('Plese enter valid role type.'),
    ],
    managerValidate: [
        check('emp_id')
        .trim()
        .notEmpty().withMessage('Employee ID is required.')
        .isString()
        .isLength({ min: 6, max: 10 }).withMessage('Employee ID should be between 6 and 10 characters.'),
        check('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
        // check('role_type')
        // .trim()
        // .notEmpty().withMessage('Role type is required.')
        // .isString()
        // .isLength({min: 2, max: 10}).withMessage('Plese enter valid role type.'),
    ],
    bdValidate: [
        check('manager_id')
        .trim()
        .notEmpty().withMessage('Branch is required.'),
        check('emp_id')
        .trim()
        .notEmpty().withMessage('Employee ID is required.')
        .isString()
        .isLength({ min: 6, max: 10 }).withMessage('Employee ID should be between 6 and 10 characters.'),
        check('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
        // check('role_type')
        // .trim()
        // .notEmpty().withMessage('Role type is required.')
        // .isString()
        // .isLength({min: 2, max: 10}).withMessage('Plese enter valid role type.'),
    ],

    isReqValid: (req, res, next) => {

        const error = validationResult(req);
        if(error.array().length  > 0){
            // return res.json({ "ResponseCode": 400, "ResponseMessage": `Validation Error: ${error.array()[0].msg}`, "succeeded": false, "ResponseData": {} });
            return next(new ErrorHandler(`Validation Error: ${error.array()[0].msg}`, 400, ))
        }
        next();
    }
}

module.exports = adminValidator;