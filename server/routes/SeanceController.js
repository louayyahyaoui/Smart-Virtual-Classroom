const express = require("express");
const RateLimit = require("express-rate-limit");
const stringCapitalizeName = require("string-capitalize-name");
var router = express.Router();
const mongoose = require("mongoose");
const Seance = mongoose.model("Seance");

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs
  delayMs: 0, // Disable delaying - full speed until the max limit is reached
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      msg: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

// READ (ALL)
router.get("/", (req, res) => {
  Seance.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
  Seance.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Seance.` });
    });
});

// READ (ONE BY ID CLASS)
router.get("/findByIdClass/:id", (req, res) => {
  Seance.find({idClass:req.params.id})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Seance.` });
    });
});

// ADD
router.post("/", (req, res) => {
  
  let newSeance = new Seance({
    
    idClass: req.body.idClass,
    titre: sanitizeTitre(req.body.titre),
    description: sanitizeDescription(req.body.description),
    dateCreation: Date.now(),
  });
  console.log(newSeance);
  newSeance
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          idCour: result.idCour,
          idClass: result.idClass,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.titre) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.titre.message });
          return;
        }
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  Seance.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idCour: result.idCour,
          idClass: result.idClass,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedSeance = {
    idClass: req.body.idClass,
    titre: sanitizeTitre(req.body.titre),
    description: sanitizeDescription(req.body.description),
    dateCreation: Date.now(),
  };

  Seance.findOneAndUpdate({ _id: req.params.id }, updatedSeance, {
    runValidators: true,
    context: "query",
  })
    .then((oldResult) => {
      Seance.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              idCour: newResult.idCour,
              idClass: newResult.idClass,
              titre: newResult.titre,
              description: newResult.description,
              dateCreation: newResult.dateCreation,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.titre) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.titre.message });
          return;
        }
        if (err.errors.description) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.description.message });
          return;
        }
        if (err.errors.dateCreation) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.dateCreation.message });
          return;
        }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeTitre = (titre) => {
  return stringCapitalizeName(titre);
};
sanitizeDescription = (description) => {
  return description.toLowerCase();
};
