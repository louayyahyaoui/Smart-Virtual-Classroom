import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  TextArea,
  Icon,
  Label,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddquestionsApi } from "../../api/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../utlis/FileUpload";
import { addQuestion } from "../../redux/slices/questionslice";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import io from "socket.io-client";
import { selectedClasses } from "../../redux/slices/classsline";
const ENDPOINT = "https://closer-server.herokuapp.com/";
function AddQuestion() {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  const [open, setOpen] = React.useState(false);
  const [error] = useState({ visible: false, message: "" });
  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  //inpput tags
  const [tags, setTags] = useState([]);
  const handleChange = (tag) => {
    setTags(tag);
  };
  const formik = useFormik({
    initialValues: {
      Title: "",
      Body: "",
      Writerq: { _id: "" },
      Filee: [],
      Hashtags: [],
      Class: { _id: "" },
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        values.Filee = Images;
        values.Writerq._id = documentData._id;
        values.Hashtags = tags;
        values.Class = currentClass._id;
        const res = await AddquestionsApi.postQuestions(values);
        dispatch(addQuestion(res));
        const socket = io(ENDPOINT);
        socket.emit("send_question", "message");
        setTags([]);
        values.Title = "";
        values.Body = "";
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
      trigger={
        <Button as="div" labelPosition="right">
          <Button color="red">
            <Icon name="question circle outline" />
            Question
          </Button>

          <Label as="a" basic color="red" pointing="left">
            <Icon name="bullhorn">Post</Icon>
          </Label>
        </Button>
      }
    >
      <Modal.Header>Whats your question?</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              placeholder="Title"
              label="Title"
              name="Title"
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            placeholder="whats your question?"
            label="Content"
            name="Body"
            onChange={formik.handleChange}
            error={formik.errors.Body}
          />
          <TagsInput value={tags} onChange={handleChange} />

          <Button type="submit" color="red">
            Ask!
          </Button>
          <FileUpload refreshFunction={updateImages} listfile={null} />
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
  Body: Yup.string().required("Champs requis!"),
});
export default AddQuestion;
