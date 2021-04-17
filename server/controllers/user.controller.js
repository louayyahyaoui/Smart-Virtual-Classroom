const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
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

exports.updateProfileController = (req, res) => {
  let updatedProfile = {
    name: req.body.name,
    bio: req.body.bio,
    picture: req.body.picture,
    linkedInUrl: req.body.linkedInUrl,
    GithubUrl: req.body.GithubUrl,
  };
  console.log(updatedProfile);

  User.findOneAndUpdate({ _id: req.params.id }, updatedProfile, {}).then(
    (oldResult) => {
      console.log("true");
      User.findOne({ _id: req.params.id })
        .then((result) => {
          console.log("this is result " + result);
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
