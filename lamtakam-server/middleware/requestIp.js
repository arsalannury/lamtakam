const requestIp = require("request-ip");

exports.requestIp = (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  next();
};
