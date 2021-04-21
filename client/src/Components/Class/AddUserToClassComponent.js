import React from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInvitationClass, selectedClasses,fetchInvitationclass } from "../../redux/slices/classsline";
import { ClassInvitationApi,getclassApi } from "../../api/api";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

export default function AddUserToClassComponent() {
  const dispatch = useDispatch();
  const documentData = JSON.parse(localStorage.getItem("user"));
  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  let error = { visible: false, message: "" };
  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const res2 = await getclassApi.getUserByEmail(formData.Email);
        const data ={
          status: "Invitation",
          classOb: classinvit._id,
          userOb: res2._id,
        }
        const res = await ClassInvitationApi.AddClassInvitation(data);
        dis({ type: "CLOSE_MODAL" });
        dispatch(fetchInvitationclass(documentData._id));
      } catch (err) {
        error = {
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        };
      }
    },
  });

  const [state, dis] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
    <div>
      <Button circular content="Add User" icon='add' onClick={() => dis({ type: "OPEN_MODAL", dimmer: "blurring" })} />

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dis({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Add Class</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Email"
                placeholder="Email"
                name="Email"
                onChange={formik.handleChange}
                error={formik.errors.Email}
              />
              
             
            </Form.Group>
           
            <Button.Group floated="right">
              <Button onClick={() => dis({ type: "CLOSE_MODAL" })} >Cancel</Button>
              <Button.Or />
              <Button  color="red"  type="submit">Add</Button>
            </Button.Group>
          </Form>
        </Modal.Content>
        <Modal.Content></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
