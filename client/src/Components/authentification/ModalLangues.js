import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form,List, Icon, Message, Modal } from "semantic-ui-react";
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';

export default function ModalLangues(props) {
  const dispatch = useDispatch();
  const handleDeleteSkills = (langue) => {
    
    
    
    axios.put(
      `http://localhost:5000/api/user/deleteUserDataLanguages/${isAuth()._id
      }`,
      {

        langue: langue,
     
      }
    )
      .then((res) => {

        dispatch(getUserDataById(isAuth()._id));

        // SetLoader(false);
        //dispatch(UpdateUserState());

        //setFormSuccessMessage("Your profile was updated successfully !");
       // SetFormClassName("success");

      })
      .catch((err) => {
      //  setFormSuccessMessage("Something went wrong !!");
       // SetFormClassName("warning");
      });
  };

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
        <Modal.Header>Langues </Modal.Header>
        <Modal.Content>
          <Form >
         
          <List divided  relaxed>
        {props.langues.map((lang)=>(
 <List.Item>
 <List.Content floated='right'>
 <Button onClick={()=>handleDeleteSkills(lang)} color="white" size="tiny">
 <Icon name='trash' /> 
</Button>

 </List.Content>
  <List.Icon name='language' size='large' verticalAlign='middle' />
 <List.Content as="h5">{lang}</List.Content>
</List.Item>
        ))}
         
 
  </List>
           
            <Message
              success
              color="green"
              header="Nice one! 😛 😝"
        
            />
            <Message
              warning
              color="yellow"
              header="Woah! 😱 😨"
        
            />
         
          </Form>
        </Modal.Content>
        <Modal.Actions>
        
        <Button color='red'  >
          <Icon name='checkmark' /> Save
        </Button>
        </Modal.Actions>
      </Modal>
    </>
      
    )
}
