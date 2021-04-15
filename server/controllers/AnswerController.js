var Answer = require("../models/answer");


module.exports = {
  
   
    getAnswerByQuestion : async(req,res,next) =>{
    try {
    const { id } = req.params;
    const answers = await Answer.find({Question : id }).populate('Question').populate('Writer').populate({path:"Question",populate : {
      path:"Writerq"
    }});;
    return res
    .status(200)
    .json(
       answers
     );

    } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });

        }

},

getAnswerByWriter : async(req,res,next) =>{
    try {
    const { id } = req.params;
    const answers = await Answer.find({Writer : id });
    return res
    .status(200)
    .json({
      status: 200,
      data: answers,
      message: "Succesfully Questions Retrieved",
    });

    } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });

        }

},

addAnswer: async (req, res) => {
    const Answerr = req.body;
    const newAnswer = new Answer(Answerr);
    try {
        const result=await newAnswer.save();
      res.status(201).json( result);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
  deletAnswer: async (req, res) => {

    try {
        const { id } = req.params;
        Answer.findOneAndDelete({ _id: id }, function (err) {
            if(err) console.log(err);
            return res.status(205).json({ status: 205, message: 'Successful deletion' });
        });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
  updateAnswer: async (req, res) => {
    const AnswerUpdated = req.body;
    try {
        const { id } = req.params;
     
        Answer.updateOne({ _id: id }, { Body: AnswerUpdated.Body,Filee: AnswerUpdated.Filee }, function(
        err,
        result
      ) {
        if (err) {
          res.send(err);
        } else {
            res.status(201).json( result);
        }
      });
      
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },

 
};
