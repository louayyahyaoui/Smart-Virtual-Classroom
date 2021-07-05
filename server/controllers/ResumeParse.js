const UserData = require("../models/UserData");
const generateUniqueId = require('generate-unique-id');

module.exports = {
  parseEducation: (myeducation) => {
    let array = [];
    let education = [];
    array = myeducation.split(",");

    for (let i = 0; i < 3; i++) {
      const idEducation = generateUniqueId();
      let str = "" + array[i];
      let edu = {
        id:idEducation,
        dateDebut: "",
        dateEnd: "",
        description: "",
      };

      if (str.match(/\d+/).index != null) {
        const x = str.substring(0, str.match(/\d+/).index);
        let ii = str.match(/\d+/).index;
        let d = str.substring(ii, str.length);
        let date = d.split("-");
        date;
        edu.dateDebut = date[0];
        edu.dateEnd = date[1];
        edu.description = x;

        education.push(edu);
      }
    }
    return education;
  },
  experienceParse: (str,idexperience) => {
    x = Array.from(new Set(str.split("Stage")));
    ///console.log(title)
    experience = [];
    array = [];
    array = x;
    let ii = str.match(/\d+/).index;
    for (let i = 0; i < array.length; i++) {
      const idexperience = generateUniqueId();

      let strrr = "" + array[i];
      let edu = {
        id:idexperience,
        dateDebut: "",
        dateFin: "",
        title: "",

        description: "",
      };
      //console.log(strrr)
      if (strrr.match(/\d+/) !== null) {
        let title = strrr.substring(0, strrr.match(/\d+/).index);
        let dateedebut = strrr.substring(
          strrr.match(/\d+/).index,
          strrr.indexOf("-")
        );
        let dateefin = strrr.substring(
          strrr.indexOf("-") + 1,
          strrr.indexOf(",")
        );
        let description = strrr.substring(strrr.indexOf(",") + 1, strrr.length);

        edu.dateDebut = dateedebut;
        edu.dateFin = dateefin;
        edu.title = title;
        edu.description = description.split(".");
        experience.push(edu);
      }
    }
    return experience;
  },
  skillsParse: (skills) => {
    let skillstab = [];
    skillstab = skills.split(" ");
    return skillstab;
  },
  languageParse: (langue) => {
    let newstringreplaced = langue.replace(/Full/g, ",Full");

    let newstringreplaced2 = newstringreplaced.replace(/ciency/g, "ciency,");
    let newstringreplaced3 = newstringreplaced2.replace(
      /Allemand/g,
      "Allemand,"
    );

    let lang = Array.from(new Set(newstringreplaced3.split(",")));
    let languages = [];
    for (let i = 0; i < lang.length; i++) {
      if (!lang[i].includes(" ")) {
        languages.push(lang[i]);
      }
    }

    return languages;
  },
  interestParse: (interet) => {
    let newstringreplaced2 = interet.replace(/Tâches/g, "");

    newstringreplaced1 = newstringreplaced2.replace(/(\r\n|\n|\r)/gm, "");
    let newstringreplaced = newstringreplaced1.replace(/CampingNatation/g, "");

    let inter = Array.from(new Set(newstringreplaced.toString().split(" ")));
    const result = inter.filter((i) => i !== "");

    return result;
  },
  getUserData: async (req, res, next) => {
    try {
      const { id } = req.params;
      /// console.log(id)
      const data = await UserData.find({ idUser: id }).then((element) => {
        element.forEach((e) => {
          e.experiences.forEach((exp) => {
            exp.dateDebut = new Date("01".concat("/", exp.dateDebut));
            if (exp.dateFin !== undefined && exp.dateFin !== null) {
              if (exp.dateFin.trim() === "Present") {
                exp.dateFin = new Date();
              } else {
                exp.dateFin = new Date("01".concat("/", exp.dateFin));
              }
            } else {
              exp.dateFin = null;
            }
          });
          e.formation.forEach((edu) => {
            edu.dateDebut = new Date("01".concat("/", edu.dateDebut));
            if (edu.dateEnd !== undefined && edu.dateEnd !== null) {
              if (edu.dateEnd.trim() === "Present") {
                edu.dateEnd = new Date();
              } else {
                edu.dateEnd = new Date("01".concat("/", edu.dateEnd));
              }
            } else {
              edu.dateEnd = null;
            }
          });

          return res.status(200).json({
            status: 200,
            data: e,
            message: "Succesfully UserDatas Retrieved",
          });
        });
      });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  },
};
