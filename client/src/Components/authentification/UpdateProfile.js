import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  GridColumn,
  Header,
  Icon,
  Image,
  Message,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import ModalChangeProfilePicture from "./ModalChangeProfilePicture";
import axios from "axios";
import { getCookie, isAuth, setLocalStorage } from "../../helpers/auth";
import { getUserById, UpdateUserState } from "../../redux/slices/User";
import { useParams } from "react-router";
import ModalChangePassword from "./ModalChangePassword";

function UpdateProfile() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const Resources = useSelector((state) => state.user.Resources);
  const userById = useSelector((state) => state.user.UserById);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById(id)).then((res) => {
      console.log(res.payload);
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
    });

    console.log(userById);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleLinkedInChange = (e) => {
    setLinkedIn(e.target.value);
  };
  const handleGithubChange = (e) => {
    setGithub(e.target.value);
    console.log(Resources);
  };

  const updateProfile = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${
          isAuth()._id
        }`,
        {
          name: name,
          bio: bio,
          linkedInUrl: linkedIn,
          GithubUrl: github,
          picture: Resources,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(UpdateUserState());
        setLocalStorage("user", res.data.result);
        setFormSuccessMessage("Your profile was updated successfully !");
        SetFormClassName("success");
      })
      .catch((err) => {
        console.log(err);
        setFormSuccessMessage("Something went wrong !!");
        SetFormClassName("warning");
      });
  };
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
