import React ,{Suspense} from "react";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import TimeAgo from "javascript-time-ago";



import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";


import "./material.css";
import Loader from "./Components/home/Loader";
import dashboardComponent from "./Components/dashboard/dashboardComponent";
import Recomandation from "./Components/Recomandation/Recomandation";
import ClassByLevel from "./Components/dashboard/ClassByLevel";




const Register = React.lazy(() => import('./Components/authentification/Register'));
const Login = React.lazy(() => import('./Components/authentification/Login'));

const Page_404 = React.lazy(() => import('./Components/home/404'));
const WhiteBoard = React.lazy(() => import('./Components/container/WhiteBoard'));
const Room = React.lazy(() => import('./Components/Room/Room'));
const Main = React.lazy(() => import('./Components/Main/Main'));
const HomeClass = React.lazy(() => import('./Components/home/HomeClass'));
const HomeCloser = React.lazy(() => import('./Components/home/HomeCloser'));
const Home = React.lazy(() => import('./Components/home/Home'));
const Activate = React.lazy(() => import('./Components/authentification/Activate'));
const ResetPassword = React.lazy(() => import('./Components/authentification/ResetPassword'));
const ForgetPassword = React.lazy(() => import('./Components/authentification/ForgetPassword'));
const Admin = React.lazy(() => import('./Components/authentification/Admin'));
const Private = React.lazy(() => import('./Components/authentification/Private'));


TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  return (
    <div>
      <Suspense fallback={<>

     <Loader/>
      </>}>
      <BrowserRouter>
        <Switch>
         
          <Route path="/" exact render={(props) => <HomeCloser {...props} />} />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route
            path="/updateProfile/:id"
            exact
            render={(props) => <HomeClass {...props} />}
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
              path="/TaskQuizDetail/:id"
              exact
              render={(props) => <Home {...props} />}
            />
          <Route
            path="/TaskQuiz/:id"
            exact
            render={(props) => <Home {...props} />}
          />
             <Route
            path="/Result/:id"
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
            path="/tags/:id/:tag"
            exact
            render={(props) => <Home {...props} />}
          />
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
          <Route
            path="/archiveclass"
            exact
            render={(props) => <HomeClass {...props} />}
          />
              <Route
            path="/WhiteBoard"
            exact
            render={(props) => <WhiteBoard {...props} />}
          />
               <Route
            path="/404"
            exact
            render={(props) => <Page_404 {...props} />}
          />
                  <Route
            path="/dashboard"
            exact
            component={dashboardComponent} 
          />
              <Route
            path="/level/:l"
            exact
            component={dashboardComponent} 
          />
             <Route
            path="/courses/:id"
            exact
            component={dashboardComponent} 
          />
            <Route 
            path="/detailsCoursesAdmin/:id"
             exact      
             component={dashboardComponent}  
             />
           
          <Route exact path="/meet" component={Main} />
         {/*<Route exact path="/dashboard" component={dashboardComponent} /> */}
     
          <Route exact path="/MyPosts" component={Home} />
          <Route exact path="/RecomandedCourses" component={HomeClass} />
         
          <Route exact path="/Notifications" component={Home} />
          <Route exact path="/room/:roomId" component={Room} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/admin" exact component={Admin} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
