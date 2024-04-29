const {check, validationResult, body} = require('express-validator');
const ErrorHandler = require('../../Utils/errorHandler');


const clusterValidator = {
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
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],
    updateManagerValidate: [
        check('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .optional()
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .optional()
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .optional()
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .optional()
        .trim()
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .optional()
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],
    clusterLeadValidate: [
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
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],
    updateClusterLeadValidate: [
        check('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .optional()
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        check('username')
        .optional()
        .trim()
        .notEmpty().withMessage('Username is required.')
        // .isAlphanumeric().withMessage('Please enter correct username.')
        .isLength({ min: 2, max: 50 }).withMessage('Username should be between 2 and 50 characters.'),
        // check('email')
        // .optional()
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .optional()
        .trim()
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .optional()
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],
    bdValidate: [
        check('cluster_lead_id')
        .trim()
        .notEmpty().withMessage('Cluster Lead ID is required.'),
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
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('password')
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],
    updateBDValidate: [
        check('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('designation')
        .optional()
        .trim()
        .notEmpty().withMessage('Designation is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Designation should be between 2 and 50 characters.'),
        // check('email')
        // .optional()
        // .trim()
        // .notEmpty().withMessage('Email is required.')
        // .isEmail().withMessage('Invalid email address.'),
        check('mobile')
        .optional()
        .trim()
        .notEmpty().withMessage('Mobile number is required.'),
        // .isMobilePhone().withMessage('Invalid mobile number.'),
        check('manager_id')
        .optional()
        .trim(),
        check('password')
        .optional()
        .trim()
        .notEmpty().withMessage('Password is required.')
        .isString()
        .isStrongPassword().withMessage('Please enter valid strong password.'),
    ],

    clusterReqValid: (req, res, next) => {

        const error = validationResult(req);
        if(error.array().length  > 0){
            // return res.json({ "ResponseCode": 400, "ResponseMessage": `Validation Error: ${error.array()[0].msg}`, "succeeded": false, "ResponseData": {} });
            return next(new ErrorHandler(`Validation Error: ${error.array()[0].msg}`, 400, ))
        }
        next();
    }
}

module.exports = clusterValidator;