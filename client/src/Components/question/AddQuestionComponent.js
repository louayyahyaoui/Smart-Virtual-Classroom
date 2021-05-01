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
import { useHistory } from "react-router-dom";

const ENDPOINT = "https://closer-server.herokuapp.com/";
function AddQuestion() {
  const history = useHistory();

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
        
       // alert("images"+Images)
      
        values.Filee = Images;
        values.Writerq._id = documentData._id;
        values.Hashtags = tags;
        values.Class = currentClass._id;
        setEnableUpload(true);
        const res = await AddquestionsApi.postQuestions(values);
        dispatch(addQuestion(res));
        const socket = io(ENDPOINT);
        socket.emit("send_question", "message");
        setTags([]);
        values.Title = "";
        values.Body = "";
        console.log(res)
      history.push("/FAQ/"+res._id);
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

          <div style={{ float: "right", marginRight: "5%",marginTop:"2%" }}>
                  <Button
                    style={{ maxHeight: "40px" }}
                    type="submit"
                    content="Post"
                    icon="bullhorn"
                    color="red"

                  />
                  <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginLeft: "5%" }}>
                    <FileUpload
                      refreshFunction={updateImages}
                      listfile={null}
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
export default AddQuestion;
