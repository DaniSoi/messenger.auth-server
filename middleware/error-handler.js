function errorHandler500(err, req, res, next) {
  console.log(err.stack);
  res.status(500).end('Unable to process request...');
}

module.exports = errorHandler500;
