const User = require("../models/auth.model");
const UserData = require("../models/UserData");

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
// function getDate(d) {
//   var day, month, year;

//   result = d.match("[0-9]{2}([-/ .])[0-9]{2}[-/ .][0-9]{4}");
//   if (null != result) {
//     dateSplitted = result[0].split(result[1]);
//     day = dateSplitted[0];
//     month = dateSplitted[1];
//     year = dateSplitted[2];
//   }
//   result = d.match("[0-9]{4}([-/ .])[0-9]{2}[-/ .][0-9]{2}");
//   if (null != result) {
//     dateSplitted = result[0].split(result[1]);
//     day = dateSplitted[2];
//     month = dateSplitted[1];
//     year = dateSplitted[0];
//   }

//   if (month > 12) {
//     aux = day;
//     day = month;
//     month = aux;
//   }

//   return year + "/" + month + "/" + day;
// }
// const countOccurences = (string, word) => {
//   return string.split(word).length - 1;
// };
// const findIndex = (data) => {
//   return data === "" && countOccurences(data, "-") === 0
//     ? ""
//     : countOccurences(data, "-") < 2
//     ? data.substring(0, data.indexOf("-"))
//     : findIndex(data.substring(0, data.indexOf("-")));
// };
// const educationArray = (edu) => {
//   const arr = [];
//   console.log(findIndex(edu));
//   /*
//     arr.push(findIndex(edu))
//     //console.log(arr)
//     const indexedCaracter = edu.indexOf('\n')
//     if (edu.indexOf('-') === -1)
//     edu = ''
//     else {
//     edu = edu.substring(indexedCaracter, edu.length)
//     arr.push(edu)

//   }*/
//   return arr;
// };
exports.updateProfileController = (req, res) => {
  let updatedProfile = {
    name: req.body.name,
    bio: req.body.bio,
    picture: req.body.picture,
    linkedInUrl: req.body.linkedInUrl,
    GithubUrl: req.body.GithubUrl,
    sexe: req.body.sexe,
    address: req.body.address,
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
                data.save();
                //  res.status(201).json(data);
              } catch (error) {
                res.status(400).json({ message: error.message });
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
