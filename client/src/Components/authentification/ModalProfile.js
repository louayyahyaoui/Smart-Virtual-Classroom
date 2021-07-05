import React, { useState } from 'react'
import {
   
    Button,
 
    Form,
    Grid,
    Message,
    Icon,
    Modal,
    Radio,
   
  } from "semantic-ui-react";
  import SemanticDatepicker from "react-semantic-ui-datepickers";
import { isAuth, setLocalStorage } from '../../helpers/auth';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {  UpdateUserState } from '../../redux/slices/User';
export default function ModalProfile(props) {
  const Resources = useSelector((state) => state.user.Resources);
  const [name, setName] = useState(props.name);
  const [sexe, setSexe] = useState(props.sexe);
  const [bio, setBio] = useState(props.bio);
  const [address, setAddress] = useState(props.address);
  const [birthday, setBirthday] = useState(props.birthday);
  const [email, setEmail] = useState(props.email);

  const [linkedIn, setLinkedIn] = useState(props.linkedIn);
  const [github, setGithub] = useState(props.github);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
 
  const handleSexeChange = (e, { value }) => {
    setSexe(value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLinkedInChange = (e) => {
    setLinkedIn(e.target.value);
  };
  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };
  const dispatch = useDispatch();
  const updateProfile = () => {
    //SetLoader(true);
   


    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${
          isAuth()._id
        }`,
        {
          name: name,
         
          bio:bio,
          linkedInUrl: linkedIn,
          GithubUrl: github,
          picture: Resources,
          sexe: sexe,
          address: address,
          picture: Resources,
          birthday: birthday,
        }
      )
      .then((res) => {
        props.setName(name)
        props.setEmail(email)
        props.setAddress(address)
        props.setBirthday(birthday)
        props.setLinkedIn(linkedIn)
        props.setGithub(github)
        props.setSexe(sexe)
        //SetLoader(false);
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
        <>
                  <Modal 
          trigger={
  
              <Button floated="right" size="mini" icon="edit"/>
   
          }
          dimmer="inverted"
          size="tiny"
          closeIcon="close"
        >
          <Modal.Header>{name}</Modal.Header>
          <Modal.Content>
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
                value={name}
                required
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
                  onChange={(e, data) => setBirthday(data.value )}
                  
                />
              </Form.Field>
              
                  </Grid.Column>

                </Grid.Row>
              </Grid>
              </Form>
              </Modal.Content>
              <Modal.Actions>
        
              <Button color='green'  onClick={updateProfile}>
          <Icon name='checkmark' /> Save
        </Button>
        <Button color='black'  >
          <Icon name='close' /> Cancel
        </Button>
              </Modal.Actions>
         </Modal>
        </>
    )
}
