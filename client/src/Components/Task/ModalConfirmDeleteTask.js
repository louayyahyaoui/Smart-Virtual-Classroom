import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
import { isAuth } from '../../helpers/auth';
import { deleteTask } from '../../redux/slices/Task';

export default function ModalConfirmDeleteTask(props) {

    const [modalOpen, SetModalOpen] = useState(false);
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const dispatch = useDispatch();
  const taskDetail={
    "idUser":isAuth()._id,
    "idClass" : currentClass._id,
    
  }
  
    const handleOpen = (e) => SetModalOpen(true);
    const handleClose = (e) => SetModalOpen(false);
  
    const handleSubmit = (e) => {
      let params = e.target.getAttribute("taskid");
 
      dispatch(deleteTask(params));
      console.log("kamlt");
      handleClose();
  
        
    
    
    };
    return (
        <>
              <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="delete" text="Delete" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete{" "}
            <strong>{props.task.title}</strong>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={handleSubmit}
            taskid={props.task._id}
            color="red"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="black">
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </>
        
    )
}
