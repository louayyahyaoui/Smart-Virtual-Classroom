var request = require("request");
const UserData = require("../models/UserData");
const fs = require("fs");

module.exports = {
  getAllRecomandationCourse: async (req, res) => {
    try {
      const { id } = req.params;
      var dictionary;
      let category;
      //get current user data
      const skills = await UserData.find({ idUser: id }).select("skills");
      fs.readFile(
        "./config/RecomandationDictionnairie.json",
        "utf8",
        function (err, data) {
          if (err) throw err;
          dictionary = JSON.parse(data);
          dictionary.forEach((element) => {
            skills[0].skills.forEach((skill) => {
              if (element.category.skills.indexOf(skill) != -1) {
                category = element.category.type;
              }
            });
          });
          //get recomanded Courses
          var options = {
            url:
              "https://www.udemy.com/api-2.0/courses/?subcategory=" +
              category +
              "&page=2&page_size=10000",
            auth: {
              user: "27A2MCEu4hqOad1fJiR9Wc9Xp5TM2PBoMC7uyLyt",
              pass: "4QJF0wULImAGLuV3x6Gmfy6wlELENUrLoe4p8tq7zSveBssDu3VAoq9ZkOHa6bvXOFYahoQecaJmbptssVcmVCDbmeqSCId1zDLNqRjMBreN0zZVWbHRhFFxI6sdBy2g",
            },
          };
          function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
              return res.status(200).json(JSON.parse(body).results);
            }
          }

          request(options, callback);
        }
      );
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
};
