import React, { useState } from 'react'
import { Button, Form, Icon, Header, Message, Modal } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import axios from 'axios';
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';
import { useDispatch } from 'react-redux';
export default function ModalExperience(props) {

  const [dateDebut, setDateDebut] = useState();
  const [id, setId] = useState(props.id)
  const [dateFin, setDateFin] = useState();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [formClassName, SetFormClassName] = useState("");
  const debut = new Date(props.dateDebut);
  const initialDateDebut = debut;
  const fin = new Date(props.dateFin);
  const initialDateFin = fin;

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const dispatch = useDispatch();
  const handleUpdateExperience = () => {

    if (props.info !== "edit") {
      axios.put(
        `http://localhost:5000/api/user/addUserDataExperience/${isAuth()._id
        }`,
        {

     
          title: title,
          dateDebut: dateDebut,
          dateEnd: dateFin,
          description: description,
        }
      )
        .then((res) => {
          console.log(res);
          dispatch(getUserDataById(id));
          /*  props.addFormation({
      
              id : id,
              title : title,
              dateDebut : dateDebut ,
              dateFin :dateFin ,
              description :description,
            })*/
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
        `http://localhost:5000/api/user/updateUserDataExperience/${isAuth()._id
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
          /*  props.addFormation({
      
              id : id,
              title : title,
              dateDebut : dateDebut ,
              dateFin :dateFin ,
              description :description,
            })*/
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
  const handleDeleteExperience = () => {

    if (props.info === "edit") {
      axios.put(
        `http://localhost:5000/api/user/deleteUserDataExperience/${isAuth()._id
        }`,
        {

          id:id
       
        }
      )
        .then((res) => {
          console.log(res);
          dispatch(getUserDataById(id));
          /*  props.addFormation({
      
              id : id,
              title : title,
              dateDebut : dateDebut ,
              dateFin :dateFin ,
              description :description,
            })*/
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
        <Modal.Header>{props.info !== "edit" ? "Add" : "Update"}  Experience </Modal.Header>
        <Modal.Content>
          <Form className={formClassName} >
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
              label="Poste"

              placeholder="Poste..."
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
              maxLength="40"

              value={description}
              onChange={handleDescriptionChange}
            />



          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={handleUpdateExperience} >
            <Icon name='checkmark' /> {props.info !== "edit" ? "Add" : "Update"}
          </Button>
          <Button color='red' onClick={handleDeleteExperience} >
            <Icon name='remove' /> {props.info !== "edit" ? "Add" : "Delete"}
          </Button>

        </Modal.Actions>
      </Modal>
    </>

  )
}
