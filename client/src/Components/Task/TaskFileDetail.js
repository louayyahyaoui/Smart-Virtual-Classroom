import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Message,
} from "semantic-ui-react";
import { getDetailByTaskByStudent, rendreTask } from "../../redux/slices/Grade";
import CommentComponent from "../Comment/CommentComponent";
import ModalTask from "./ModalTask";

export default function TaskFileDetail() {
  const { id } = useParams();
  const state = useSelector((state) => state.grades.grades);
  //const files = useSelector((state) => state.tasks.files);
  const [task ,setTask] = useState(state[0]);

  const grade = {
    id: id,
    taskStatus: "remis",
  //  listReponse: files,
  };


  const dispatch = useDispatch();
  const submitTask = () => {
    console.log("grade : ");
    console.log(grade);
  
    dispatch(rendreTask(grade)).then(() => {
      dispatch(getDetailByTaskByStudent(id)).then((response)=>{
     
  setTask(response.payload[0]);
      });
    });
  };
 // console.log(task);
  useEffect(() => {
    
    dispatch(getDetailByTaskByStudent(id)).then((response)=>{
     
      setTask(response.payload[0]);
          });
          console.log(task);
    
  }, [id]);

  return (
    <div>
      {!task ? (
        <></>
      ) : (
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Grid.Column width={14}>
              <Grid>
                {" "}
                <Grid.Row>
                  {" "}
                  <Grid.Column width={12}>
                    <Header as="h1" color="black">
                      <Icon circular name="file alternate" />
                      <Header.Content >
                     {task.task.title}
                        
                        <Header.Subheader>
                          <ReactTimeAgo
                            date={task.task.DateAt}
                            locale="en-US"
                          />
                        </Header.Subheader>
                       
                        
                      </Header.Content>
                    </Header>
                    <Divider></Divider>
                    <br />
                    <Container>
                      <h6>{task.task.description}</h6>
                    </Container><br/>
                    <Grid>
                      <Grid.Row>
                      <List horizontal>
                        {!task.task.listQuestion ? (
                          <> <p></p></>
                        ) : (
                          
                          task.task.listQuestion.map((file, index) =>
                         <>
                          <List.Item key={index}>
   
                      {( () => {
                     var f =   file + '';
                       f.split(".").pop();
                    switch (file.toString().split(".").pop()) {
                      case "pdf":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            {" "}
                            <Icon name="file pdf" color="red" size="massive" />
                          </a>
                        );
                      case "docx":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            <Icon name="file word" color="blue" size="massive" />
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
                              size="massive"
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
                              size="massive"
                            />
                          </a>
                        );
                      case "zip":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            <Icon name="zip" size="massive" />
                          </a>
                        );
                      case "js":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            <Icon name="js" color="yellow" size="massive" />
                          </a>
                        );
                      case "php":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            <Icon name="zip" color="blue" size="massive" />
                          </a>
                        );
                      case "txt":
                        return (
                          <a
                            href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                          >
                            <Icon name="file text" size="massive" color="blue" />
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
                                width: "250px",
                                height: "100px",
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
                                width: "250px",
                                height: "100px",
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
                                width: "250px",
                                height: "100px",
                              }}
                              src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                              alt={`scan`}
                            />
                          </a>
                        );

                      default:
                        return <Icon name="File" color="Black" size="massive" />;
                    }
                  })()}

                  <p>{file.toString().split("_").pop()}</p>
                  </List.Item>
                         </>
                          )
                        )}
                        </List>
                      </Grid.Row>
                    </Grid>
                    <br />
                  
                    <CommentComponent taskID={id} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Card>
                      <Card.Content>
                      <Card.Header >Your Task -<ReactTimeAgo
                            date={task.task.endDate}
                            locale="en-US"
                          />
                          </Card.Header>

                        <Card.Description>
                          {task.taskStatus === "Remis" ? (
                            <>
                              <Message positive>
                                <Message.Header>
                                  Task Added Succesfully
                                </Message.Header>
                              </Message>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Message
                                header="Upload Your File Here "
                                content="Good Luck For your assignment"
                              />
                            </>
                          )}
                        </Card.Description>
                        <br />
                   
                      </Card.Content>
                      <Card.Content extra>
                      <ModalTask  task={state[0]}/>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column width={1}></Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
}
