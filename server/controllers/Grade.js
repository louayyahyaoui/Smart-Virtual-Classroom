const Grade = require('../models/Grade.js');

module.exports = { 

  
  rendreTask :  (req,res) =>{

   
    try {
      Grade.findByIdAndUpdate(req.body._id, req.body, {
        useFindAndModify: false,
      }).then((grade) => res.json(grade));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }


},
  getDetailByTaskByStudent : (req,res,next) =>{
    try {
        
      Grade.find({_id : req.params.id})
      .populate("task")
      .populate('student')
   
      
     .then((grade)=>res.json(grade));
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
},
 getListQuestionByTask : (req,res,next) =>{
    try {
        
      Grade.find({_id : req.params.id},{_id: 0,grade : 0 ,student : 0 , taskStatus : 0 })
      .populate("task",{_id: 0 ,listQuestion : 1})
   
      
     .then((grades)=>res.json(grades));
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
},
  assignGradeToStudent : (req,res,next) =>{
    const newGrade = new Grade(req.body);
console.log(newGrade);
    try {
            
        Grade.updateOne({_id : newGrade.id} ,{grade : newGrade.grade,taskStatus : "Remis",$push :{listReponse : newGrade.listReponse}})   
        .then((grade)=>res.json(grade));
 
     } catch (error) {
         res.status(404).json({message : error.message});
     }
},
  getTaskByStudent : (req,res,next) =>{
    try {
      const id = req.query.idClass;
        console.log("cc");
       
      //Grade.find({creator : req.query.idUser,cour :req.query.idClass }).then((task) => res.json(task));
      const grade = Grade.find({student : req.query.idUser})
      //.populate({ path: 'task', cour: req.query.idClass })
      .  populate({
        path: "task", // populate blogs
        populate: {
           path: "cour" ,
           
     
        }
     })
     //.populate('task')
      .populate('student')
      
      .
      then((grade)=>{
        const grades = [];

       grade.forEach(element => {
         if(id.localeCompare(element.task.cour._id)===0){
          
              grades.push(element);
         }
        
        })

      res.json(grades)});
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
},
    getGradeByTask : (req,res,next) =>{
    try {
       Grade.find().then((grade)=>res.json(grade));
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }
},

  addGrade : (req,res) =>{

    const grade = req.body;
    const newGrade = new Grade(grade);
   try {

    newGrade.save();
    
     res.status(201).json(newGrade);

   } catch (error) {
       res.status(400).json({message : error.message});
   }


}
 
}