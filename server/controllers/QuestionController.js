const answer = require("../models/answer");
var Question = require("../models/question");
const multer = require("multer");
const mongoose = require("mongoose");

var storage = multer.diskStorage({
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

var upload = multer({ storage: storage }).single("file");
module.exports = {
  getAnswerAndQuestion: async (req, res, next) => {
    try {
      const { id } = req.params.id;
      const answers = await Question.aggregate([
    { $match: { Class:  mongoose.Types.ObjectId(req.params.id)} },
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
      const { tag } = req.params;
      console.log(tag);
      const question = await Question.find({
        Hashtags: { $in: ["" + tag] },
      });
      if (!question) return next();
      return res.status(200).json(question);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
};
