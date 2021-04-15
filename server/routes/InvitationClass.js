const express = require("express");
const router = express.Router();
const {
  addInvitationClass,
  updateInvitationClass,
  deleteInvitationClass,
  deleteAllInvitationClass,
  getInvitationByUserClass,
} = require("../controllers/InvitationClass.js");
router.post("/", addInvitationClass);
router.put("/:id", updateInvitationClass);
router.delete("/:id", deleteInvitationClass);
router.delete("/", deleteAllInvitationClass);
router.get("/:id", getInvitationByUserClass);
module.exports = router;
