import moment from "moment";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Statistic,
  Icon,
  Divider,
  Item,
  Label,
  Header,
  Segment,
  Grid,
  Image,
  Accordion,
} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";

import {
  getNbrTasksMissing,
  getNbrTasksRemis,
  getTaskByTeacher,
  updateTaskStatus,
  assignTask,
  assignAfterSave,
} from "../../redux/slices/Task";

const teacher = [{ id: "606781123ed972382c721fce", student: "Sofien" }];
export default function DisplayTaskTeacher() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const remis = useSelector((state) => state.tasks.nbrRemis);
  const missing = useSelector((state) => state.tasks.nbrMissing);
  console.log(tasks);
  const dispatch = useDispatch();

  const onSubmitAssignTask = (task) => {
    // dispatch(assignAfterSave(task));
    dispatch(updateTaskStatus(task)).then(() => {
      dispatch(assignAfterSave(task)).then(() => {
        dispatch(getTaskByTeacher(isAuth()._id));
      });
    });
  };
  const getItemInfo = (id) => {
    dispatch(getNbrTasksMissing(id));
    dispatch(getNbrTasksRemis(id));
  };
  useEffect(() => {
    dispatch(getTaskByTeacher(isAuth()._id));
  }, [isAuth()._id]);
  return (
    <>
      <Divider hidden />

      <Header as="h2" content="List Task" />

      <Divider />

      {!tasks ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="tasks" />
            No Tasks For you {teacher[0].student}.
          </Header>
        </Segment>
      ) : (
        tasks.map((task, index) => (
          <Link to={"/DetailTask/" + task._id}>
            <Segment color="grey" raised>
              <Item.Group divided key={index}>
                <Item>
                  <Item.Image
                    size="tiny"
                    avatar
                    src={process.env.PUBLIC_URL + "/quiz.png"}
                  />

                  <Item.Content>
                    <Item.Header as="a">{task.title}</Item.Header>
                    <Item.Meta>
                      <span className="cinema">
                        {moment(task.endDate).format("MMMM Do yy")}
                      </span>
                    </Item.Meta>
                    <Item.Description>{task.description}</Item.Description>
                  </Item.Content>

                  <Grid columns="equal">
                    <Grid.Row>
                      <Statistic.Group size="small">
                        <Statistic color="red">
                          <Statistic.Value>
                            {getItemInfo.call(this, task._id)}
                            {missing}
                          </Statistic.Value>

                          <Statistic.Label>Missing</Statistic.Label>
                        </Statistic>

                        <Grid.Column>
                          <Statistic color="green">
                            <Statistic.Value>
                              {getItemInfo.call(this, task._id)}
                              {remis}
                            </Statistic.Value>
                            <Statistic.Label>Done</Statistic.Label>
                          </Statistic>
                        </Grid.Column>
                      </Statistic.Group>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        {task.status === "not assign" ? (
                          <Button
                            color="red"
                            type="submit"
                            onClick={() => onSubmitAssignTask(task)}
                          >
                            Assign
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Item>
              </Item.Group>
            </Segment>

            <Divider hidden></Divider>
          </Link>
        ))
      )}
    </>
  );
}
