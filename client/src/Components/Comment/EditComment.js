import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Modal, Button, Form, TextArea } from "semantic-ui-react";
import { CommentsApi } from "../../api/api";
import * as Yup from "yup";
import InputEmoji from "react-input-emoji";
import {
  fetchCommentsCourse,
  fetchCommentsTask,
  selectComments,
} from "../../redux/slices/commentslice";
function EditComment(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommentsCourse(props.courseID));
  }, [dispatch]);
  const [commentss, er] = useSelector(selectComments);
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }
  const formik = useFormik({
    initialValues: {
      Body: " " + props.comment.Body,
      Writer: { _id: "" + props.comment.Writer._id },
      Course: { _id: "" + props.comment.Course },
      task: { _id: "" + props.comment.Task },
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      try {
        alert(values.Body);
        const res = await CommentsApi.putComments(values, props.comment._id);
        if (props.comment.Task  == null) {
          dispatch(fetchCommentsCourse(props.comment.Course));
        } else {
          dispatch(fetchCommentsTask(props.comment.Task));
        }
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <div>
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
    </div>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
export default EditComment;
