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
import FileUpload from "../../utlis/FileUpload";
import FileUploadEdit from "../../utlis/FileUploadEdit";
export default function SendTask(props) {
  const [activeIndex, setActiveIndex] = useState();
  const dispatch = useDispatch();
 
 
  const [Images, setImages] = useState(props.data.listQuestion);

  const [enableUpload, setEnableUpload] = useState(false);
 
const updateImages = (newImages) => {

  setImages(newImages);
  
 
};
  var step = 3;
  console.log("cc");
  console.log(props.data);
  const [cancel, setCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [opensave, setOpensave] = useState(false);

  const [close, setClose] = useState(false);
  const clicCancel = () => {
    setCancel(true);
  };
  const clicOpen = () => {
    setOpen(true);
  };
  const clicOpensave = () => {
    setOpensave(true);
  };
  const clicConfirmCancel = () => {
    //dispatch(postTasks(props.data));
   // props.nextStep(step + 1);
   setCancel(false);
  };
  const clicConfirm = () => {
   
    dispatch(postTasks(props.data));
    props.nextStep(step + 1);
    setOpensave(false);
  };
  const clicConfirmAssign = () => {
    dispatch(assignTask(props.data));
    props.nextStep(step + 1);
    setOpen(false);
  };
  const clicClose = () => {
    setOpen(false);
  };
  const clicClosesave = () => {
    setOpensave(false);
  };
  const clicCloseCancel = () => {
    setCancel(false);
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
                      {(     quiz.foptionA === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {quiz.foptionA}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionB === quiz.correct_answer}
                      negative={quiz.foptionB !== quiz.correct_answer}
                    >
                      <Table.Cell> 
                      {(     quiz.foptionB === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {quiz.foptionB}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionC === quiz.correct_answer}
                      negative={quiz.foptionC !== quiz.correct_answer}
                    >
                      <Table.Cell>
                      {(     quiz.foptionC === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                         {quiz.foptionC}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                      positive={quiz.foptionD === quiz.correct_answer}
                      negative={quiz.foptionD !== quiz.correct_answer}
                    >
                      <Table.Cell>
                      {(     quiz.foptionD === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                         {quiz.foptionD}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Divider hidden />
              </Grid.Column>
            ))
          ) : props.data.listQuestion.legnth >=0 ? (
            <></>
          ) : (
           
            <FileUploadEdit
            refreshFunction={updateImages}
            listfile={props.data.listQuestion}  
          />
          )}
        </Grid.Row>
      </Grid>

      <Button.Group floated="right">
        <Button onClick={() => clicCancel()}>Cancel</Button>
        <Confirm
          header="Cancel Add "
          content="Are you sure?"
          open={cancel}
          onCancel={clicCloseCancel}
          onConfirm={clicConfirmCancel}
        />
        <Button.Or />
        <Button
          color="red"
          type="submit"
          onClick={() => clicOpensave()}
          //onClick={onSubmitSaveTask}
        >
          Save
        </Button>
        <Confirm
          header="Save Task To Assign"
          content="Are you sure?"
          open={opensave}
          onCancel={clicClosesave}
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
