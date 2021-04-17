import React, { useState, useEffect, Suspense } from "react";
import { Container, Grid, Menu, Segment } from "semantic-ui-react";
import TableCourses from "../coursesAndSeances/TableCourses";

import { BrowserRouter as Router, Route } from "react-router-dom";

import ListCoursesBySeance from "../coursesAndSeances/ListCoursesBySeance";
import Header from "../header/Header";
import SideBareComponent from "../sideBare/sideBareComponent";
import TableSeance from "../coursesAndSeances/TableSeance";
import AddPost from "../question/AddPost";
import UpdateProfile from "../authentification/UpdateProfile";
import DetailCourses from "../coursesAndSeances/DetailCourses";
import DisplayTaskTeacher from "../Task/DisplayTaskTeacher";
import DisplayTaskStudent from "../Task/DisplayTaskStudent";
import StepsBar from "../Task/StepsBar";
import TaskFileDetail from "../Task/TaskFileDetail";
import EndQuiz from "../Quiz/EndQuiz";
import DetailTask from "../Task/DetailTask";
import QuestionComponent from "../question/QuestionComponent";
import DetailsQuestion from "../question/DetailsQuestionComponent";
import MemberComponent from "../Class/MemberComponent";
import PrivateRoute from "../../Routes/PrivateRoute";
import Quiz from "../Quiz/Quiz";

const server = process.env.REACT_APP_API_URL || "";
function Home() {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column width={3}>
            <SideBareComponent />
          </Grid.Column>
          <Grid.Column width={10}>
            <Container textAlign="center">
              <Header />
            </Container>

            <br />

            <Grid>
              <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={9}></Grid.Column>
              <Grid.Column width={4}></Grid.Column>
            </Grid>
            <Route
              path="/TaskList"
              exact
              render={(props) => <DisplayTaskTeacher {...props} />}
            />
            <Route
              path="/TaskListStudent"
              exact
              render={(props) => <DisplayTaskStudent {...props} />}
            />
            <Route
              path="/TaskQuiz/:id"
              exact
              render={(props) => <Quiz {...props} />}
            />
            <Route
              path="/Result/:id"
              exact
              render={(props) => <EndQuiz {...props} />}
            />
            <Route
              path="/AddTask"
              exact
              render={(props) => <StepsBar {...props} />}
            />
            <Route
              path="/DetailTask/:id"
              exact
              render={(props) => <DetailTask {...props} />}
            />
            <Route
              path="/TaskFileDetail/:id"
              exact
              render={(props) => <TaskFileDetail {...props} />}
            />
            <Route
              path="/seance/:titre/:id"
              exact
              render={(props) => <ListCoursesBySeance {...props} />}
            />
            <Suspense fallback={<h1>Loading data ...</h1>}></Suspense>
            <Route
              path="/updateProfile/:id"
              exact
              render={(props) => <UpdateProfile {...props} />}
            />
            <Route
              path="/detailCourses/:id"
              exact
              render={(props) => <DetailCourses {...props} />}
            />
            <Route
              path="/stream"
              exact
              render={(props) => <AddPost {...props} />}
            />
            <br />
            <Route
              path="/stream"
              exact
              render={(props) => <TableCourses {...props} />}
            />
            <PrivateRoute path="/FAQ" exact component={QuestionComponent} />
            <PrivateRoute path="/FAQ/:id" exact component={DetailsQuestion} />
            <PrivateRoute path="/members" exact component={MemberComponent} />
          </Grid.Column>
          <Grid.Column width={3}>
            <TableSeance />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
