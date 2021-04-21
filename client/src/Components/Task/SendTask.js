import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Step,
  Icon,
  Button,
  Label,
  Item,
  Divider,
  Header,
  Grid,
  Segment,
  Table,
  List,
  Image,
  Confirm,
} from "semantic-ui-react";
import { assignTask, postTasks } from "../../redux/slices/Task";
import moment from "moment";

import ReactPlayer from "react-player";
export default function SendTask(props) {
  const [activeIndex, setActiveIndex] = useState();
  const dispatch = useDispatch();
 

 
  var step = 3;
 

  const [open, setOpen] = useState(false);

  const [close, setClose] = useState(false);
  const clicOpen = () => {
    setOpen(true);
  };
  const clicConfirm = () => {
    dispatch(postTasks(props.data));
    props.nextStep(step + 1);
    setOpen(false);
  };
  const clicConfirmAssign = () => {
    dispatch(assignTask(props.data));
    props.nextStep(step + 1);
    setOpen(false);
  };
  const clicClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid centered columns={3}>
        <Grid.Column></Grid.Column>
      </Grid>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="newspaper" />
          Info Task
        </Header>
      </Divider>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment raised>
              <Item.Group divided>
                <Item>
                  <Item.Content>
                    <Item.Header as="a">{props.data.title}</Item.Header>
                    <Item.Meta>
                      <span className="cinema">
                        {moment(props.data.endDate).format("MMMM Do yy")}
                      </span>
                    </Item.Meta>
                    <Item.Description>
                      {props.data.description}
                    </Item.Description>
                    <Item.Extra>
                      <Label icon="tasks" content={props.data.typeTask} />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Item.Group>
                <Item>
                  <Item.Content verticalAlign="middle">
                    <Item.Header>
                      <List animated verticalAlign="middle">
                        {props.data.listStudents.map((student) =>(
                        <List.Item>
                          <Image
                            avatar
                            src={student.picture}
                          />
                          <List.Content>
                            <List.Header>{student.name}</List.Header>
                          </List.Content>
                        </List.Item>
                  ) )}
                      </List>
                    </Item.Header>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tasks" />
          Questions
        </Header>
      </Divider>
      <Grid columns="three">
        <Grid.Row>
          {props.data.typeTask === "Quiz" ? (
            props.data.listQuestion.map((quiz, index) => (
              <Grid.Column>
                <Table key={index} color="red" textAlign="center">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {quiz.fquestion + "?"}{" "}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row
                      positive={quiz.foptionA === quiz.correct_answer}
                      negative={quiz.foptionA !== quiz.correct_answer}
                    >
                      <Table.Cell>
                        <Icon name="check circle" color="green" />
                        {quiz.foptionA}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionB === quiz.correct_answer}
                      negative={quiz.foptionB !== quiz.correct_answer}
                    >
                      <Table.Cell> {quiz.foptionB}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionC === quiz.correct_answer}
                      negative={quiz.foptionC !== quiz.correct_answer}
                    >
                      <Table.Cell> {quiz.foptionC}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionD === quiz.correct_answer}
                      negative={quiz.foptionD !== quiz.correct_answer}
                    >
                      <Table.Cell> {quiz.foptionD}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Divider hidden />
              </Grid.Column>
            ))
          ) : props.data.listQuestion.legnth >=0 ? (
            <></>
          ) : (
            <Grid>
              <Grid.Row>
                {props.data.listQuestion.map((files, index) =>
                  files.split(".").pop() === "pdf" ||
                  files.split(".").pop() === "pptx" ||
                  files.split(".").pop() === "docx" ? (
                    <div key={index}>
                      <a href={files} target="_blank" rel="noopener noreferrer">
                        <div>
                          <Grid.Column width={3}>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/files-type/" +
                                files.split(".").pop() +
                                ".png"
                              }
                              style={{
                                margin: "10px",
                                height: "100px",
                                width: "100px",
                              }}
                              alt=""
                            />
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Grid.Row>
                              <Header as="h4" color="red">
                                {files.split("-").pop().slice(0, 7) +
                                  "." +
                                  files.split(".").pop()}
                              </Header>
                            </Grid.Row>
                            <Grid.Row>
                              <Header as="h4" color="grey">
                                {files.split("-").pop().slice(0, 7) +
                                  "." +
                                  files.split(".").pop()}{" "}
                                File
                              </Header>
                            </Grid.Row>
                          </Grid.Column>
                        </div>
                      </a>
                    </div>
                  ) : files.split(".").pop() === "mp3" ||
                    files.split(".").pop() === "mp4" ? (
                    <ReactPlayer
                      key={index}
                      width="300px"
                      height="230px"
                      controls={true}
                      url={files}
                    />
                  ) : files.split(".").pop() === "png" ||
                    files.split(".").pop() === "jpg" ||
                    files.split(".").pop() === "jpeg" ||
                    files.split(".").pop() === "gif" ? (
                    <div>
                      <Grid.Column width={3}>
                        <a
                          href={files}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={files}
                            alt={files.split("-").pop()}
                            style={{
                              margin: "10px",
                              height: "100px",
                              width: "100px",
                            }}
                          />
                        </a>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <Grid.Row>
                          <Header as="h4" color="red">
                            {files.split("-").pop().slice(0, 7) +
                              "." +
                              files.split(".").pop()}
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          <Header as="h4" color="grey">
                            {files.split(".").pop()} File
                          </Header>
                        </Grid.Row>
                      </Grid.Column>
                    </div>
                  ) : (
                    // <a href={files} target="_blank" rel="noopener noreferrer">
                    //   <img
                    //     src={files}
                    //     width="300px"
                    //     style={{ margin: "2px" }}
                    //     alt=""
                    //   />
                    // </a>
                    <a href={files} target="_blank" rel="noopener noreferrer">
                      <div>
                        <Grid.Column width={3}>
                          <img
                            style={{
                              margin: "10px",
                              height: "100px",
                              width: "100px",
                            }}
                            src={
                              process.env.PUBLIC_URL +
                              "/files-type/" +
                              "noFile.png"
                            }
                            alt={files.split("-").pop()}
                          />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Grid.Row>
                            <Header as="h4" color="red">
                              {files.split("-").pop().slice(0, 7) +
                                "." +
                                files.split(".").pop()}
                            </Header>
                          </Grid.Row>
                          <Grid.Row>
                            <Header as="h4" color="grey">
                              {files.split("-").pop().slice(0, 7) +
                                "." +
                                files.split(".").pop()}{" "}
                              File
                            </Header>
                          </Grid.Row>
                        </Grid.Column>
                      </div>
                    </a>
                  )
                )}
              </Grid.Row>
            </Grid>
          )}
        </Grid.Row>
      </Grid>

      <Button.Group floated="right">
        <Button onClick={() => clicOpen()}>Cancel</Button>
        <Confirm
          header="Cancel Add "
          content="Are you sure?"
          open={open}
          onCancel={clicClose}
          onConfirm={clicConfirm}
        />
        <Button.Or />
        <Button
          color="red"
          type="submit"
          onClick={() => clicOpen()}
          //onClick={onSubmitSaveTask}
        >
          Save
        </Button>
        <Confirm
          header="Save Task To Assign"
          content="Are you sure?"
          open={open}
          onCancel={clicClose}
          onConfirm={clicConfirm}
        />
        <Button.Or />
        <Button
          color="red"
          type="submit"
          // onClick={onSubmitAssignTask}
          onClick={() => clicOpen()}
        >
          Assign
        </Button>
        <Confirm
          header="Assign Task To Student"
          content="Are you sure?"
          open={open}
          onCancel={clicClose}
          onConfirm={clicConfirmAssign}
        />
      </Button.Group>
    </div>
  );
}
