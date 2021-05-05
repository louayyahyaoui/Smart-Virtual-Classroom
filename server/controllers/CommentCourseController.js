var CommentCourse = require("../models/CommentCourse");

const mongoose = require("mongoose");
module.exports = {
  
   
    getCourseByCourse : async(req,res,next) =>{
    try {
    const  id  = req.params.id;
    const cmntcours = await CommentCourse.find({Course :  mongoose.Types.ObjectId(req.params.id)}).populate("Writer");
   
    return res
    .status(200)
    .json(
      cmntcours
     );

    } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });

        }

},
getCourseBytask : async(req,res,next) =>{
  try {
  const  id  = req.params.id;
  const cmntcours = await CommentCourse.find({Task :  mongoose.Types.ObjectId(req.params.id)}).populate("Writer");
 
  return res
  .status(200)
  .json(
    cmntcours
   );

  } catch (error) {
  return res.status(400).json({ status: 400, message: error.message });

      }

},


addCommentCourse: async (req, res) => {
    const Comment = req.body;
    const newComment = new CommentCourse(Comment);
    try {
        const result=await newComment.save();
      res.status(201).json( result);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
  deleteCommentCourse: async (req, res) => {

    try {
        const { id } = req.params;
        CommentCourse.findOneAndDelete({ _id: id }, function (err) {
            if(err) console.log(err);
            return res.status(205).json({ status: 205, message: 'Successful deletion' });
        });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
  updateCommentCourse: async (req, res) => {
    const commentUpdated = req.body;
    try {
        const { id } = req.params;
     
        CommentCourse.updateOne({ _id: mongoose.Types.ObjectId(req.params.id)} , { Body: commentUpdated.Body }, function(
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
