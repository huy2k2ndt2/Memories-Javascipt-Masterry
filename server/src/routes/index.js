const express = require("express");

const routers = express.Router();

routers.use("/v1/api/", require("./v1"));
module.exports = routers;
