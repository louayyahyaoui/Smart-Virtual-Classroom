import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Segment,
  Modal,
  Icon,
  Label,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddquestionsApi } from "../../api/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, fetchQuestions } from "../../redux/slices/questionslice";
import FileUpload from "../../utlis/FileUpload";
import { selectedClasses } from "../../redux/slices/classsline";

export default function EditQuestions({ qes }) {
  const [open, setOpen] = React.useState(false);
  const [currentClass, err] = useSelector(selectedClasses);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error] = useState({ visible: false, message: "" });
  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const [up, setUp] = useState(0);

  const updateImages = (newImages) => {
    if (newImages === null) {
      qes.Filee.forEach((element) => {
        setImages(element);
      });
    } else {
      alert("hi")
      setUp(1);
      setImages(newImages);
    }
  };
  const documentData = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      Title: qes.Title,
      Body: qes.Body,
      Writerq: { _id: ""+documentData._id },
      Filee: [],
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        values.Filee = Images;
        alert("images : here : "+values.Filee);

        const res = await AddquestionsApi.putQuestions(values, qes._id);
        dispatch(fetchQuestions(currentClass._id));
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon name="edit">Edit</Icon>}
    >
      <Modal.Header>Update your question</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              placeholder="Title"
              label="Title"
              name="Title"
              onChange={formik.handleChange}
              value={formik.values.Title}
              error={formik.errors.Title}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            placeholder="whats your question?"
            label="Content"
            name="Body"
            value={formik.values.Body}
            onChange={formik.handleChange}
            error={formik.errors.Title}
          />
          <Button type="update" color="red">
            Ask!
          </Button>
          <FileUpload
            refreshFunction={updateImages}
            upImg={up}
            listfile={qes.Filee}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
const yupSchema = Yup.object({
  Title: Yup.string().required("Champs requis!"),
  Body: Yup.string().required("Champs requis!"),
});
