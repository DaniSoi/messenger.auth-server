const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { API_PREFIX, IS_PROD, CLIENT_ORIGIN } = require('./config');
const routes = require('./routes');
const { errorHandler500 } = require('./middleware');
const connectDB = require('./db');

connectDB();

const app = express();

!IS_PROD &&
app.use(morgan('dev'));

app.use(cors());
// app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(API_PREFIX, routes.apiRouter);

app.use(errorHandler500);

module.exports = app;
