import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RetrieveSeances } from "../../redux/slices/Seance";
import { RetrieveCourses } from "../../redux/slices/Courses";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
} from "semantic-ui-react";
import ModalSeance from "./ModalSeance";
import uploader from "./uploader";
import TableCourses from "./TableCourses";
import TableSeance from "./TableSeance";
import ModalCourses from "./ModalCourses";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Link } from "react-router-dom";

import FormSeance from "./FormSeance";
import ListCoursesBySeance from "./ListCoursesBySeance";
import CoursesDetail from "./CoursesDetail";

const server = process.env.REACT_APP_API_URL || "";
function HomeCoursesAndSeance() {
  const seances = useSelector((state) => state.seance.seance);
  const courses = useSelector((state) => state.courses.seance);
  console.log(seances);
  console.log(courses);
  const [activeItem, setActiveItem] = useState();
  const [listSeances, setListSeance] = useState(seances);
  const [listCourses, setListCourses] = useState(courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RetrieveSeances());
    dispatch(RetrieveCourses());
  }, [dispatch]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Router>
        <Grid stackable celled="internally">
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Menu pointing secondary position="center">
                <Menu.Item
                  name="Stream"
                  icon="comments"
                  active={activeItem === "Stream"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Teachers"
                  icon="users"
                  active={activeItem === "Teachers"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Students"
                  icon="users"
                  active={activeItem === "Students"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Schedule"
                  icon="calendar alternate"
                  active={activeItem === "Schedule"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Settings"
                  icon="settings"
                  active={activeItem === "Settings"}
                  onClick={handleItemClick}
                />
              </Menu>

              <br />

              <Grid stackable>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={9}></Grid.Column>
                <Grid.Column width={4}>
                  <ModalCourses
                    headerTitle="Add Courses"
                    buttonTriggerTitle="Add Courses"
                    buttonSubmitTitle="Add"
                    buttonColor="red"
                    icon="add"
                  />
                </Grid.Column>
              </Grid>

              <ModalSeance />

              <Switch>
                <Route exact path="/">
                  <TableCourses courses={listCourses} />
                </Route>

                <Route path="/seance/:titre/:id">
                  <ListCoursesBySeance></ListCoursesBySeance>
                </Route>
                <Route path="/coursesDetail/:id">
                  <CoursesDetail></CoursesDetail>
                </Route>
              </Switch>
            </Grid.Column>
            <Grid.Column width={3}>
              <ModalSeance
                headerTitle="Add Seance"
                buttonTriggerTitle="Add Seance"
                buttonSubmitTitle="Add"
                buttonColor="black"
                icon="add"
              />
              <br />
              <Segment>
                <Link to="/">
                  <Header color="red" as="h3" textAlign="center">
                    All Themes
                  </Header>
                </Link>
              </Segment>

              <TableSeance seances={listSeances} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    </div>
  );
}

export default HomeCoursesAndSeance;
