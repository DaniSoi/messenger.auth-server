const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { PATHS_PREFIX, IS_PROD, CLIENT_ORIGIN } = require('./config');
const routes = require('./routes');
const { errorHandler500 } = require('./middleware');
const healthCheckMiddleware = require('express-healthcheck');
const connectDB = require('./db');

connectDB();

const app = express();

!IS_PROD &&
app.use(morgan('dev'));

app.use(cors());
// app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes.apiRouter);

app.use('/healthcheck', healthCheckMiddleware());

app.use(errorHandler500);

module.exports = app;
