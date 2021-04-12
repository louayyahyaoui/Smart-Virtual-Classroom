import React from "react";
import { Button, Form, Input, TextArea, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddquestionsApi } from "../../api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion } from "../../redux/slices/questionslice";
import FileUpload from "../../utlis/FileUpload";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' 
import { useHistory } from "react-router";
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
function AddPost() {
  const socket = io(ENDPOINT);

  const documentData = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [error] = useState({ visible: false, message: "" });
  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    console.log(newImages);
    setImages(newImages);
  };
  const formik = useFormik({
    initialValues: {
      Title: "",
      Body: "",
      Writerq: { _id: "" },
      Filee: [],
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        values.Filee = Images;
        values.Writerq._id = documentData._id;

        const res = await AddquestionsApi.postQuestions(values);
        dispatch(addQuestion(res));
        socket.emit("send_question", "message"); 

        history.push('/FAQ/'+res._id)

      } catch (error) {
        alert(error);
      }
    },
  });
  const [tags, setTags] = useState([]);
  const handleChange=(tag) =>{
    setTags(tag)
    console.log(tags)
  }
  return (
    <div>
      <Segment raised color="red">
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
          <div style={{ float: "right", marginRight: "5%",marginTop:"1%" }}>

          <Button type="submit" color="red">
            Ask!
          </Button>
          </div>
          <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "5%" }}>
                  <FileUpload refreshFunction={updateImages} listfile={null} />
                </div>
              </div>        </Form>
      </Segment>
    </div>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
export default AddPost;
