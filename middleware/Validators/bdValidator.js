const {check, validationResult, body} = require('express-validator');
const ErrorHandler = require('../../Utils/errorHandler');


const bdValidator = {
    leadValidate: [
        check('lead_req_type_id')
        .trim()
        .notEmpty().withMessage('Lead Requirement Type ID is required.'),
        check('lead_type_id')
        .trim()
        .notEmpty().withMessage('Lead Type ID is required.'),
        check('lead_source_id')
        .trim()
        .notEmpty().withMessage('Lead Source ID is required.'),
        check('pre_defined_note_id')
        .trim()
        .notEmpty().withMessage('Pre define note ID is required.'),
        check('client_name')
        .trim()
        .notEmpty().withMessage('Client name is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Name should be between 2 and 50 characters.'),
        check('client_number')
        .trim()
        .notEmpty().withMessage('Client contact number is required.')
        .isNumeric().withMessage('Please enter valid client contact number.')
        .isLength({ min: 10, max: 15 }).withMessage('Please enter correct contact number.'),
        check('client_whatsapp_num')
        .optional()
        .trim()
        .notEmpty().withMessage('Client whatsapp number is required.')
        .isNumeric().withMessage('Please enter valid client whatsapp contact number.')
        .isLength({ min: 10, max: 15 }).withMessage('Please enter correct whatsapp number.'),
        // check('client_email')
        // .trim()
        // .notEmpty().withMessage('Client email is required.')
        // .isEmail().withMessage('Invalid client email address.'),
        check('client_linkedin')
        .optional()
        .trim()
        .notEmpty().withMessage('LinkedIn Url is required.')
        .isString(),
        check('client_country')
        .trim()
        .notEmpty().withMessage('Client country is required.')
        .isString()
        .isLength({ min: 2, max: 50 }).withMessage('Please enter correct client country.'),
        check('upwork_job_url')
        .optional()
        .trim()
        .notEmpty().withMessage('Upwork Job Url is required.')
        .isString(),
        check('bid_url')
        .optional()
        .trim()
        .notEmpty().withMessage('Bid Url is required.')
        .isString(),
        check('proposal_amount')
        .optional()
        .trim()
        .notEmpty().withMessage('Proposal amount is required.')
        .isNumeric().withMessage('Please enter numeric value of proposal amount'),
        check('client_budget')
        .optional()
        .trim()
        .notEmpty().withMessage('Client budget is required.')
        .isNumeric().withMessage('Please enter numeric value of client budget'),
    ],
    callValidate: [
        check('lead_id')
        .trim()
        .notEmpty().withMessage('Lead Requirement Type ID is required.'),
        check('call_type_id')
        .trim()
        .notEmpty().withMessage('Call Type ID is required.'),
        check('call_mode_id')
        .trim()
        .notEmpty().withMessage('Call Mode ID is required.'),
        // check('meeting_time')
        // .trim()
        // .notEmpty().withMessage('Meeting time is required.')
        // .isString(),
        check('meeting_date_time')
        .trim()
        .notEmpty().withMessage('Meeting date time is required.')
        .isString(),
        check('comment_remark')
        .optional()
        .trim()
    ],
    rfpValidate: [
        check('lead_id')
        .trim()
        .notEmpty().withMessage('Lead Requirement Type ID is required.'),
        // check('minutes_of_meeting')
        // .optional()
        // .trim()
        // .notEmpty().withMessage('Minutes of meeting is required.'),
    ],
    proposalValidate: [
        check('lead_id')
        .trim()
        .notEmpty().withMessage('Lead ID is required.'),
        check('proposal_type_id')
        .trim()
        .notEmpty().withMessage('Lead Proposal Type ID is required.'),
        check('amount')
        .optional()
        .trim()
        .notEmpty().withMessage('Proposal amount is required.')
        .isNumeric().withMessage('Please enter numeric value of amount.'),
        check('timeline')
        .optional()
        .trim()
        .notEmpty().withMessage('Timeline date is required.')
        .isString(),
        check('comment_remark')
        .optional()
        .trim(),
        
    ],

    bdReqValid: (req, res, next) => {

        const error = validationResult(req);
        if(error.array().length  > 0){
            // return res.json({ "ResponseCode": 400, "ResponseMessage": `Validation Error: ${error.array()[0].msg}`, "succeeded": false, "ResponseData": {} });
            return next(new ErrorHandler(`Validation Error: ${error.array()[0].msg}`, 400, ))
        }
        next();
    }
}

module.exports = bdValidator;