import React, { useEffect } from "react";
import { Button, Form, TextArea, Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddAnswersApi } from "../../api/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../redux/slices/questionslice";
import FileUpload from "../../utlis/FileUpload";
import { fetchAnswers } from "../../redux/slices/answerslice";
import FileUploadEdit from "../../utlis/FileUploadEdit";

export default function EditAnswer(props) {
  const answer = props.answerSelected;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    if (newImages === null) {
      answer.Filee.forEach((element) => {
        setImages(element);
      });
    } else {
      //alert("hi");
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
        if (Images.length !== 0) {
          values.Filee = Images;
        } else {
          values.Filee = answer.Filee;
        }

        const res = await AddAnswersApi.putAnswers(values, answer._id);
        if (Images.length != 0) {
          setEnableUpload(true);
        }
        updateImages([]);
        console.log(res.ok)
        if (res.ok === 1) {
          setEnableUpload(false);
        }
        dispatch(fetchAnswers(answer.Question._id));
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
      trigger={<Icon name="edit"></Icon>}
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
          <div style={{ float: "right", marginRight: "5%" }}>
            <Button
              style={{ maxHeight: "40px" }}
              type="submit"
              content="Edit"
              icon="edit"
              color="red"

            />
            <Button color="black" onClick={() => setOpen(false) }>
              Cancel
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "5%" }}>
              <FileUploadEdit
                refreshFunction={updateImages}
                listfile={answer.Filee}
                Enbale={enableUpload}
              />
            </div>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
