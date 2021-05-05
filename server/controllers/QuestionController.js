const answer = require("../models/answer");
var Question = require("../models/question");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const mongoose = require("mongoose");
const perf = require("execution-time")();

const storages = new Storage({
  projectId: "smart-closer",
  keyFilename: "./smart-closer-firebase-adminsdk-75ops-25473d0d1e.json",
});

const bucket = storages.bucket("gs://smart-closer.appspot.com");

/*var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/file/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");*/

module.exports = {
  uploads: async (req, res, next) => {
    const reqFiles = [];
    console.log(req.files);
    try {
      perf.start();
      for (let i = 0; i < req.files.length; i++) {
        if (!req.files[i]) {
          return;
        }

        // Create new blob in the bucket referencing the file
        const blob = bucket.file(req.files[i].originalname);

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

            await reqFiles.push(encodeURI(blob.name));

            // Return the file name and its public URL

            if (i + 1 === req.files.length) {
              const results = perf.stop();
              console.log(results.time);
              setTimeout(() => {
                res.status(200).send(reqFiles);
              }, results.time);
            }

            // console.log(results.time);
          });
        }

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.files[i].buffer);
      }
    } catch (error) {
      // ;
      return res.status(400).send(`Error, could not upload file: ${error}`);
    }
  },

  getAnswerAndQuestion: async (req, res, next) => {
    try {
      /*const answers = await Question.aggregate([
        { $match: { Class: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "Question",
            as: "Question_Answer",
          },
        },

        { $sort: { "questions.Date": 1 } },
      ]);
      await Question.populate(answers, { path: "Writerq" });

      console.log(answers.Question_Answer);
      return res.status(200).json(answers);
      /* const answerQuestions = await answer.find({}).populate('Question').populate('Writer').populate({path:"Question",populate : {
      path:"Writerq"
    }});
    return res
    .status(200)
    .json(answerQuestions);
*/
      const id = req.params.id;
      const questions = await Question.find({
        Class: mongoose.Types.ObjectId(req.params.id),
      }).populate("Writerq").sort({ Date: -1 });

      return res.status(200).json(questions);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  getAllQuestion: async (req, res) => {
    try {
      const questions = await Question.find({}).populate("Writer");
      return res.status(200).json({
        status: 200,
        data: questions,
        message: "Succesfully Questions Retrieved",
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  getOneQuestion: async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await Question.findOne({
        _id: id,
      });
      if (!question) return next();
      return res.status(200).json({
        status: 200,
        data: question,
        message: "Succesfully Question Retrieved",
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  addQuestion: async (req, res) => {
    const Questionn = req.body;
    const newQuestion = new Question(Questionn);
    try {
      const data = await newQuestion.save();
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    const QuestionUpdated = req.body;
    try {
      const { id } = req.params;

      Question.updateOne(
        { _id: id },
        {
          Title: QuestionUpdated.Title,
          Filee: QuestionUpdated.Filee,
          Body: QuestionUpdated.Body,
        },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.status(201).json(result);
          }
        }
      );
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  deletQuestion: async (req, res) => {
    try {
      const { id } = req.params;
      Question.findOneAndDelete({ _id: id }, function (err) {
        if (err) console.log(err);
        return res
          .status(205)
          .json({ status: 205, message: "Successful deletion" });
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

  uploadFile: async (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.json({ success: false, err });
      }
      return res.json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
      });
    });
  },
  findquestionbyTags: async (req, res, next) => {
    try {
      const  id  = req.params.id;
      const  tags  = req.params.tag;
      const question = await Question.find({$and:[ {Class: mongoose.Types.ObjectId(id)},
       { Hashtags: { $in: ["" + tags]} }]
      }).populate("Writerq");
      if (!question) return next();
      return res.status(200).json(question);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
};
