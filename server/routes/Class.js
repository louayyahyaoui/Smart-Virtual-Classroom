const express = require("express");
const router = express.Router();
const {
  getClass,
  addClass,
  updateClass,
  deleteClass,
  ClassByDateYear,
  ClassByLevel,
  addUserToClass,
  deleteAllClass,
  removeUserFromClass,
  getClassById,
  getUserByEmail,
  getUserByid,
  CountActiveClass,
  updateClassActive,
  updateClassArchive,
  getUsers,
} = require("../controllers/Class.js");
router.get("/", getClass);
router.get("/usersall/", getUsers);
router.get("/byyear/:id/:status", ClassByDateYear);
router.get("/bylevel/:id/:status", ClassByLevel);
router.post("/", addClass);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);
router.delete("/", deleteAllClass);
router.put("/:id/:email", addUserToClass);
router.put("/r/:id/:email", removeUserFromClass);
router.put("/update/archive/:id", updateClassActive);
router.put("/update/active/:id", updateClassArchive);
router.get("/email/:email", getUserByEmail);
router.get("/:_id", getClassById);
router.get("/userid/:_id", getUserByid);
router.get("/countactive/:id", CountActiveClass);

module.exports = router;
