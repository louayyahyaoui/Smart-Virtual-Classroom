import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import {
  AddSeance,
  EditSeances,
  GetSeancesById,
  updateById,
} from "../../redux/slices/Seance";

function FormSeance(props) {
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");
 
  const [dateCreation, SetDateCreation] = useState(Date.now());
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));

  const seanceId = props.seanceId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (seanceId) {
      console.log(seanceId);
      dispatch(GetSeancesById(seanceId)).then((response) => {
        console.log(response);
        SetTitre(response.payload.titre);
        SetDescription(response.payload.description);
      });
    }
  }, [dispatch]);

  const handleTitreChanges = (e) => {
    SetTitre(e.target.value);
  };
  const handleDescriptionChanges = (e) => {
    SetDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent browser refresh
    e.preventDefault();

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    if (seanceId) {
      const seance = {
        titre: titre,
        description: description,
        idClass: CurrentClass._id,
        dateCreation: dateCreation,
        _id: seanceId,
      };

      dispatch(EditSeances(seance))
        .then((response) => {
          SetFormClassName("success ");
          SetFormSuccessMessage(response.payload.msg);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.payload.msg);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("something wen wrong " + err);
          }
        });
    }

    if (!seanceId) {
      const seance = {
        titre: titre,
        description: description,
        idClass: CurrentClass._id,
        dateCreation: dateCreation,
      };
      console.log(seance);
      dispatch(AddSeance(seance))
        .then((response) => {
          SetFormClassName("success");
          SetFormSuccessMessage(response.payload.msg);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.payload.msg);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("something wen wrong " + err);
          }
        });
    }
  };

  return (
    <div>
      <Form className={formClassName} onSubmit={handleSubmit}>
        <Form.Input
          label="Titre"
          type="text"
          placeholder="Seance 1"
          name="Titre"
          maxLength="40"
          required
          value={titre}
          onChange={handleTitreChanges}
        />
        <Form.TextArea
          label="Description"
          type="TextArea"
          placeholder="In this workshop we will learn ..."
          name="Description"
          maxLength="5000"
          required
          value={description}
          onChange={handleDescriptionChanges}
        />
        <Message
          success
          color="green"
          header="Nice one! 📒 📕 📚 📖"
          content={formSuccessMessage}
        />
        <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
          content={formErrorMessage}
        />
        <Button color="green" floated="right">
          Save
        </Button>
        <br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    </div>
  );
}

export default FormSeance;
