const { constants } = require("../constants");

const errorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode? res.statusCode: 500;
    
    switch (statusCode) {
        case  constants.NOT_FOUND :
            res.json({ title: "not found", message: err.message, stackTrace: err.stack});
            break;
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Validation failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.ERROR_SERVE:
            res.json({ title: "Error serve", message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "unauthorized", message: err.message, stackTrace: err.stack});
            break;
    
        default:
            console.log('tout est ok');
            break;
    }



  
    
};

module.exports = errorHandler;