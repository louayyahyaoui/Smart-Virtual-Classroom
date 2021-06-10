import React, { useState, useEffect, Suspense } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import ListCoursesBySeance from "../coursesAndSeances/ListCoursesBySeance";

import Avatar from "@material-ui/core/Avatar";

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
import { toast } from "react-toastify";
import QuestionByTags from "../question/QuestionByTags";
import TaskQuizDetail from "../Task/TaskQuizDetail";
import UserQuestion from "../question/UserQuestion";
import NotificationComponent from "../notifications/NotificationComponent";
import { isAuth, signout } from "../../helpers/auth";
import TableCourses from "../coursesAndSeances/TableCourses";
import GetAllClassComponent from "../Class/GetAllClassComponent";
import GetAllArchivedClassComponent from "../Class/GetAllArchivedClassComponent";
import CalendarComponent from "../Class/CalendarComponent";
import TableSeance from "../coursesAndSeances/TableSeance";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import TodayIcon from "@material-ui/icons/Today";

import ArchiveIcon from "@material-ui/icons/Archive";
import { Dropdown, Image } from "semantic-ui-react";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#BF1337",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const useStyles_left = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function MiniDrawer() {
  const classes_left = useStyles_left();

  const classes = useStyles();
  const theme = useTheme();
  const theme_right = useTheme();
  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  const [open, setOpen] = React.useState(false);
  const [typeSidebarRight, setTypeSidebarRight] = React.useState("");
  const [open_right, setOpenRight] = React.useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    if (windowSize.width > 750) {
      setTypeSidebarRight("permanent");
    } else {
      setTypeSidebarRight("persistent");
    }
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    // Remove event listener on cleanup
    console.log("****size window : " + windowSize.width);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
    setOpenRight(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenRight(true);
  };
  const handleDrawerOpenRight = () => {
    setOpenRight(true);
  };

  const handleDrawerCloseRight = () => {
    setOpenRight(false);
  };
  const handleItemClick = () => {
 
    signout(() => {
      toast.error("Signout Successfully");
    });
 
};
  const trigger = <Avatar src={isAuth().picture} style={{float:"right"}}/>;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          <div style={{marginLeft:"+87%"}}>
          <Dropdown trigger={trigger} pointing="top right" icon={null}>
            <Dropdown.Menu>
              <Dropdown.Header content={isAuth().email} />

              <Dropdown.Divider />

              <Link
                to={"/updateProfile/" + isAuth()._id}
                style={{
                  color: "black",
                  fontSize: "15px",
                  paddingLeft: "100 px",
                  paddingRight: "5 %",
                }}
              >
                <Dropdown.Item text="Account" icon="user" />
              </Link>
              <Dropdown.Divider />
              <Link
                  to={"/login"}
                  style={{ color: "black", fontSize: "15px" }}
                >
                  <Dropdown.Item text="Sign Out" icon="sign out" onClick={handleItemClick} />
                </Link>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </Toolbar>
      </AppBar>
      <IconButton
        color="inherit"
        aria-label="open drawers"
        edge="end"
        onClick={handleDrawerOpenRight}
        className={clsx(open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
        <img src={process.env.PUBLIC_URL + "/closer.png"} style={{ width: "63%" }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>

        <Divider />
        <List >
          <Link to="/class">
            <ListItem button key="Dashboard">
              <ListItemIcon>
                <ViewComfyIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/archiveclass">
            <ListItem button key="Archived">
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archived" />
            </ListItem>
          </Link>
          <Link to="/schedule">
            <ListItem button key="Routine">
              <ListItemIcon>
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Routine" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      

        <div>
          <PrivateRoute path="/class" exact component={GetAllClassComponent} />
          <PrivateRoute
            path="/archiveclass"
            exact
            component={GetAllArchivedClassComponent}
          />
          <PrivateRoute path="/schedule" exact component={CalendarComponent} />
          <PrivateRoute
            path="/updateProfile/:id"
            exact
            component={UpdateProfile}
          />
        </div>
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
        <PrivateRoute path="/tags/:id/:tag" exact component={QuestionByTags} />
        <Route exact path="/Notifications" component={NotificationComponent} />

        <PrivateRoute path="/FAQ/:id" exact component={DetailsQuestion} />
        <PrivateRoute path="/members" exact component={MemberComponent} />
      </main>

     
    </div>
  );
}
