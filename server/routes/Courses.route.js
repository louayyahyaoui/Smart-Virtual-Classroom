let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");
const RateLimit = require("express-rate-limit");

router = express.Router();

const DIR = "./uploads/file";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

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

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "video/ogg" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/x-matroska" ||
      file.mimetype == "audio/wav" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "audio/mpeg" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/doc" ||
      file.mimetype == "application/msword" ||
      file.mimetype == "application/javascript" ||
      file.mimetype == "application/json" ||
      file.mimetype == "application/vnd.ms-powerpoint" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype == "application/x-rar-compressed" ||
      file.mimetype == "application/xlsx" ||
      file.mimetype == "application/xls"
    ) {
    }
    cb(null, true);
  },
});

// Courses model
let Courses = require("../models/courses.model");

// TEST

router.post(
  "/upload",
  upload.array("multiple_resources", 6),
  (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    if (req.files) {
      for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(
          "http://localhost:5000/uploads/file/" + req.files[i].filename
        );
      }
    }

    res.status(201).json({
      msg: "Done upload!",
      success: true,
      result: {
        reqFiles,
      },
    });
  }
);
// POST
router.post("/", upload.array("multiple_resources", 6), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + "://" + req.get("host");
  if (req.files) {
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(
        "http://localhost:5000/uploads/file/" + req.files[i].filename
      );
    }
  }

  console.log("this is idClass");
  console.log(req.body.idClass);

  const course = new Courses({
    //   _id: new mongoose.Types.ObjectId(),
    idClass: req.body.idClass,
    idSeance: req.body.idSeance,
    titre: req.body.titre,
    description: req.body.description,
    dateCreation: Date.now(),
    multiple_resources: reqFiles,
    idOwner: req.body.idOwner,
  });

  course
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "Successfully Added",
        success: true,
        result: {
          idClass: result.idClass,
          idSeance: result.idSeance,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
          multiple_resources: result.multiple_resources,
          idOwner: result.idOwner,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          success: false,
          error: err,
        });
    });
});

router.get("/", (req, res) => {
  Courses.find({})
    .populate("idOwner")
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
  Courses.findById(req.params.id)
    .populate("idOwner")
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such course.` });
    });
});

// READ (ONE BY ID CLASS)
router.get("/findByIdClass/:id", (req, res) => {
  Courses.find({idClass:req.params.id})
    .populate("idOwner")
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such course.` });
    });
});

// READ (ONE WITH ID-SEANCE)
router.get("/findByIdSeance/:id", (req, res) => {
  Courses.find({ idSeance: req.params.id })
    .populate("idOwner")
    .then((result) => {
      success: true, res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such course.` });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  Courses.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          idClass: result.idClass,
          idSeance: result.idSeance,
          titre: result.titre,
          description: result.description,
          dateCreation: result.dateCreation,
          multiple_resources: result.multiple_resources,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  let updatedCourses = {
    
    titre: req.body.titre,
    description: req.body.description,
    dateCreation: Date.now(),
    multiple_resources: req.body.multiple_resources,
    idSeance: req.body.idSeance,
  };

  console.log(updatedCourses);

  Courses.findOneAndUpdate({ _id: req.params.id }, updatedCourses, {
    runValidators: true,
    context: "query",
  })

    .then((oldResult) => {
      console.log("true");
      Courses.findOne({ _id: req.params.id })
        .then((result) => {
          console.log("this is result " + result);
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: result._id,
              idSeance: result.idSeance,
              titre: result.titre,
              description: result.description,
              dateCreation: result.dateCreation,
              multiple_resources: result.multiple_resources,
            },
          });
        })

        .catch((err) => {
          console.log("false1");
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      console.log(err);
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
