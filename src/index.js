 const express = require('express');
 const config = require('./config/config');
const { errorHandler, errorConverter } = require('./middleware/error');


 const app = express();
 app.get('/', (req, res, next) => {
  // simulate error
  const error =   new Error('Oops! Something went wrong.');
  error.statusCode = 500;
  next(error); // pass to error handler
});
 app.use(errorConverter)
 app.use(errorHandler)
const PORT  = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});