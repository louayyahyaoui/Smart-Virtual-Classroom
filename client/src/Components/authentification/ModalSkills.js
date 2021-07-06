import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form,List, Icon, Message, Modal } from "semantic-ui-react";
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';

export default function ModalSkills(props) {
  
 


  const dispatch = useDispatch();

  //console.log(props.skills);
  //let skillss = props.skills;
  const handleDeleteSkills = (skill) => {
    

    
    axios.put(
      `http://localhost:5000/api/user/deleteUserDataSkills/${isAuth()._id
      }`,
      {

        skill: skill,
     
      }
    )
      .then((res) => {

        dispatch(getUserDataById(isAuth()._id)).then((res)=>{
         
          props.addSkills(res.payload.data.skills)
        });

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
        <Modal.Header>Skills </Modal.Header>
        <Modal.Content>
          <Form >
         
          <List divided  relaxed>
        {props.skills.map((skill)=>(
 <List.Item>
 <List.Content floated='right'>
 <Button onClick={()=>handleDeleteSkills(skill)}  color="white" size="tiny">
 <Icon name='trash' /> 
</Button>

 </List.Content>
  <List.Icon name='star' size='large' verticalAlign='middle' />
 <List.Content as="h5">{skill}</List.Content>
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
