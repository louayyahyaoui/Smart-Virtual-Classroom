const express = require("express");
const router = express.Router();

// import controller
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");
const {
  readController,
  updateController,
  updateProfileController,
  getUserById,
} = require("../controllers/user.controller");

router.get("/user/:id", requireSignin, readController);
router.get("/getUserById/:id", getUserById);
router.put("/user/update", requireSignin, updateController);
router.put("/user/updateProfile/:id", updateProfileController);
router.put("/admin/update", requireSignin, adminMiddleware, updateController);

module.exports = router;
