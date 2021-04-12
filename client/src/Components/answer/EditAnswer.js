import React,{useEffect} from 'react'
import { Button, Form,TextArea, Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddAnswersApi } from "../../api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  fetchQuestions } from "../../redux/slices/questionslice";
import FileUpload from "../../utlis/FileUpload"
import { fetchAnswers } from '../../redux/slices/answerslice';


export default function EditAnswer(props) {
const answer=props.answerSelected;
console.log(answer.Body)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error] = useState({ visible: false, message: "" });
  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    if (newImages === null) {
      answer.Filee.forEach((element) => {
        setImages(element);
      });
    } else {
      alert("hi")
      setUp(1);
      setImages(newImages);
    }
  };
 
  const [up, setUp] = useState(0);

  const formik = useFormik({
    initialValues: {
      Body: answer.Body,
      Writerq: { _id: "604e421a647d1719cb93d08e" },
      Filee: [],
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        values.Filee = Images;

        const res = await AddAnswersApi.putAnswers(values, answer._id);
        dispatch(fetchAnswers(answer.Question._id));
        
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
      
        <Icon name="edit">
        </Icon>
        
    }
    >
      <Modal.Header>Update Your Answer</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>

        
            
          <Form.Field
              control={TextArea}
              placeholder="write your answer here"
              label="Content"
              name="Body"
              value={formik.values.Body}
              onChange={formik.handleChange}
              error={formik.errors.Body}
            />
          <Button type="submit" color="red">
          Update!
          </Button>
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
