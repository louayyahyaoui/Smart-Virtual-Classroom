import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";
import { assignGradeToStudent } from "../../redux/slices/Grade";
import { getDetailTask } from "../../redux/slices/Task";
import CorrectedTask from "./CorrectedTask";

export default function UncorrectedTask(props) {
  const { id } = useParams();
  const [grade, setGrade] = useState();
  const [_id, setIdTask] = useState();
  const [objgrade, setObjGrade] = useState({ _id: null, grade: null });

  const submitGrade = (e, data) => {
    setObjGrade({ _id: data, grade: e.target.value });

    console.log(objgrade);
  };
  const dispatch = useDispatch();

  const assignGrade = () => {
    dispatch(assignGradeToStudent(objgrade)).then(() => {
      dispatch(getDetailTask(id));
    });
  };
  console.log(props.uncorrectTasks);

  useEffect(() => {
    dispatch(getDetailTask(id));
  }, [id]);

  return (
    <div>
      <Card.Group>
        {props.uncorrectTasks.length <= 0 ? (
          <div> </div>
        ) : (
          props.uncorrectTasks.map((task, index) =>
            task.grade === null ? (
              <Card key={index} color="red" raised>
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src={task.student.picture}
                  />
                  <Card.Header>{task.student.name}</Card.Header>

                  <Card.Meta>
                    <strong>{task.taskStatus}</strong>
                  </Card.Meta>
                  <Card.Description>
                    {task.task.typeTask === "File" ? (
                      <>
                        <Feed.Extra images style={{ display: "flex" }}>
                          <List horizontal>
                            {task.listReponse.map((file, index) => (
                              <List.Item key={index}>
                                {(() => {
                                  switch (file.toString().split(".").pop()) {
                                    case "pdf":
                                      return (
                                        <a
                                          href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
                                        >
                                          <Icon name="zip" size="huge" />
                                        </a>
                                      );
                                    case "js":
                                      return (
                                        <a
                                          href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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
                                          target="_blank"
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

                                <p>{file.toString().split("_").pop()}</p>
                              </List.Item>
                            ))}
                          </List>
                        </Feed.Extra>

                        <Input
                    name="grade"
                    type="number"
                    size="mini"
                    onChange={(e) => submitGrade(e, task._id)}
                  />
                  
                  <Button color="red" size='mini' floated onClick={() => assignGrade()}>
                    Send
                  </Button>
                      </>

                    ) : (
                      <>
                        {" "}
                        <strong> Quiz </strong>{" "}
                      </>
                    )}


                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
               
                <Link to={ task.task.typeTask === "File" ? "/TaskFileDetail/"+task._id :  "/TaskQuizDetail/"+task._id }>
            <Button  inverted fluid color="red" content="View Detail"/>
            </Link>
       
                </Card.Content>
              </Card>
            ) : (
              <></>
            )
          )
        )}
      </Card.Group>
    </div>
  );
}
