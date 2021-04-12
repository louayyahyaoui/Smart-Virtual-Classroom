import React from "react";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import TimeAgo from "javascript-time-ago";
import Login from "./Components/authentification/Login";
import Register from "./Components/authentification/Register";
import Activate from "./Components/authentification/Activate";
import Private from "./Components/authentification/Private";
import Admin from "./Components/authentification/Admin";
import ForgetPassword from "./Components/authentification/ForgetPassword";
import ResetPassword from "./Components/authentification/ResetPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Components/home/Home";
import HomeClass from "./Components/home/HomeClass";
import "./material.css";
import Main from "./Components/Main/Main";
import Room from "./Components/Room/Room";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/" exact render={(props) => <Login {...props} />} />

          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route
            path="/updateProfile/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/DetailTask/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/TaskFileDetail/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/Result/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/TaskQuiz/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/TaskListStudent"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/TaskList"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/AddTask"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/users/password/forget"
            exact
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            path="/api/users/password/reset/:token"
            exact
            render={(props) => <ResetPassword {...props} />}
          />
          <Route
            path="/api/users/activate/:token"
            exact
            render={(props) => <Activate {...props} />}
          />
          <Route path="/stream" exact render={(props) => <Home {...props} />} />
          <Route
            path="/seance/:titre/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/detailCourses/:id"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/FAQ/:id"
            exact
            render={(props) => <Home {...props} />}
          />

          <Route path="/FAQ" exact render={(props) => <Home {...props} />} />

          <Route
            path="/members"
            exact
            render={(props) => <Home {...props} />}
          />
          <Route
            path="/schedule"
            exact
            render={(props) => <HomeClass {...props} />}
          />
          <Route
            path="/class"
            exact
            render={(props) => <HomeClass {...props} />}
          />
          <Route exact path="/meet" component={Main} />
          <Route exact path="/room/:roomId" component={Room} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
