import React, { useState } from "react";
import { Button, Modal, Form,  } from "semantic-ui-react";
//import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchInvitationclass,
  fetchInvitationclassId,
} from "../../redux/slices/classsline";
import { ClassInvitationApi } from "../../api/api";
import MultiSelect from "react-multi-select-component";

export default function AddUserToClassComponent(props) {
  const dispatch = useDispatch();
  const selectedusers = [];
  const documentData = JSON.parse(localStorage.getItem("user"));
  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  const [modalOpen, SetModalOpen] = useState(false);

  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  props.users.forEach((element) => {
    selectedusers.push({
      label: element.name,
      value: element._id,
    });
  });
  const [selected, setSelected] = useState([]);
  let error = { visible: false, message: "" };

  const Add = async () => {
    let data = [];
    selected.forEach((itemselect) => {
      data.push(itemselect.value);
    });
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let verif1=true,verif2=true;
        for (let index11 = 0; index11 < classinvit.classUsers.length; index11++) {
        if(classinvit.classUsers[index11]._id===element)
        {
          verif1=false;
          break;
        }
      }
      for (let index22 = 0; index22 < props.members.length; index22++) {
        if(props.members[index22].userOb._id===element )
        {
          verif2=false;
          break;
        }
      
      }
      if(verif1 && verif2){
      if (data.length > 0) {

        const dataField = {
          status: "Invitation",
          classOb: classinvit._id,
          userOb: element,
        };
        try {
          await ClassInvitationApi.AddClassInvitation(dataField);
          handleClose()
          dispatch(fetchInvitationclass(documentData._id));
          dispatch(fetchInvitationclassId(classinvit._id));
        } catch (err) {
          error = {
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          };
        }
      }
    }
    else
    console.log("error");
    }
  };

  return (
    <div>
      

      <Modal trigger={<Button
        circular
        content="Add User"
        icon="add"
        onClick={handleOpen}
      />} open={modalOpen} onClose={handleClose} dimmer="inverted">
        <Modal.Header>Add User To Class</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={MultiSelect}
                options={selectedusers}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group floated="right">
            <Button onClick={handleClose}>Cancel</Button>
            <Button.Or />
            <Button color="red" onClick={() => Add()} type="submit">
              Add
            </Button>
          </Button.Group>
        </Modal.Actions>
        <Modal.Content></Modal.Content>
      </Modal>
    </div>
  );
}
