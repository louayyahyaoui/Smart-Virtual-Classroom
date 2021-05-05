let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");
const RateLimit = require("express-rate-limit");
const { Storage } = require("@google-cloud/storage");

const perf = require("execution-time")();
router = express.Router();

// Create new storage instance with Firebase project credentials
const storages = new Storage({
  projectId: "smart-closer",
  keyFilename: "./smart-closer-firebase-adminsdk-75ops-25473d0d1e.json",
});

// Create a bucket associated to Firebase storage bucket
const bucket = storages.bucket("gs://smart-closer.appspot.com");

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 300 * 1024 * 1024, // limiting files size to 5 MB
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

function UploadingArray(files) {
  const reqFiles = [];
  let wakt;
  try {
    for (let i = 0; i < files.length; i++) {
      if (!files[i]) {
        return;
      }

      // Create new blob in the bucket referencing the file
      const blob = bucket.file(files[i].originalname);

      // Create writable stream and specifying file mimetype
      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: files[i].mimetype,
        },
      });

      blobWriter.on("error", (err) => next(err));
      {
        perf.start();
        blobWriter.on("finish", async () => {
          // Assembling public URL for accessing the file via HTTP

          await reqFiles.push({
            type: files[i].mimetype,
            originalname: files[i].originalname,

            url: `https://firebasestorage.googleapis.com/v0/b/${
              bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`,
          });

          // Return the file name and its public URL

          const results = perf.stop();
          console.log(results.time);
          // console.log(results.time);
        });
      }

      // When there is no more data to be consumed from the stream
      blobWriter.end(files[i].buffer);
    }
  } catch (error) {
    // res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
  console.log("time !!!!!!!!!!");
  console.log(wakt);
  const test = {
    reqFiles: reqFiles,
    timer: wakt,
  };
  return test;
}

// Upload endpoint to send file to Firebase storage bucket
router.post(
  "/api/upload",
  uploader.array("multiple_resources", 6),
  async (req, res, next) => {
    const reqFiles = [];
    try {
      perf.start();
      for (let i = 0; i < req.files.length; i++) {
        if (!req.files[i]) {
          return;
        }

        // Create new blob in the bucket referencing the file
        const blob = bucket.file(Date.now() + "-" + req.files[i].originalname);

        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.files[i].mimetype,
          },
        });

        blobWriter.on("error", (err) => next(err));
        {
          blobWriter.on("finish", async () => {
            // Assembling public URL for accessing the file via HTTP

            await reqFiles.push({
              type: req.files[i].mimetype,
              originalname: req.files[i].originalname,

              url: `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
              }/o/${encodeURI(blob.name)}?alt=media`,
            });

            // Return the file name and its public URL

            if (i + 1 === req.files.length) {
              const results = perf.stop();
              console.log(results.time);
              setTimeout(() => {
                res.status(200).send({
                  result: {
                    reqFiles,
                  },
                });
              }, results.time);
            }

            // console.log(results.time);
          });
        }

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.files[i].buffer);
      }
    } catch (error) {
      // res.status(400).send(`Error, could not upload file: ${error}`);
      return;
    }
  }
);
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
router.post(
  "/",
  uploader.array("multiple_resources", 6),
  async (req, res, next) => {
    console.log(req.files);
    const reqFiles = [];
    try {
      for (let i = 0; i < req.files.length; i++) {
        if (!req.files[i]) {
          // res.status(400).send("Error, could not upload file");
          return;
        }

        // Create new blob in the bucket referencing the file
        const blob = bucket.file(Date.now() + "-" + req.files[i].originalname);

        // Create writable stream and specifying file mimetype
        const blobWriter = await blob.createWriteStream({
          metadata: {
            contentType: req.files[i].mimetype,
          },
        });

        blobWriter.on("error", (err) => next(err));
        perf.start();
        blobWriter.on("finish", async () => {
          // Assembling public URL for accessing the file via HTTP
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;

          // Return the file name and its public URL

          await reqFiles.push({
            type: req.files[i].mimetype,
            originalname: req.files[i].originalname,

            url: publicUrl,
          });
          const results = perf.stop();
          console.log(results.time);
          if (i + 1 === req.files.length) {
            setTimeout(() => {
              console.log("this is resources");
              console.log(i + 1);
              console.log(req.files.length);
              console.log(reqFiles);
              const course = new Courses({
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
                    time: results.time,
                    result: {
                      _id: result._id,
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
            }, results.time);
          }
        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.files[i].buffer);
      }
    } catch (error) {
      // res.status(400).send(`Error, could not upload file: ${error}`);
      return;
    }

    console.log("this is idClass");
    console.log(req.body.idClass);
  }
);

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
  Courses.find({ idClass: req.params.id })
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
