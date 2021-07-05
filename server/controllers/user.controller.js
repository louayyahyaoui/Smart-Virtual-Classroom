const User = require("../models/auth.model");
const UserData = require("../models/UserData");
const { v4: uuidv4 } = require('uuid');
const ResumeParser = require("resume-parser");
const expressJwt = require("express-jwt");
const {
  parseEducation,
  experienceParse,
  skillsParse,
  interestParse,
  languageParse,
} = require("./ResumeParse");
multer = require("multer");

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

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
    }
    cb(null, true);
  },
});

exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;

    res.json(user);
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;

    res.json(user);
  });
};

exports.updateController = (req, res) => {
  // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
  const { name, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password should be min 6 characters long",
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;

      res.json(updatedUser);
    });
  });
};

///// User Data Update Fields //////
 // delete Experience
exports.deleteUserDataExperience = (req, res) => {


 
  
    try {
      UserData.findOneAndUpdate({ idUser: req.params.id },
  
        { "$pull": { "experiences": { "id": req.body.id } }}, { safe: true, multi:true }
       )
        .then((data) => {
  
          res.status(201).json(data.formation)
  
        }
      
        )
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  
  
  };
// add Experience UserData
exports.addUserDataExperience = (req, res) => {


  let form = {
    id: uuidv4(),
    title: req.body.title,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateEnd,
    description: req.body.description
  }

  try {

    UserData.findOneAndUpdate({ idUser: req.params.id },

      {
        "$push": {
          'experiences': form
        }

      },

    )

      .then((data) => {
      

        res.status(201).json(data)
      })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }



};
// Update Experience in USERDATA
exports.updateUserDataExperience = (req, res) => {

  let experience = {
    id: req.body.id,
    title: req.body.title,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    description: req.body.description
  }
  try {
    UserData.findOneAndUpdate({ idUser: req.params.id, 'experiences.id': experience.id },

      {
        "$set": {
          'experiences.$.title': experience.title,
          'experiences.$.dateDebut': experience.dateDebut,
          'experiences.$.dateEnd': experience.dateEnd,
          'experiences.$.description': experience.description,
        }
      })
      .then((data) => {

        res.status(201).json(data);
      })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }



};

// delete formatio in userDATA

exports.deleteUserDataFormation = (req, res) => {


console.log(req.body.id);

  try {
    UserData.findOneAndUpdate({ idUser: req.params.id },

      { "$pull": { "formation": { "id": req.body.id } }}, { safe: true, multi:true }
     )
      .then((data) => {

        res.status(201).json(data.formation)

      }
    
      )
  } catch (error) {
    res.status(404).json({ message: error.message });
  }


};
// Update Formation in USERDATA
exports.updateUserDataFormation = (req, res) => {

  let form = {
    id: req.body.id,
    title: req.body.title,
    dateDebut: req.body.dateDebut,
    dateEnd: req.body.dateEnd,
    description: req.body.description
  }

  try {
    UserData.findOneAndUpdate({ idUser: req.params.id, 'formation.id': form.id },

      {
        "$set": {
          'formation.$.title': form.title,
          'formation.$.dateDebut': form.dateDebut,
          'formation.$.dateEnd': form.dateEnd,
          'formation.$.description': form.description,
        }
      })
      .then((data) => {

        res.status(201).json(data.formation)

      })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }


};

// add Formation UserData
exports.addUserDataFormation = (req, res) => {

  let form = {
    id: uuidv4(),
    title: req.body.title,
    dateDebut: req.body.dateDebut,
    dateEnd: req.body.dateEnd,
    description: req.body.description
  }



  try {
    UserData.findOneAndUpdate({ idUser: req.params.id },

      {
        "$push": {
          'formation': form
        }

      },

    )
      .then((data) => {

        res.status(200).json(data.formation);

      })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }


};
// delete skills in UserDara

exports.deleteUserDataSkills = (req, res) => {


  console.log(req.body.id);
  
    try {
      UserData.findOneAndUpdate({ idUser: req.params.id },
  
        { $pull: { skills : { $in : req.body.skill } } }
       )
        .then((data) => {
  
          res.status(201).json(data.skills)
  
        }
      
        )
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  
  
  };
// Update Skills in USERDATA
exports.updateUserDataSkills = (req, res) => {
  let skills = req.body.skills;

  UserData.findOneAndUpdate({ idUser: req.params.id }, { skills: skills })
    .then(() => {
      UserData.findOne({ idUser: req.params.id }).then((UserFound) => {
        res.status(201).json(UserFound);
      })

    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
};

// delete Languages in UserDara

exports.deleteUserDataLanguages = (req, res) => {


   
    try {
      UserData.findOneAndUpdate({ idUser: req.params.id },
  
        { $pull: { langues : { $in : req.body.langue } } }
       )
        .then((data) => {
  
          res.status(201).json(data.langues)
  
        }
      
        )
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  
  
  };
// Update Languages in USERDATA

exports.updateUserDataLanguages = (req, res) => {
  let languages = req.body.languages;

  UserData.findOneAndUpdate({ idUser: req.params.id }, { langues: languages })
    .then(() => {
      UserData.findOne({ idUser: req.params.id }).then((UserFound) => {
        res.status(201).json(UserFound);
      })

    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
};



// delete Interestes in UserDara

exports.deleteUserDataInteret = (req, res) => {


   
  try {
    UserData.findOneAndUpdate({ idUser: req.params.id },

      { $pull: { interets : { $in : req.body.interet } } }
     )
      .then((data) => {

        res.status(201).json(data.interets)

      }
    
      )
  } catch (error) {
    res.status(404).json({ message: error.message });
  }


};
// Update Interestes in USERDATA

exports.updateUserDataInterestes = (req, res) => {
  let interes = req.body.interes;

  UserData.findOneAndUpdate({ idUser: req.params.id }, { interets: interes })
    .then(() => {
      UserData.findOne({ idUser: req.params.id }).then((UserFound) => {
        res.status(201).json(UserFound);
      })

    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
};


///// User Data Update Fields //////

exports.updateProfileController = (req, res) => {
  let updatedProfile = {
    name: req.body.name,
    bio: req.body.bio,
    picture: req.body.picture,
    linkedInUrl: req.body.linkedInUrl,
    GithubUrl: req.body.GithubUrl,
    sexe: req.body.sexe,
    address: req.body.address,
    phone: req.body.phone,
    birthday: req.body.birthday,
    cv: req.body.cv,
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedProfile, {}).then(
    (oldResult) => {

      User.findOne({ _id: req.params.id })
        .then((result) => {
          ResumeParser.parseResumeUrl(result.cv) //input file, output dir
            .then((res) => {
              const education = parseEducation(res.education);
              const experience = experienceParse(res.experience);
              const skills = skillsParse(res.skills);
              const languages = languageParse(res.languages);
              const interests = interestParse(res.interests);

              const data = new UserData({
                idUser: result._id,
                formation: education,
                experiences: experience,
                skills: skills,
                langues: languages,
                interets: interests,
              });

              try {

                UserData.updateOne({ idUser: result._id }, {
                  formation: education,
                  experiences: experience,
                  skills: skills,
                  langues: languages,
                  interets: interests,
                }, function (
                  err,
                  result
                ) {
                  if (err) {
                    res.send(err);
                  }
                });

              } catch (error) {
                return res.status(400).json({ status: 400, message: error.message });
              }
            });
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: result._id,
              name: result.name,
              bio: result.bio,
              picture: req.body.picture,
              linkedInUrl: result.linkedInUrl,
              GithubUrl: result.GithubUrl,
              role: result.role,
              salt: result.salt,
              email: result.email,
              sexe: result.sexe,
              address: result.address,
              phone: result.phone,
              cv: result.cv,
              birthday: result.birthday,
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
    }
  );
};

exports.GetPictureOfUser = (req, res) => {
  const name = req.body.username;
  console.log(name);

  User.findOne({ name: name })
    .then((result) => {
      console.log("this is result " + result);
      res.json(result.picture);
    })

    .catch((err) => {
      console.log("false1");
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
      return;
    });
};

exports.test = (req, res) => {
  const name = req.body.username;
  User.findOne({ name: name }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    res.json(user);
  });
};
