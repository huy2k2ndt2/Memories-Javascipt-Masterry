const express = require("express");
const router = express.Router();

const {
  userController: { signin, signup, handleRefreshToken },
} = require("../../controllers");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/refresh-token", handleRefreshToken);

module.exports = router;
