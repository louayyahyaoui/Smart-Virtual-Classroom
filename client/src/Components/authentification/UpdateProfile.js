import React, { useState, useEffect } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import {
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
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import ModalChangeProfilePicture from "./ModalChangeProfilePicture";
import axios from "axios";
import { isAuth, setLocalStorage } from "../../helpers/auth";
import { getUserById, UpdateUserState } from "../../redux/slices/User";
import { useParams } from "react-router";
import ModalChangePassword from "./ModalChangePassword";
import Dropzone from "react-dropzone-uploader";
import ModalUploadCV from "./ModalUploadCV";

function UpdateProfile() {
  const resume = useSelector((state) => state.user.resume);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [sexe, SetSexe] = useState("");
  const [UserCV,setUserCv]= useState("");
  const [address, SetAddress] = useState("");
  const [birthday, SetBirthday] = useState(Date.now());
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const Resources = useSelector((state) => state.user.Resources);
  const userById = useSelector((state) => state.user.UserById);
  const [loader, SetLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    

    dispatch(getUserById(id)).then((res) => {
      setName(res.payload.name);
      setEmail(res.payload.email);
      if (res.payload.bio) {
        setBio(res.payload.bio);
      }
      if (res.payload.linkedInUrl) {
        setLinkedIn(res.payload.linkedInUrl);
      }
      if (res.payload.GithubUrl) {
        setGithub(res.payload.GithubUrl);
      }
     
        setUserCv(res.payload.cv);
      
      
      if (res.payload.address) {
        SetAddress(res.payload.address);
      }
      if (res.payload.sexe) {
        SetSexe(res.payload.sexe);
      }
      if (res.payload.birthday) {
        SetBirthday(res.payload.birthday);
      }

      
    });
    console.log(resume);
;
    if (resume !== "") {
  
      setUserCv(resume);
   
    }
  
  }, [resume]);

  const handleSexeChange = (e, { value }) => {
    SetSexe(value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    SetAddress(e.target.value);
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
        `http://localhost:5000/api/user/updateProfile/${
          isAuth()._id
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
      <Header as="h1" dividing>
        Profile Update
      </Header>
      <br />
      <Grid doubling>
        <Grid.Row>
          <Grid.Column width={10}>
            <Form className={formClassName}>
              <Message
                success
                color="green"
                header="Nice one! 😛 😝"
                content={formSuccessMessage}
              />
              <Message
                warning
                color="red"
                header="Woah! 😱 😨"
                content={formSuccessMessage}
              />
              <Form.Input
                label="Full Name"
                type="text"
                placeholder={"Mr Foulen"}
                name="Full Name"
                maxLength="40"
                required
                value={name}
                onChange={handleNameChange}
              />
              <Form.Input
                label="Email"
                type="text"
                placeholder={"example@example.fr"}
                name="Email"
                maxLength="40"
                icon="mail"
                iconPosition="right"
                required
                readOnly
                value={email}
              />
              <Form.TextArea
                label="Bio"
                type="text"
                placeholder="Tell us about your self ..."
                name="Bio"
                maxLength="5000"
                value={bio}
                onChange={handleBioChange}
              />

              <Form.Input
                label="LinkedIn URL"
                type="text"
                icon="linkedin"
                iconPosition="right"
                placeholder={"your LinkedIn account Link"}
                name="LinkedIn URL"
                maxLength="40"
                value={linkedIn}
                onChange={handleLinkedInChange}
              />
              <Form.Input
                label="Github URL"
                type="text"
                icon="github"
                iconPosition="right"
                placeholder={"your Github account Link"}
                name="Github URL"
                maxLength="40"
                value={github}
                onChange={handleGithubChange}
              />

              <Form.Input
                label="Address"
                type="text"
                icon="address book"
                iconPosition="right"
                placeholder={"Your Address here ..."}
                name="Address"
                maxLength="40"
                value={address}
                onChange={handleAddressChange}
              />
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                  <Form.Field>
                Selected Gender: <b>{sexe}</b>
              </Form.Field>
             
              <Form.Group>
              <Form.Field inline >
                <Radio
                  label="Male"
                  name="radioGroup"
                  value="Male"
                  checked={sexe === "Male"}
                  onChange={handleSexeChange}
                />
              </Form.Field>

              <Form.Field inline >
                
                <Radio 
                  label="Female"
                  name="radioGroup"
                  value="Female"
                  checked={sexe === "Female"}
                  onChange={handleSexeChange}
                />
              </Form.Field>
       
              </Form.Group>

                  </Grid.Column>
                  <Grid.Column width={8}>
                  <Form.Field>
                <label>Birthday</label>
                <SemanticDatepicker required 
                
                value={birthday === null ?(birthday):(initialDateValue)}
                  onChange={(e, data) => SetBirthday(data.value )}
                  
                />
              </Form.Field>
                  </Grid.Column>

                </Grid.Row>
              </Grid>

              <Grid>
        <Grid.Column width={13}>
          <Segment attached='top'>
            Upload your resume here , to help us 
          </Segment>
          <ModalUploadCV></ModalUploadCV>
        </Grid.Column>
        <Grid.Column width={3}>




          {UserCV === "" && UserCV === null && resume ==="" ? (<></>):(
             resume !== "" ? (
              <div>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Grid.Column width={3}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/files-type/" +
                        "pdf" +
                        ".png"
                      }
                      style={{
                        margin: "10px",
                        height: "100px",
                        width: "100px",
                      }}
                      alt=""
                    />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Grid.Row>
                      <Header as="h4" color="red">
                        Your Resume
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as="h4" color="grey">
                        PDF File
                      </Header>
                    </Grid.Row>
                  </Grid.Column>
                </div>
              </a>
            </div>
             ):(
              <div>
              <a
                href={UserCV}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Grid.Column width={3}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/files-type/" +
                        "pdf" +
                        ".png"
                      }
                      style={{
                        margin: "10px",
                        height: "100px",
                        width: "100px",
                      }}
                      alt=""
                    />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Grid.Row>
                      <Header as="h4" color="red">
                        Your Resume
                      </Header>
                    </Grid.Row>
                    <Grid.Row>
                      <Header as="h4" color="grey">
                        PDF File
                      </Header>
                    </Grid.Row>
                  </Grid.Column>
                </div>
              </a>
            </div>
             )
          )}
       
        </Grid.Column>
        
      </Grid>
              
             
            </Form>
            <br />
            <br />
            <ModalChangePassword></ModalChangePassword>

            <Message warning>
              <Message.Header>
                why is it important to change passwords regularly ? 🤔
              </Message.Header>
              <p>
                It can be difficult to figure out if someone else is using your
                account, so by changing your password consistently, you reduce
                the risk that other people will have frequent access to your
                accounts.
              </p>
            </Message>
            <br />

            <Button color="red" floated="center" onClick={updateProfile}>
              <Icon name="edit"></Icon>
              Update
            </Button>
          </Grid.Column>
          <Divider vertical></Divider>
          <Grid.Column width={6}>
            <Header as="h3" dividing>
              Profile Picture
            </Header>
            <ModalChangeProfilePicture></ModalChangeProfilePicture>

            <Message color="grey">
              <Message.Header>
                Why profile picture is important ? 🧐
              </Message.Header>
              <p>
                One is to help other people to identify you. Another is to help
                you express yourself… and to help others to develop the right
                impression of you
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default UpdateProfile;
