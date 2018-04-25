import colors from 'colors';

/* NOTE: we create a "new Error('message')" when there is an error in the route handler
 * and pass the error to the "next" function so we can get the error in this middleware
 * Need to stringify the Error object to get the message (err.toString())
 */

const logErrors = (err, req, res, next) => {
  console.log('Error'.red + ' ' + err.toString());

  // need to call next explicitly to move on to next middleware 
  // and pass the error down the stack, otherwise the server will hang
  next(err); 
};

// global error handling
const errorHandler = (err, req, res, next) => {
  // handle error here and send it back to the client 
  // we can send back html, json, or strings
  // example taken from https://expressjs.com/en/guide/error-handling.html -- default error handling
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send(err.toString()); 
  // no need to call next here because 'send' will end the response
};


// export in the order middleware should be called
export default (app) => {
  app.use(logErrors);
  app.use(errorHandler);
};
