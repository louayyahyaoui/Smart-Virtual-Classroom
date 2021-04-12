import React from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClasss } from "../../redux/slices/classsline";
import { AddclassApi } from "../../api/api";

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

export default function AddClassComponent() {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  let error = { visible: false, message: "" };
  const formik = useFormik({
    initialValues: {
      classUsers: [],
      className: "",
      classSection: "",
      classLevel: "",
      classDatePost: Date.now(),
      classDescription: "",
      classOwner: "",
    },
    validationSchema: Yup.object({
      className: Yup.string().required(),
      classSection: Yup.string().required().matches(/^[1-5]([A-Z])\w+$/, "first letter of classSection must be in 1-5"),
      classLevel:  Yup.string(),
      classDescription: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const lvl = formData.classSection.substring(0,1);    
        const data = {
          className: formData.className,
          classSection: formData.classSection,
          classLevel: lvl,
          classDescription: formData.classDescription,
          classOwner: documentData._id,
        }
       
        const res = await AddclassApi.addClass(data);
        console.log(res);
        dis({ type: "CLOSE_MODAL" });
        dispatch(addClasss(res));
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
      <Button circular content="Create Class" icon='add' onClick={() => dis({ type: "OPEN_MODAL", dimmer: "blurring" })} />

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
                label="Class Name"
                placeholder="Class Name"
                name="className"
                onChange={formik.handleChange}
                error={formik.errors.className}
              />
              <Form.Field
                control={Input}
                label="Class Section"
                placeholder="Class Section"
                name="classSection"
                onChange={formik.handleChange}
                error={formik.errors.classSection}
              />
              <Form.Field
                control={Input}
                label="Class Level"s
                placeholder="Class Level"
                name="classLevel"
                onChange={formik.handleChange}
                value={formik.values.classSection.substring(0,1)}
                error={formik.errors.classLevel}
              />
            </Form.Group>
            <Form.Field
              control={TextArea}
              label="Class Description"
              placeholder="Class Description"
              name="classDescription"
              onChange={formik.handleChange}
              error={formik.errors.classDescription}
            />
            <Form.Group>
              {error.visible && <Form.Error>{error.message}</Form.Error>}
            </Form.Group>
           
            <Button.Group floated="right">
              <Button onClick={() => dis({ type: "CLOSE_MODAL" })} >Cancel</Button>
              <Button.Or />
              <Button  color="red"  type="submit">Save</Button>
            </Button.Group>
          </Form>
        </Modal.Content>
        <Modal.Content></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
