import React, { useState } from 'react'
import { Button, Dropdown, Feed, Icon, Modal } from 'semantic-ui-react'
import AddTask from './AddTask'
import FormTask from './FormTask'

export default function ModalUpdateTask(props) {
  const [open, setOpen] = useState(false);
    return (
        <>
        <Modal
          trigger={
            <Dropdown.Item icon={props.icon} text={props.buttonTriggerTitle} />
          }
          dimmer="inverted"
          size="tiny"
          closeIcon="close"
        >
          <Modal.Header>{props.headerTitle}</Modal.Header>
          <Modal.Content>
            
            <FormTask
              buttonSubmitTitle={props.buttonSubmitTitle}
              buttonColor={props.buttonColor}
              task={props.task}
             
           
           
            />
              
          </Modal.Content>
          <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Back To Task
          </Button>
      
             <br></br>
        
        </Modal.Actions>
        </Modal>
      </>
    )
}
