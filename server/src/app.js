const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
const corsOptions = require("./config/corsOptions");

const app = express();

// app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));


app.use(cookieParser());
app.use((req, res, next) => {
  console.log("cookie", req.cookies);
  next();
});
app.use(cors({ origin: true, credentials: true }));


// app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(require("./routes"));

module.exports = app;
