import { fetchAnswers, selectAnswer } from "../../redux/slices/answerslice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { selectQuestions } from "../../redux/slices/questionslice";
import "semantic-ui-css/semantic.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AddAnswersApi, notificationsApi } from "../../api/api";
import { fetchQuestions } from "../../redux/slices/questionslice";
import { AddquestionsApi } from "../../api/api";
import InputEmoji from "react-input-emoji";
import {
  Button,
  Card,
  Comment,
  Container,
  Dropdown,
  Feed,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Message,
  Segment,
  TextArea,
} from "semantic-ui-react";
import AddQuestion from "./AddQuestionComponent";
import FileUpload from "../../utlis/FileUpload";
import EditQuestions from "./EditQuestionComponent";
import EditAnswer from "../answer/EditAnswer";
import io from "socket.io-client";

const ENDPOINT = "https://closer-server.herokuapp.com/";
  function DetailsQuestion(props) {
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const socket = io(ENDPOINT);

  const documentData = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  function handleOnEnter(text) {
  }
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(currentClass._id));
  }, [dispatch]);

  const id = props.match.params.id;
  useEffect(() => {
    socket.on("new-answer", (content) => {
      dispatch(fetchAnswers(id));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const [questions, errr] = useSelector(selectQuestions);
  useEffect(() => {
    dispatch(fetchAnswers(id));
  }, [dispatch]);
  const [notif] = useState({
    Message: "new comment for your question !",
    Owner: [],
    Question: { _id: "" + id },
  });
  const [questionAndanswer, er] = useSelector(selectAnswer);
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
          const res = await AddAnswersApi.postAnswers(values);

          if (Images.length != 0) {
            setEnableUpload(true);
          }
          try {
            let arr;
            questions.forEach((element) => {
              if (element._id === id) {
                arr = [element.Writerq._id];
              }
            });
            notif.Owner = arr;
            const res2 = await notificationsApi.addNotification(notif);

            socket.emit("add-new-notification", arr);
          } catch (error) {
            alert(error);
          }
          setText("");
          updateImages([]);
          dispatch(fetchQuestions(currentClass._id));

          dispatch(fetchAnswers(id));

          socket.emit("send_answer", "message");
        }
      } catch (error) {
        alert(error);
      }
    },
  });
  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  /*const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };*/

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletee = async () => {
    try {
      const res = await AddquestionsApi.deleteQuestions(id);
      dispatch(fetchQuestions(currentClass._id));
      socket.emit("send_question", "message");

      history.push("/FAQ");
    } catch (error) {
      alert(error);
    }
  };
  const deleteeAsnwer = async (idA) => {
    try {
      const res = await AddAnswersApi.deleteAnswers(idA);
      dispatch(fetchAnswers(id));

      socket.emit("send_answer", "message");
    } catch (error) {
      alert(error);
    }
  };
  const [enableUpload, setEnableUpload] = useState(false);
  const [loadmore, setloadmore] = useState(5);
  const [enableLoadMore, setenableLoadMore] = useState(true);
  const morQuestion = () => {
    setloadmore(loadmore + 5);
    if (questions.length - loadmore <= 0) {
      setenableLoadMore(false);
    }
  };
  return (
    <Container>
      <AddQuestion />
      {Number(questions.length) === 0 && (
          <div>
          
          <Image 
          
            centered
            size='large'
            src={process.env.PUBLIC_URL + "/no_questions.png"}  alt="no-question"          />
        </div>
      )}
      {questions
        .filter((q) => q._id === id)
        .map((question, index) => (
          <Card fluid key={index}>
            <Segment raised color="grey">
              {question.Writerq._id === documentData._id && (
                <Dropdown floated icon="ellipsis vertical">
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <EditQuestions qes={question} />
                    </Dropdown.Item>
                    <Dropdown.Item onClick={deletee}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Feed>
                <Feed.Event>
                  <Feed.Label image={question.Writerq.picture} />
                  <Feed.Content>
                    <Feed.Date>{question.Date}</Feed.Date>
                    <Feed.Summary>
                      <a>{question.Writerq.name}</a>
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
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                {" "}
                                <Icon name="file pdf" color="red" size="huge" />
                              </a>
                            );
                          case "docx":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon
                                  name="file word"
                                  color="blue"
                                  size="huge"
                                />
                              </a>
                            );
                          case "pptx":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon
                                  name="file powerpoint"
                                  color="red"
                                  size="huge"
                                />
                              </a>
                            );
                          case "xlsx":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon
                                  name="file excel outline"
                                  color="green"
                                  size="huge"
                                />
                              </a>
                            );
                          case "zip":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon name="zip" size="huge" />
                              </a>
                            );
                          case "js":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon name="js" color="yellow" size="huge" />
                              </a>
                            );
                          case "php":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon name="zip" color="blue" size="huge" />
                              </a>
                            );
                          case "txt":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <Icon
                                  name="file text"
                                  size="huge"
                                  color="blue"
                                />
                              </a>
                            );

                          case "jpg":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <img
                                  style={{
                                    minWidth: "50px",
                                    width: "50px",
                                    height: "50px",
                                  }}
                                  src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                  alt={`scan`}
                                />
                              </a>
                            );
                          case "jpeg":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <img
                                  style={{
                                    minWidth: "50px",
                                    width: "50px",
                                    height: "50px",
                                  }}
                                  src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                  alt={`scan`}
                                />
                              </a>
                            );
                          case "png":
                            return (
                              <a
                                href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              >
                                <img
                                  style={{
                                    minWidth: "50px",
                                    width: "50px",
                                    height: "50px",
                                  }}
                                  src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                  alt={`scan`}
                                />
                              </a>
                            );

                          default:
                            return (
                              <Icon name="File" color="Black" size="huge" />
                            );
                        }
                      })()}

                      <p>{file.split("_").pop()}</p>
                    </List.Item>
                  ))}
                </List>
              </Feed.Extra>
              <div style={{ marginTop: "3%", marginBottom: "3%" }}>
                {question.Hashtags.map((hashtag, index) => (
                  <Label color="grey" as="a" tag key={index}>
                    #{hashtag}
                  </Label>
                ))}
              </div>
              <InputEmoji
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                value={text}
                placeholder="Type a message"
              />
              <Form onSubmit={formik.handleSubmit}>
                <div style={{ float: "right", marginRight: "5%" }}>
                  <Button
                    style={{ maxHeight: "40px" }}
                    type="submit"
                    content="Reply"
                    icon="edit"
                  />
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
              <Header dividing as="h3" style={{ marginLeft: "2%" }}>
                Comments ({questionAndanswer.length})
              </Header>
              {questionAndanswer.slice(0, loadmore).map((answer, index) => (
                <Comment.Group style={{ marginLeft: "5%" }} key={index}>
                  <Comment>
                    <Comment.Avatar as="a" src={answer.Writer.picture} />
                    <Comment.Content>
                      <Comment.Author>{answer.Writer.name}</Comment.Author>
                      <Comment.Metadata>
                        <div>
                          <Icon name="calendar" />
                        </div>
                        <div>{answer.Date}</div>
                      </Comment.Metadata>
                      <Comment.Text as="p">{answer.Body}</Comment.Text>

                      <Feed.Extra images style={{ display: "flex" }}>
                        <List horizontal>
                          {answer.Filee.map((file, index) => (
                            <List.Item key={index}>
                              {(() => {
                                switch (file.split(".").pop()) {
                                  case "pdf":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        {" "}
                                        <Icon
                                          name="file pdf"
                                          color="red"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "docx":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="file word"
                                          color="blue"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "pptx":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="file powerpoint"
                                          color="red"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "xlsx":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="file excel outline"
                                          color="green"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "zip":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon name="zip" size="huge" />
                                      </a>
                                    );
                                  case "js":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="js"
                                          color="yellow"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "php":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="zip"
                                          color="blue"
                                          size="huge"
                                        />
                                      </a>
                                    );
                                  case "txt":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <Icon
                                          name="file text"
                                          size="huge"
                                          color="blue"
                                        />
                                      </a>
                                    );

                                  case "jpg":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <img
                                          style={{
                                            minWidth: "50px",
                                            width: "50px",
                                            height: "50px",
                                          }}
                                          src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                          alt={`scan`}
                                        />
                                      </a>
                                    );
                                  case "jpeg":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <img
                                          style={{
                                            minWidth: "50px",
                                            width: "50px",
                                            height: "50px",
                                          }}
                                          src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                          alt={`scan`}
                                        />
                                      </a>
                                    );
                                  case "png":
                                    return (
                                      <a
                                        href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      >
                                        <img
                                          style={{
                                            minWidth: "50px",
                                            width: "50px",
                                            height: "50px",
                                          }}
                                          src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                          alt={`scan`}
                                        />
                                      </a>
                                    );

                                  default:
                                    return (
                                      <Icon
                                        name="File"
                                        color="Black"
                                        size="huge"
                                      />
                                    );
                                }
                              })()}

                              <p>{file.split("_").pop()}</p>
                            </List.Item>
                          ))}
                        </List>
                      </Feed.Extra>
                      {answer.Writer._id === documentData._id && (
                        <Comment.Actions>
                          <EditAnswer answerSelected={answer} />
                          <Icon
                            name="delete"
                            onClick={() => deleteeAsnwer(answer._id)}
                            color="red"
                          />
                        </Comment.Actions>
                      )}
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              ))}
              {enableLoadMore && (
                <Segment
                  raised
                  color="grey"
                  textAlign="center"
                  onClick={() => morQuestion(5)}
                >
                  Load more.
                </Segment>
              )}
            </Segment>
          </Card>
        ))}
    </Container>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
export default DetailsQuestion;
