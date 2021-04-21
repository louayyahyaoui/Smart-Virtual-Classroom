import React,{useState} from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  TextArea,
  Dropdown,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addClasss, updateClasss } from "../../redux/slices/classsline";
import { AddclassApi } from "../../api/api";

export default function EditClassComponent(props) {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  let error = { visible: false, message: "" };
  const formik = useFormik({
    initialValues: {
      className: props.classes.className,
      classSection: props.classes.classSection,
      classLevel: props.classes.classLevel,
      classDescription: props.classes.classDescription,
    },
    validationSchema: Yup.object({
      className: Yup.string().required(),
      classSection: Yup.string()
        .required()
        .matches(
          /^[1-5]([A-Z])\w+$/,
          "first letter of classSection must be in 1-5"
        ),
      classLevel: Yup.string(),
      classDescription: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      console.log(formData);
      try {
        const lvl = formData.classSection.substring(0, 1);
        const data = {
          className: formData.className,
          classSection: formData.classSection,
          classLevel: lvl,
          classDescription: formData.classDescription,
          classOwner: documentData._id,
        };
        const res = await AddclassApi.updateClass(props.classes._id, data);
        console.log(res);
        dispatch(updateClasss(res));
        handleClose();
      } catch (err) {
        error = {
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        };
      }
    },
  });

  const [modalOpen, SetModalOpen] = useState(false);
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);


  return (
    <div>
      <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="edit" text="Edit" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        
      >
        <Modal.Header>Edit Class</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Class Name"
                placeholder="Class Name"
                name="className"
                onChange={formik.handleChange}
                value={formik.values.className}
                error={formik.errors.className}
              />
              <Form.Field
                control={Input}
                label="Class Section"
                placeholder="Class Section"
                name="classSection"
                onChange={formik.handleChange}
                value={formik.values.classSection}
                error={formik.errors.classSection}
              />
              <Form.Field
                control={Input}
                label="Class Level"
                placeholder="Class Level"
                name="classLevel"
                onChange={formik.handleChange}
                value={formik.values.classSection.substring(0, 1)}
                error={formik.errors.classLevel}
              />
            </Form.Group>
            <Form.Field
              control={TextArea}
              label="Class Description"
              placeholder="Class Description"
              name="classDescription"
              onChange={formik.handleChange}
              value={formik.values.classDescription}
              error={formik.errors.classDescription}
            />
            <Form.Group>
              {error.visible && <Form.Error>{error.message}</Form.Error>}
            </Form.Group>

            <Button.Group floated="right">
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button.Or />
              <Button color="red" type="submit">
                Update
              </Button>
            </Button.Group>
          </Form>
        </Modal.Content>
        <Modal.Content></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
