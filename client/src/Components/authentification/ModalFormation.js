import React, { useState } from 'react'
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { formatMs } from '@material-ui/core';
import axios from 'axios';
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';
import { useDispatch } from 'react-redux';
export default function ModalFormation(props) {

  // const [formation,setFormation] = useState(props.formation)
  const [dateDebut, setDateDebut] = useState(props.dateDebut);
  const [dateFin, setDateFin] = useState(props.dateEnd);
  const [title, setTitle] = useState(props.title);
  const [id, setId] = useState(props.id);
  const [description, setDescription] = useState(props.description);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const debut = new Date(props.dateDebut);
  const initialDateDebut = debut;
  const fin = new Date(props.dateEnd);
  const initialDateFin = fin;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const dispatch = useDispatch();
 
  const handleUpdateFormation = () => {

    if (props.info !== "edit") {

      axios.put(
        `http://localhost:5000/api/user/addUserDataFormation/${isAuth()._id
        }`,
        {

          title: title,
          dateDebut: dateDebut,
          dateEnd: dateFin,
          description: description,
        }
      )
        .then((res) => {

          dispatch(getUserDataById(id));

          // SetLoader(false);
          //dispatch(UpdateUserState());

          setFormSuccessMessage("Your profile was updated successfully !");
          SetFormClassName("success");

        })
        .catch((err) => {
          setFormSuccessMessage("Something went wrong !!");
          SetFormClassName("warning");
        });



    } else {

      axios.put(
        `http://localhost:5000/api/user/updateUserDataFormation/${isAuth()._id
        }`,
        {

          id: id,
          title: title,
          dateDebut: dateDebut,
          dateEnd: dateFin,
          description: description,
        }
      )
        .then((res) => {

          dispatch(getUserDataById(id));

          // SetLoader(false);
          //dispatch(UpdateUserState());

          setFormSuccessMessage("Your profile was updated successfully !");
          SetFormClassName("success");

        })
        .catch((err) => {
          setFormSuccessMessage("Something went wrong !!");
          SetFormClassName("warning");
        });

    }

  };
  const handleDeleteFormation = () => {
    

    console.log(id);
    axios.put(
      `http://localhost:5000/api/user/deleteUserDataFormation/${isAuth()._id
      }`,
      {

        id: id,
     
      }
    )
      .then((res) => {

        dispatch(getUserDataById(id));

        // SetLoader(false);
        //dispatch(UpdateUserState());

        setFormSuccessMessage("Your profile was updated successfully !");
        SetFormClassName("success");

      })
      .catch((err) => {
        setFormSuccessMessage("Something went wrong !!");
        SetFormClassName("warning");
      });
  };
  return (

    <>
      <Modal
        trigger={


          <Button floated="right" size="mini" icon={props.info !== "edit" ? "add" : "edit"} />

        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header> {props.info !== "edit" ? "Add" : "Update"} Formation </Modal.Header>
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
            <Form.Input required
              label="Title"

              placeholder="Title..."
              value={title}
              onChange={handleTitleChange}

            />
            <Form.Group>

              <SemanticDatepicker required
                placeholder="Start Date"
                label="Start"
                value={props.info !== "edit" ? (dateDebut) : (initialDateDebut)}
                onChange={(e, data) => setDateDebut(data.value)}

              />

              <SemanticDatepicker required
                placeholder="End Date"
                label="End"
                value={props.info !== "edit" ? (dateFin) : (initialDateFin)}

                onChange={(e, data) => setDateFin(data.value)}

              />
            </Form.Group>
            <Form.TextArea
              label="Description"

              placeholder="Description..."
              name="Titre"
              maxLength="200"

              value={description}
              onChange={handleDescriptionChange}

            />



          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={handleUpdateFormation} >
            <Icon name='checkmark' /> {props.info !== "edit" ? "Add" : "Update"}
          </Button>
          <Button color='red' onClick={handleDeleteFormation}   >
            <Icon name='remove' /> {props.info !== "edit" ? "Cancel" : "Delete"}
          </Button>

        </Modal.Actions>
      </Modal>
    </>

  )
}
