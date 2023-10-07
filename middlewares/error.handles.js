/* Middlewares de tipo ERROR */
function logError(err, req, res, next){
  console.log('logError');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next){
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err,req, res,next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  else{
    next(err);
  }

}

module.exports = { logError, errorHandler, boomErrorHandler }
