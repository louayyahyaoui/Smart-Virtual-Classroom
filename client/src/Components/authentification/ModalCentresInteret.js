import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form,List, Icon, Message, Modal } from "semantic-ui-react";
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';

export default function ModalCentresInteret(props) {

  const dispatch = useDispatch();
  const handleDeleteInteret = (interet) => {
    
    
    
    axios.put(
      `http://localhost:5000/api/user/deleteUserDataInteretes/${isAuth()._id
      }`,
      {

        interet: interet,
     
      }
    )
      .then((res) => {

        dispatch(getUserDataById(isAuth()._id)).then((res)=>{
         
          props.addInterets(res.payload.data.interets)
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
        <Modal.Header>Centres Interes </Modal.Header>
        <Modal.Content>
          <Form >
         
          <List divided  relaxed>
        {props.interets.map((interet)=>(
 <List.Item>
 <List.Content floated='right'>
 <Button onClick={()=>handleDeleteInteret(interet)} color="white" size="tiny">
 <Icon name='trash' /> 
</Button>

 </List.Content>
  <List.Icon name='sound' size='large' verticalAlign='middle' />
 <List.Content as="h5">{interet}</List.Content>
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
