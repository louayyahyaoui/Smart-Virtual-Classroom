const express = require("express");
const router = express.Router();

// import controller
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");
const { getUserData, getAllUserData } = require("../controllers/ResumeParse");
const {
  readController,
  updateController,
  updateProfileController,
  getUserById,
  GetPictureOfUser,
  updateUserDataSkills,
  updateUserDataLanguages,
  updateUserDataInterestes,
  updateUserDataFormation,
  updateUserDataExperience,
  addUserDataFormation,
  addUserDataExperience,
  deleteUserDataFormation,
  deleteUserDataExperience,
  deleteUserDataSkills,
  deleteUserDataLanguages,
  deleteUserDataInteret,
} = require("../controllers/user.controller");

router.get("/user/:id", requireSignin, readController);
router.get("/getUserById/:id", getUserById);
router.put("/user/update", requireSignin, updateController);
router.get("/getImage", GetPictureOfUser);
router.put("/user/updateProfile/:id", updateProfileController);

//Update User Data Fields
router.put("/user/addUserDataFormation/:id", addUserDataFormation);
router.put("/user/updateUserDataFormation/:id", updateUserDataFormation);
router.put("/user/deleteUserDataFormation/:id", deleteUserDataFormation);

router.put("/user/addUserDataExperience/:id", addUserDataExperience);
router.put("/user/updateUserDataExperience/:id", updateUserDataExperience);
router.put("/user/deleteUserDataExperience/:id", deleteUserDataExperience);


router.put("/user/updateUserDataSkills/:id", updateUserDataSkills);
router.put("/user/deleteUserDataSkills/:id", deleteUserDataSkills);

router.put("/user/updateUserDataLanguages/:id", updateUserDataLanguages);
router.put("/user/deleteUserDataLanguages/:id", deleteUserDataLanguages);

router.put("/user/updateUserDataInterestes/:id", updateUserDataInterestes);
router.put("/user/deleteUserDataInteretes/:id", deleteUserDataInteret);
//Update User Data Fields

router.put("/admin/update", requireSignin, adminMiddleware, updateController);
//USER Data
router.get("/getuserdata/:id", getUserData);
module.exports = router;
