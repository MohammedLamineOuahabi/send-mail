const express = require('express');
const nodemailer = require('nodemailer');
const pug = require('pug');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const subscribeRouter = require('./routes/subscribeRoutes');

/* ***************************************
 1) App init  
*************************************** */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
///app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/* ***************************************
 2) GLOBAL MIDDLEWARE  
*************************************** */

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// app.use(cors({
//   origin: 'https://www.reactjs-books.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
///app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* ***************************************
 2) routes  
*************************************** */

app.use('/api/v1/subscribes', subscribeRouter);

/* app.all('*', (req, res, next) => {
  next();
  //next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */
//app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
