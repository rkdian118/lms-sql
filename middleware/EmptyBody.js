// Check Empty Body

const ErrorHandler = require("../Utils/errorHandler");

class EmptyBody{
    async ceb(req, res, next){
        if (Object.keys(req.body).length === 0) {
            return next(new ErrorHandler("Sorry, Can't accept empty body.", 400, {}));
            // return res.status(400).json({"ResponseCode": 400, "ResponseMessage": "Sorry, Can't accept empty body.", "succeeded": false, "ResponseBody": {} })
         }else{
            next()
         }
        
    }
}

module.exports = new EmptyBody()