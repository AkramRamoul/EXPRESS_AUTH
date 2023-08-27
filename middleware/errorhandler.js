const { logevents } = require("./log-events");

const errHandler = (err, req, res, next) => {
  logevents(`${err.name}: ${err.message}`, "errorLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errHandler;
