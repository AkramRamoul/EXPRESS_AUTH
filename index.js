require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/log-events");
const errHandler = require("./middleware/errorhandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const connectDB = require("./config/dbconfig");
const { default: mongoose } = require("mongoose");
const app = express();

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT);

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile("./views/404.html", { root: __dirname });
  } else if (req.accepts("json")) {
    res.json({ error: "404 page not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errHandler);
mongoose.connection.once("open", () => {
  console.log("connectsed to databse");
  app.listen(8080, () => {
    console.log("listening on port 8080 ");
  });
});
