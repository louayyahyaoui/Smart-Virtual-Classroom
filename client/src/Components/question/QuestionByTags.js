import React, { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import {

  Form,
  Button,
  Header,
  Icon,
  Segment,
  Feed,
  Container,
  Dropdown,
  Message,
  Label,
  List,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddAnswersApi, AddquestionsApi } from "../../api/api";
import AddQuestion from "./AddQuestionComponent";
import FileUpload from "../../utlis/FileUpload";
import {

    fetchQuestionsByTags, selectQuestions,

} from "../../redux/slices/questionslice";
import { Link, useParams } from "react-router-dom";
import EditQuestions from "./EditQuestionComponent";
import io from "socket.io-client";

const ENDPOINT = "https://closer-server.herokuapp.com/";

export default function QuestionByTags(props) {
  const socket = io(ENDPOINT);
  const { tag } = useParams();
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  console.log("id class : " + currentClass._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestionsByTags(currentClass._id,tag));
  }, [dispatch]);

 
 
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }


  const [id, setIdquestion] = useState(null);
  const [questions, errr] = useSelector(selectQuestions);
  const formik = useFormik({
    initialValues: {
      Body: " ",
      Writer: { _id: "" + documentData._id },
      Question: {},
      Filee: [],
    },
    validationSchema: yupSchema,

    onSubmit: async (values) => {
      values.Question = id;
      values.Filee = Images;
      values.Body = text;
      try {
        if (values.Body !== " ") {
          alert(JSON.stringify(values));

          const res = await AddAnswersApi.postAnswers(values);
          alert(JSON.stringify(res));
          dispatch(fetchQuestionsByTags(currentClass._id,tag));
        
          socket.emit("send_question", "message");

          setText("");
          setImages([]);
        }
        console.log("error");
      } catch (error) {
        alert(error);
      }
    },
  });
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {

   
    setImages(newImages);
  };
  const deletee = async (idq) => {
    try {
      const res = await AddquestionsApi.deleteQuestions(idq);
      dispatch(fetchQuestionsByTags(currentClass._id,tag));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container fluid>
      <AddQuestion floated="right" />
      {Number(questions.length) === 0 && (
        <Segment raised color="black" size="huge">
          <Header style={{ marginLeft: "35%" }} color="grey" size="huge">
            No Question{" "}
          </Header>
        </Segment>
      )}
      {questions.map((question, index) => (
        <Segment key={index} raised color="grey">
          {question.Writerq._id === documentData._id && (
            <Dropdown floated="right" icon="ellipsis vertical">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <EditQuestions qes={question} />
                </Dropdown.Item>
                <Dropdown.Item onClick={() => deletee(question._id)}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Feed>
            <Feed.Event>
              <Feed.Label image={question.Writerq.picture} />
              <Feed.Content>
                <Feed.Date>{question.Date}</Feed.Date>
                <Feed.Summary>
                  <p>{question.Writerq.name} </p>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          <Message>
            <Message.Header>{question.Title}</Message.Header>
            <p>{question.Body}</p>
          </Message>{" "}
          <Feed.Extra images>
            <List horizontal>
              {question.Filee.map((file, index) => (
                <List.Item key={index}>
                  {(() => {
                    switch (file.split(".").pop()) {
                      case "pdf":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            {" "}
                            <Icon name="file pdf" color="red" size="huge" />
                          </a>
                        );
                      case "docx":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon name="file word" color="blue" size="huge" />
                          </a>
                        );
                      case "pptx":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon
                              name="file powerpoint"
                              color="red"
                              size="huge"
                            />
                          </a>
                        );
                      case "xlsx":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon
                              name="file excel outline"
                              color="green"
                              size="huge"
                            />
                          </a>
                        );
                      case "zip":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon name="zip" size="huge" />
                          </a>
                        );
                      case "js":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon name="js" color="yellow" size="huge" />
                          </a>
                        );
                      case "php":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon name="zip" color="blue" size="huge" />
                          </a>
                        );
                      case "txt":
                        return (
                          <a href={`http://localhost:5000/file/${file}`}>
                            <Icon name="file text" size="huge" color="blue" />
                          </a>
                        );

                      case "jpg":
                        return (
                          <img
                            style={{
                              minWidth: "50px",
                              width: "50px",
                              height: "50px",
                            }}
                            src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                            alt={`scan`}
                          />
                        );
                      case "jpeg":
                        return (
                          <img
                            style={{
                              minWidth: "50px",
                              width: "50px",
                              height: "50px",
                            }}
                            src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                            alt={`scan`}
                          />
                        );
                      case "png":
                        return (
                          <img
                            style={{
                              minWidth: "50px",
                              width: "50px",
                              height: "50px",
                            }}
                            src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                            alt={`scan`}
                          />
                        );

                      default:
                        return <Icon name="File" color="Black" size="huge" />;
                    }
                  })()}

                  <p>{file.split("_").pop()}</p>
                </List.Item>
              ))}
            </List>
          </Feed.Extra>
          <div style={{ marginTop: "3%", marginBottom: "3%" }}>
            {question.Hashtags.map((hashtag, index) => (
              <Label key={index} color="grey" as="a" tag>
                #{hashtag}
              </Label>
            ))}
          </div>
          <InputEmoji
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />
          <Form onSubmit={formik.handleSubmit}>
            <div style={{ float: "right", marginRight: "5%" }}>
              <Button
                style={{ maxHeight: "40px" }}
                type="submit"
                content="Reply"
                icon="edit"
                onClick={() => setIdquestion(question._id)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "5%" }}>
                <FileUpload refreshFunction={updateImages} listfile={null} />
              </div>
            </div>
          </Form>
          <Header dividing as="h3" style={{ marginLeft: "2%" }}>
            Comments({question.Question_Answer.length})
          </Header>
          <Segment inverted color="red">
            <Link to={"/FAQ/" + question._id} style={{ color: "white" }}>
              <h6 style={{ textAlign: "center" }}>See more</h6>
            </Link>
          </Segment>
        </Segment>
      ))}
    </Container>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
