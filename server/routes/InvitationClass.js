const express = require("express");
const router = express.Router();
const {
  addInvitationClass,
  updateInvitationClass,
  deleteInvitationClass,
  deleteAllInvitationClass,
  getInvitationByUserClass,
  CountRequestClass,
  getInvitationByClassid
} = require("../controllers/InvitationClass.js");
router.post("/", addInvitationClass);
router.put("/:id", updateInvitationClass);
router.delete("/:id", deleteInvitationClass);
router.delete("/", deleteAllInvitationClass);
router.get("/:id", getInvitationByUserClass);
router.get("/countrequest/:id", CountRequestClass);
router.get("/inviteclassid/:id", getInvitationByClassid);
module.exports = router;
