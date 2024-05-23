module.exports = (req, res, next) => {
  console.log(req.originalUrl, new Date().toString());
  next();
};
