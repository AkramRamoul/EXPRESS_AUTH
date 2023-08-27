const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const id = require("uuid").v4();

const logevents = async (message, Logname) => {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:MM:ss")}`;
  const logItem = `${dateTime}\t${id}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      fsPromises.mkdirpa;
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", Logname),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logevents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};
module.exports = { logevents, logger };
