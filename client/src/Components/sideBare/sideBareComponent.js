import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Image,
  Button,
  Icon,
  Message,
  Menu,
  Label,
  Grid,
  List,
  Divider,
  Dropdown,
} from "semantic-ui-react";
import { isAuth, signout } from "../../helpers/auth";
import moment from "moment";
import Main from "../Main/Main";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  selectNotifications,
} from "../../redux/slices/notificationslice";
import io from "socket.io-client";
import { notificationsApi } from "../../api/api";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
const ENDPOINT = "https://closer-server.herokuapp.com/";
function SideBareComponent() {
  const socket = io(ENDPOINT);
  const dispatchh = useDispatch();

  const state = useSelector((state) => state.user.userUpdated);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {}, [state]);

  const [activeItem, SetActiveItem] = useState("Dashboard");
  const handleItemClick = (e, { name }) => {
    if (name === "Logout") {
      signout(() => {
        toast.error("Signout Successfully");
      });
      SetActiveItem(name);
    } else {
      SetActiveItem(name);
    }
  };
  useEffect(() => {
    dispatch(fetchNotifications(user._id));
  }, [dispatch]);
  const [nbrNotif, setNbrNotif] = useState(0);
  const [notifications, errr] = useSelector(selectNotifications);

  useEffect(() => {
    let i = 0;
    notifications.forEach((element) => {
      if (!element.status) {
        i += 1;
        setNbrNotif(i);
      }
    });
    socket.on("new-notification", (content) => {
      content.forEach((i) => {
        dispatch(fetchNotifications(i));
      });

      notifications.forEach((element) => {
        if (!element.status) {
          i += 1;
          setNbrNotif(i);
        }
      });
    });
  }, [socket]);
  const updatenotification = async (id_notif) => {
    try {
      const res = await notificationsApi.putNotification(id_notif);
      dispatch(fetchNotifications(user._id));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Grid stackable>
        <Card stackable>
          <Image src={isAuth().picture} wrapped ui={false} />
          <Card.Content>
            <Card.Header>
              {isAuth().name}
              {"  |  "}
              <Dropdown text={nbrNotif} icon="bell outline" scrolling>
                <Dropdown.Menu>
                  <Dropdown.Divider />
                  <Dropdown.Header
                    icon="bell outline"
                    content="      Notification"
                    as="h3"
                  />
                  <Divider />
                  {notifications.map((notif, index) => (
                    <div>
                      {notif.Course !== null && (
                        <Link
                          to={"/detailCourses/" + notif.Course}
                          onClick={() => updatenotification(notif._id)}
                        >
                          <List divided>
                            <List.Item>
                              <List.Icon
                                name="file text"
                                size="large"
                                verticalAlign="middle"
                              />

                              <List.Content>
                                {notif.status === false ? (
                                  <List.Header as="p" style={{ color: "blue" }}>
                                    {notif.Message}
                                  </List.Header>
                                ) : (
                                  <List.Header as="p">
                                    {notif.Message}
                                  </List.Header>
                                )}
                                <List.Description>
                                  <p style={{ fontSize: "13px" }}>
                                    <ReactTimeAgo
                                      date={notif.Date}
                                      locale="en-US"
                                    />{" "}
                                  </p>{" "}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          </List>
                          <Divider />
                        </Link>
                      )}
                      <Dropdown.Divider />
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Meta>
              <span className="date">
                Joined in {moment(isAuth().createdAt).format("yy")}
              </span>
            </Card.Meta>
            <Card.Description>
              {isAuth().bio === "" || !isAuth().bio ? (
                <Message
                  attached
                  header="Welcome to our site!"
                  content="If you are new in our community go to your profile and add a Bio ,it help you express yourself "
                />
              ) : (
                isAuth().bio
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Menu size="small" fluid vertical>
              <Link to="/class">
                <Menu.Item
                  icon="comments"
                  name="Dashboard"
                  active={activeItem === "Dashboard"}
                  onClick={handleItemClick}
                >
                  Dashboard
                </Menu.Item>
              </Link>

              <Menu.Item
                name="Courses"
                active={activeItem === "Courses"}
                onClick={handleItemClick}
              >
                Courses
              </Menu.Item>
              <Link to="/schedule">
                <Menu.Item
                  name="Routine"
                  active={activeItem === "Routine"}
                  onClick={handleItemClick}
                >
                  Routine
                </Menu.Item>
              </Link>
              <Link to={"/updateProfile/" + isAuth()._id}>
                <Menu.Item
                  name="Profile"
                  active={activeItem === "Profile"}
                  onClick={handleItemClick}
                >
                  {isAuth().bio === "" ||
                  !isAuth().bio ||
                  isAuth().linkedInUrl === "" ||
                  !isAuth().linkedInUrl ||
                  isAuth().GithubUrl === "" ||
                  !isAuth().GithubUrl ||
                  isAuth().picture === "" ||
                  !isAuth().picture ? (
                    <>
                      {" "}
                      <Label color="red">1</Label>,{"profile"}
                    </>
                  ) : (
                    <> {"Profile"}</>
                  )}
                </Menu.Item>
              </Link>
              <Link to="/login">
                <Menu.Item
                  name="Logout"
                  active={activeItem === "Logout"}
                  onClick={handleItemClick}
                >
                  Logout
                </Menu.Item>
              </Link>
            </Menu>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="group" />
              <Main></Main>
            </a>
          </Card.Content>
        </Card>
      </Grid>
    </>
  );
}

export default SideBareComponent;
