const express = require("express");
const { getnotification,addnotification,deletenotification,updatenotification } = require("../controllers/NotificationController");
const router = express.Router();


//GET ALL NOTIFICATION By UESER
router.get('/:id',getnotification);

//ADD NEW NOTIFICATION
router.post('/add/',addnotification);
//PUT  NOTIFICATION
router.put('/update/:id',updatenotification);
//Delete  NOTIFICATION
router.delete('/delete/:id',deletenotification);


module.exports = router;