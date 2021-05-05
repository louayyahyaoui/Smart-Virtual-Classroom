import React,{  useState } from "react";
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
import { fetchActiveClass,fetchclass } from "../../redux/slices/classsline";
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
const options = [
  { key: 1, text: "red", value: "red" },
  { key: 2, text: "blue", value: "blue" },
  { key: 3, text: "yellow", value: "yellow" },
  { key: 4, text: "grey", value: "grey" },
  { key: 5, text: "pink", value: "pink" },
  { key: 6, text: "green", value: "green" },
  { key: 7, text: "olive", value: "olive" },
  { key: 8, text: "teal", value: "teal" },
  { key: 9, text: "violet", value: "violet" },
  { key: 10, text: "purple", value: "purple" },
  { key: 11, text: "brown", value: "brown" },
  { key: 12, text: "black", value: "black" },
  { key: 13, text: "white", value: "white" },
];

export default function AddClassComponent() {
  
  const documentData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  let error = { visible: false, message: "" };
  let [color, setClassColor] = useState();
  const selectedClass = (data) => {
    console.log(data.target.innerText);
    setClassColor(data.target.innerText);
  };
  const formik = useFormik({
    initialValues: {
      classUsers: [],
      className: "",
      classSection: "",
      classLevel: "",
      classDatePost: Date.now(),
      classDescription: "",
      classOwner: "",
      classColor: "",
      classStatus:"Active",
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
      try {
        const lvl = formData.classSection.substring(0, 1);
        if(color===undefined)
        color="red";

        const data = {
          className: formData.className,
          classSection: formData.classSection,
          classLevel: lvl,
          classDescription: formData.classDescription,
          classOwner: documentData._id,
          classColor: color,
          classStatus:"Active"
        };

         const res = await AddclassApi.addClass(data);
        console.log(res);
        dis({ type: "CLOSE_MODAL" });
        dispatch(fetchclass(documentData.role, documentData._id,"Active"));
        dispatch(fetchActiveClass(documentData._id));
        console.log(data);
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
      <Button
        circular
        content="Create Class"
        icon="add"
        onClick={() => dis({ type: "OPEN_MODAL", dimmer: "blurring" })}
      />

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
                control={Dropdown}
                label="Class Color"
                placeholder="Class Color"
                name="classColor"
                clearable
                selection
                options={options}
                onChange={selectedClass}
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
              error={formik.errors.classDescription}
            />

            <Form.Group>
              {error.visible && <Form.Error>{error.message}</Form.Error>}
            </Form.Group>

            <Button.Group floated="right">
              <Button onClick={() => dis({ type: "CLOSE_MODAL" })}>
                Cancel
              </Button>
              <Button.Or />
              <Button color="red" type="submit">
                Save
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
