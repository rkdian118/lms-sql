class ErrorHandler extends Error{
  constructor(message, statusCode, err = {}, success = false){
    console.log("Message: ",message, "Status Code: ",statusCode, "Error: ",err);
      super(message)
      this.statusCode = statusCode
      this.error = err
      this.success = success

      Error.captureStackTrace(this,this.constructor);
  }
};

module.exports = ErrorHandler;