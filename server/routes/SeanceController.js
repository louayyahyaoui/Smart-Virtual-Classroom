const express = require("express");

var router = express.Router();
const mongoose = require("mongoose");
const Seance = mongoose.model("Seance");

router.get("/", (req, res) => {
  Seance.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.json(docs);
    } else console.log("error");
  });
});

router.get("/delete/:id", (req, res) => {
  Seance.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.json("deleted");
    } else {
      console.log("Error in seance delete :" + err);
    }
  });
});

router.get("/:id", (req, res) => {
  Seance.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.json(doc);
    } else {
      console.log("Error in Find seance :" + err);
    }
  });
});

function insertSeance(req, res) {
  var seance = new Seance();
  seance.idCour = 2;
  seance.titre = "workshop 2";
  seance.description = "during this workshop we will learn REACTJS";
  seance.dateCreation = Date.now();
  seance.save((err, doc) => {
    if (!err) console.log("seance ajouter avec succée " + seance);
    else {
      console.log("Error during add " + err);
    }
  });
}

// function updateSeance(req, res) {
//   Seance.findOneAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         //res.redirect("seance/list");
//       } else {
//         if (err.name == "ValidationError") {
//           handleValidationError(err, req.body);
//           res.render("seance/addOrEdit", {
//             viewTitle: "Update seance",
//             employee: req.body,
//           });
//         } else console.log("Error during record update : " + err);
//       }
//     }
//   );
// }

module.exports = router;
