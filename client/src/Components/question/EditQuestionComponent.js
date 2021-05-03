import React from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Modal,
  Icon,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddquestionsApi } from "../../api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  fetchQuestions } from "../../redux/slices/questionslice";
import FileUploadEdit from "../../utlis/FileUploadEdit";
import { useHistory } from "react-router";
import io from "socket.io-client";

const ENDPOINT = "https://closer-server.herokuapp.com/";
export default function EditQuestions({ qes }) {
  const socket = io(ENDPOINT);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  

  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    if (newImages === null) {
      qes.Filee.forEach((element) => {
        setImages(element);
      });
    } else {
      setImages(newImages);
    }
  };
  const documentData = JSON.parse(localStorage.getItem("user"));
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  const formik = useFormik({
    initialValues: {
      Title: qes.Title,
      Body: qes.Body,
      Writerq: { _id: "" + documentData._id },
      Filee: [],
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        if (Images.length !== 0) {
          values.Filee = Images;
         // alert("images : here : " + values.Filee);
        } else {
          values.Filee = qes.Filee;
        }
        const res = await AddquestionsApi.putQuestions(values, qes._id);
        
        if (Images.length != 0) {
          setEnableUpload(true);
        }
        updateImages([]);
        if (res.ok === 1) {
          setEnableUpload(false);
        }        history.push("/FAQ/"+qes._id);

          dispatch(fetchQuestions(currentClass._id));
          socket.emit("send_question", "message");
      } catch (error) {
        alert(error);
      }
    },
  });
  const [enableUpload, setEnableUpload] = useState(false);

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
          <div style={{ float: "right", marginRight: "5%" }}>
            <Button
              style={{ maxHeight: "40px" }}
              type="submit"
              content="Edit"
              icon="edit"
              color="red"
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "5%" }}>
              <FileUploadEdit
                refreshFunction={updateImages}
                listfile={qes.Filee}
                Enbale={enableUpload}
              />
            </div>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        
      </Modal.Actions>
    </Modal>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
