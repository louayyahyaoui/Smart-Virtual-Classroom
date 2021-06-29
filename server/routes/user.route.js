const express = require("express");
const router = express.Router();

// import controller
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getUserData } = require("../controllers/ResumeParse");
const {
  readController,
  updateController,
  updateProfileController,
  getUserById,
  GetPictureOfUser,
  updateUserDataSkills,
  updateUserDataLanguages,
  updateUserDataInterestes,
} = require("../controllers/user.controller");

router.get("/user/:id", requireSignin, readController);
router.get("/getUserById/:id", getUserById);
router.put("/user/update", requireSignin, updateController);
router.get("/getImage", GetPictureOfUser);
router.put("/user/updateProfile/:id", updateProfileController);

//Update User Data Fields
router.put("/user/updateUserDataSkills/:id", updateUserDataSkills);
router.put("/user/updateUserDataLanguages/:id", updateUserDataLanguages);
router.put("/user/updateUserDataInterestes/:id", updateUserDataInterestes);
//Update User Data Fields

router.put("/admin/update", requireSignin, adminMiddleware, updateController);
//USER Data
router.get("/getuserdata/:id", getUserData);
module.exports = router;
