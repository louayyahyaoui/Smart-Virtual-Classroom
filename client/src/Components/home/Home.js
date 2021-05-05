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
import ReminderTask from "../Task/ReminderTask";
import QuestionComponent from "../question/QuestionComponent";
import DetailsQuestion from "../question/DetailsQuestionComponent";
import MemberComponent from "../Class/MemberComponent";
import PrivateRoute from "../../Routes/PrivateRoute";
import Quiz from "../Quiz/Quiz";
import QuestionByTags from "../question/QuestionByTags";
import TaskQuizDetail from "../Task/TaskQuizDetail";
import UserQuestion from "../question/UserQuestion";
import NotificationComponent from "../notifications/NotificationComponent";
import { isAuth } from "../../helpers/auth";

const server = process.env.REACT_APP_API_URL || "";
function Home() {
  const [activeItem, setActiveItem] = useState();
  const currentClass = JSON.parse(localStorage.getItem("idClass"));

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Grid stackable celled="internally">
        <Grid.Row reversed>
          <Grid.Column width={3}>
            <SideBareComponent />
          </Grid.Column>
          <Grid.Column width={10}>
            <Header />

            <br />

            <Grid>
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={4}
                width={3}
              ></Grid.Column>
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
              path="/TaskQuizDetail/:id"
              exact
              render={(props) => <TaskQuizDetail {...props} />}
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
            <Route exact path="/MyPosts" component={UserQuestion} />

            <Route
              path="/stream"
              exact
              render={(props) => <TableCourses {...props} />}
            />
            <PrivateRoute path="/FAQ" exact component={QuestionComponent} />
            <PrivateRoute
              path="/tags/:id/:tag"
              exact
              component={QuestionByTags}
            />
                      <Route exact path="/Notifications" component={NotificationComponent} />

            <PrivateRoute path="/FAQ/:id" exact component={DetailsQuestion} />
            <PrivateRoute path="/members" exact component={MemberComponent} />
          </Grid.Column>
          <Grid.Column width={3}>
            {isAuth().role ==="Student" ? (   <ReminderTask/>) : (<></>)}
         
            <TableSeance />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
