import React from 'react'
import { Button, Form,List, Icon, Message, Modal } from "semantic-ui-react";

export default function ModalAddLangues() {
    return (
       
              <>
      <Modal 
        trigger={

            <Button floated="right" size="mini" icon="add"/>
 
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>Update Skills </Modal.Header>
        <Modal.Content>
          <Form >
         
          <List divided relaxed>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
        <List.Description as='a'>Updated 10 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
        <List.Description as='a'>Updated 22 mins ago</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name='github' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
        <List.Description as='a'>Updated 34 mins ago</List.Description>
      </List.Content>
    </List.Item>
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
        <Button  color='red'  >
          <Icon name='remove' /> Delete
        </Button>
        <Button color='black'  >
          <Icon name='checkmark' /> Update
        </Button>
        </Modal.Actions>
      </Modal>
    </>
      
    )
}
