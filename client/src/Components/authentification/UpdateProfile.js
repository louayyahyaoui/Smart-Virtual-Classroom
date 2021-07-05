import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import Formation from "./Formation";
import Experience from "./Experience";
import CentresInteret from "./CentresInteret";
import Skills from "./Skills";
import Langues from "./Langues"
import ModalProfile from "./ModalProfile"
import {
  Image,
  Item,
  Button,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Radio,
  Loader,
  Segment,
  Label
} from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import ModalChangeProfilePicture from "./ModalChangeProfilePicture";
import axios from "axios";
import { isAuth, setLocalStorage } from "../../helpers/auth";
import { getUserById, getUserDataById, UpdateUserState } from "../../redux/slices/User";
import { useParams } from "react-router";
import ModalChangePassword from "./ModalChangePassword";
import Dropzone from "react-dropzone-uploader";
import ModalUploadCV from "./ModalUploadCV";
import ViewCv from "./ViewCv"
import Contact from "./Contact";
import Bio from "./Bio";
import ProfileStrength from "./ProfileStrength"
function UpdateProfile() {
  const data = useSelector((state) => state.user.UserDataById);

  //console.log(data);
  const resume = useSelector((state) => state.user.resume);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [sexe, setSexe] = useState("");
  const [UserCV, setUserCv] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(Date.now());
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const Resources = useSelector((state) => state.user.Resources);
  const userById = useSelector((state) => state.user.UserById);
  const [loader, SetLoader] = useState(false);
  const [formation, setFormation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [langues, setLangues] = useState([]);
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState([]);
  const [interets, setInterets] = useState([]);
  const [progress, setProgress] = useState(0)
  const [progressD, setProgressD] = useState(0)


  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getUserDataById(id)).then((res) => {

      // console.log(res);
      if (res.payload.data) {
      
          setFormation(res.payload.data.formation);
        
          setExperience(res.payload.data.experiences);
         
          setLangues(res.payload.data.langues);
       
          setSkills(res.payload.data.skills);
        
      
          setProject(res.payload.data.project);
      
      
          setInterets(res.payload.data.interets);
          
     
        
      }
    });
    dispatch(getUserById(id)).then((res) => {
      setName(res.payload.name);

      setEmail(res.payload.email);

      setBio(res.payload.bio);

      setLinkedIn(res.payload.linkedInUrl);

      setGithub(res.payload.GithubUrl);

      setUserCv(res.payload.cv);

      setAddress(res.payload.address);

      setSexe(res.payload.sexe);

      setBirthday(res.payload.birthday);

    


    });
    console.log(resume);
    ;
    if (resume !== "") {
      console.log("dkhaalna");
      setUserCv(resume);
      console.log(UserCV)
    }
  }, [id]);


  const handleSexeChange = (e, { value }) => {
    setSexe(value);

  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleLinkedInChange = (e) => {
    setLinkedIn(e.target.value);
  };
  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const updateProfile = () => {
    SetLoader(true);



    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${isAuth()._id
        }`,
        {
          name: name,
          bio: bio,
          linkedInUrl: linkedIn,
          GithubUrl: github,
          picture: Resources,
          sexe: sexe,
          address: address,
          cv: resume,
          birthday: birthday,
        }
      )
      .then((res) => {
        SetLoader(false);
        dispatch(UpdateUserState());
        setLocalStorage("user", res.data.result);
        setFormSuccessMessage("Your profile was updated successfully !");
        SetFormClassName("success");

      })
      .catch((err) => {
        setFormSuccessMessage("Something went wrong !!");
        SetFormClassName("warning");
      });
  };

  const d = new Date(birthday);
  const initialDateValue = d;


  return (
    <div>

      <Grid >

        {/*  display  Profil picture and contact */}
        <Grid.Row >
          <Grid.Column width={3}>
          </Grid.Column>

          <Grid.Column width={9}>

            <Header as="h2" dividing>
              Profile
            </Header>
            <br />

            <Contact

              name={name} setName={name => setName(name)}
              email={email} setEmail={email => setEmail(email)}
              sexe={sexe} setSexe={sexe => setSexe(sexe)}
              address={address} setAddress={address => setAddress(address)}
              birthday={birthday} setBirthday={birthday => setBirthday(birthday)}
              linkedIn={linkedIn} setLinkedIn={linkedIn => setLinkedIn(linkedIn)}
              github={github} setGithub={github => setGithub(github)}
              cv={resume}
              bio={bio}
            />

          </Grid.Column>

        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <ProfileStrength progress={( formation !== [] && experience !== [] && bio !== null) ? 4  :
           0
                                }  />
          </Grid.Column>
        </Grid.Row>

        {/* Display info  */}
        <Grid.Row >
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >

            <Bio
              bio={bio} setBio={bio => setBio(bio)}
              name={name}
              email={email}
              sexe={sexe}
              address={address}
              birthday={birthday}
              linkedIn={linkedIn}
              github={github}

            />
          </Grid.Column>
        </Grid.Row>
        {/*  display  formation  */}

        <Grid.Row >
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <Formation
              formation={formation}
              addFormation={formation => setFormation(formation)}

            />
          </Grid.Column>
        </Grid.Row>

        {/*  display  Experience  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <Experience experience={experience} />
          </Grid.Column>
        </Grid.Row>

        {/*  display  Skills  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >

            <Skills skills={skills} deleteskills={skills => setSkills(skills)} />
          </Grid.Column>
        </Grid.Row>

        {/*  display  Langues  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <Langues langues={langues} />
          </Grid.Column>
        </Grid.Row>

        {/*  display  interet  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <CentresInteret interets={interets} />
          </Grid.Column>
        </Grid.Row>


        {/*  display  resume  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <ViewCv

              name={name}
              email={email}
              sexe={sexe}
              address={address}
              birthday={birthday}
              linkedIn={linkedIn}
              github={github}
              cv={resume}
              bio={bio}
            />
          </Grid.Column>
        </Grid.Row>

        {/*  display  update password  */}

        <Grid.Row>
          <Grid.Column width={3}>
          </Grid.Column>
          <Grid.Column width={9} >
            <ModalChangePassword></ModalChangePassword>
          </Grid.Column>
        </Grid.Row>






      </Grid>
    </div>
  );
}

export default UpdateProfile;
