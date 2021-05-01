import React, { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import {
  Comment,
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
import AddQuestion from "./AddQuestionComponent";
import FileUpload from "../../utlis/FileUpload";
import {
  fetchQuestions,
  selectQuestions,
} from "../../redux/slices/questionslice";
import { Link, useParams } from "react-router-dom";
import EditQuestions from "./EditQuestionComponent";
import { isAuth } from "../../helpers/auth";
import io from "socket.io-client";
import { AddquestionsApi } from "../../api/api";

const ENDPOINT = "https://closer-server.herokuapp.com/";

export default function QuestionComponent(props) {
  const { idd } = useParams();
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(currentClass._id));
  }, [dispatch]);

  const [enableUpload, setEnableUpload] = useState(false);

  const documentData = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  function handleOnEnter(text) {
    console.log("enter", text);
  }

  const [id, setIdquestion] = useState(null);
  const [questions, errr] = useSelector(selectQuestions);

  const [Images, setImages] = useState([]);
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const deletee = async (idq) => {
    try {
      const res = await AddquestionsApi.deleteQuestions(idq);
      dispatch(fetchQuestions(currentClass._id));
    } catch (error) {
      alert(error);
    }
  };
  const [filtrequestion, setfilterQuestionbyUser] = useState(false);
  const [loadmore, setloadmore] = useState(5)
  const [enableLoadMore, setenableLoadMore] = useState(true)
  const morQuestion =  (nb) => {
        setloadmore(loadmore +5)
        console.log(questions.length)
        if(questions.length-loadmore<=0 )
        {
          setenableLoadMore(false)
        }
    };
  return (
    <Container fluid>
      <AddQuestion floated="right" />
      <Link to="/MyPosts">
        <Label
          as="a"
          color="grey"
          image
          style={{ marginLeft: "60%", height: "34px" }}
          onClick={() => setfilterQuestionbyUser(true)}
        >
          <img src={isAuth().picture} />
          Your
          <Label.Detail>Posts</Label.Detail>
        </Label>
      </Link>
      {Number(questions.length) === 0 && (
        <Segment raised color="black" size="huge">
          <Header style={{ marginLeft: "35%" }} color="grey" size="huge">
            No Question{" "}
          </Header>
        </Segment>
      )}

      {questions.slice(0,loadmore).map((question, index) => (
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
                            <Icon name="file word" color="blue" size="huge" />
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
                            <Icon name="file text" size="huge" color="blue" />
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
              <Link to={"/tags/" + currentClass._id + "/" + hashtag}>
                <Label key={index} color="grey" as="a" tag>
                  #{hashtag}
                </Label>
              </Link>
            ))}
          </div>
          <Header dividing as="h3" style={{ marginLeft: "2%" }}></Header>
          <Segment inverted color="red">
            <Link to={"/FAQ/" + question._id} style={{ color: "white" }}>
              <h6 style={{ textAlign: "center" }}>See more</h6>
            </Link>
          </Segment>
          {enableLoadMore &&(
          <Segment raised color="grey" textAlign='center' onClick={()=>morQuestion(5)}>Load more.</Segment>

     )}

        </Segment>
        
      ))}
    </Container>
  );
}
const yupSchema = Yup.object({
  Body: Yup.string().required("Champs requis!"),
});
