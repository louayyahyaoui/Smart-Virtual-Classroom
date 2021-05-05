import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Statistic,
  Icon,
  Divider,
  Item,

  Header,
  Segment,
  Grid,
  Dropdown,
  Confirm,

} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";

import {
  getNbrTasksMissing,
  getNbrTasksRemis,
  getTaskByTeacher,
  updateTaskStatus,

  assignAfterSave,
} from "../../redux/slices/Task";
import ModalAssignTask from "./ModalAssignTask";

import ModalConfirmDeleteTask from "./ModalConfirmDeleteTask";
import ModalUpdateTask from "./ModalUpdateTask";

export default function DisplayTaskTeacher() {

  const tasks = useSelector((state) => state.tasks.tasks);

  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const dispatch = useDispatch();
  const taskDetail={
    "idUser":isAuth()._id,
    "idClass" : currentClass._id,
    
  }


 
  useEffect(() => {
    dispatch(getTaskByTeacher(taskDetail));
 
  }, []);
  return (
    <>
      <Divider hidden />

      <Header as="h2" content="List Task" />

      <Divider />

      {tasks.length <=0  ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="tasks" />
            No Tasks Added.
            <Link to="/AddTask">
              <Button color='google plus' >
           Add Task
              </Button>
              
            </Link>
          </Header>
        </Segment>
      ) : (
        tasks.map((task, index) => (
         <>
            <Segment color="grey" raised>
              <Item.Group divided key={index}>
             
                <Item>
              
                  <Item.Image
                    size="tiny"
                    
                    avatar src={process.env.PUBLIC_URL +  task.typeTask === "Quiz" ? "/quiz.jpg" : "file.jpg"} 
                    /> 
              
  
                  <Item.Content>
                  <Link to={"/DetailTask/" + task._id}>
                    <Item.Header as="a">{task.title}</Item.Header>
                    </Link>
                    <Item.Meta>
                      <span className="cinema">
                        {moment(task.endDate).format("MMMM Do yy")}
                      </span>
                    </Item.Meta>
                    <Item.Description>{task.description}</Item.Description>
                  </Item.Content>
                
                  <Grid columns={6} >
                  <Grid.Row>
                      <Grid.Column width={5}>
                        {task.status === "not assign" ? (
                          <>
                       
    <ModalAssignTask task={task}></ModalAssignTask>
                          </>
                        ) : (
                      <></>
                        )}
                      </Grid.Column>
                    
                    </Grid.Row>
                  </Grid>
                    <Grid.Row >
                   
                
                    
                      <Grid.Column width={1}>  
                       <Dropdown
                              fluid
                              pointing
                              direction="left"
                              className="icon"
                              icon="ellipsis vertical"
                            >
                              <Dropdown.Menu>
                                <ModalUpdateTask
                                  headerTitle="Edit Task"
                                  buttonTriggerTitle="Edit"
                                  buttonColor="red"
                                  icon="edit"
                                  task={task}
                                >


                                </ModalUpdateTask>
                              <ModalConfirmDeleteTask
                                  headerTitle="Delete Task"
                                  buttonTriggerTitle="Delete"
                                  buttonColor="red"
                                  icon="trash"
                                  task={task}
                                 
                                />
                              </Dropdown.Menu>
                            </Dropdown></Grid.Column>
                    </Grid.Row>

          
                </Item>
              </Item.Group>
            </Segment>

            <Divider hidden></Divider>
          </>
        ))
      )}
    </>
  );
}
