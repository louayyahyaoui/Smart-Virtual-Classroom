import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon,Header, Message, Modal } from "semantic-ui-react";
import { isAuth, setLocalStorage } from '../../helpers/auth';
import { UpdateUserState } from '../../redux/slices/User';
export default function ModalBio(props) {
    const Resources = useSelector((state) => state.user.Resources);
    const [formSuccessMessage, setFormSuccessMessage] = useState("");
    const [formClassName, SetFormClassName] = useState("");
    const [bio, setBio] = useState(props.bio);
    const [open, setOpen] = useState(false);
    const handleBioChange = (e) => {
        setBio(e.target.value);
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
              name: props.name,
            bio:bio,
              linkedInUrl: props.linkedIn,
              GithubUrl: props.github,
              picture: props.Resources,
              sexe: props.sexe,
              address: props.address,
              picture: Resources,
              birthday: props.birthday,
            }
          )
          .then((res) => {
           props.setBio(bio);
            //SetLoader(false);
            dispatch(UpdateUserState());
            setLocalStorage("user", res.data.result);
            setFormSuccessMessage("Your profile was updated successfully !");
            SetFormClassName("success");
             setOpen(false)
    
          })
          .catch((err) => {
            setFormSuccessMessage("Something went wrong !!");
            SetFormClassName("warning");
          });
      };

    return (
        <>
        <Modal 
         onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
         open={open}
          trigger={
  
              <Button floated="right" size="mini" icon="edit"/>
   
          }
         
          dimmer="inverted"
          size="tiny"
          closeIcon="close"
        >
          <Modal.Header>Bio </Modal.Header>
          <Modal.Content>
            <Form >
           
             
            <Form.TextArea
                label="Bio"
                type="text"
              //  placeholder="Tell us about your self ..."
                name="Bio"
                maxLength="5000"
                
                value={bio}
                onChange={handleBioChange}
              />
           
            </Form>
          </Modal.Content>
          <Modal.Actions>
        
          <Button color='green'  onClick={updateProfile}  >
            <Icon name='checkmark' /> Save
          </Button>
          </Modal.Actions>
        </Modal>
      </>
    )
}
