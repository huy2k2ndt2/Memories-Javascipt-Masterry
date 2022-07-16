const express = require("express");
const routers = express.Router();

routers.use("/posts", require("./post.route"));
routers.use("/auth", require("./auth.route"));

module.exports = routers;
