import React, { useEffect } from "react";
import { Header, Icon, List, Message, Segment } from "semantic-ui-react";
import { notificationsApi } from "../../api/api";

import {
  fetchNotifications,
  selectNotifications,
} from "../../redux/slices/notificationslice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

function NotificationComponent() {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications(user._id));
  }, [dispatch]);

  const [notifications, errr] = useSelector(selectNotifications);
  const updatenotification = async (id_notif) => {
    try {
      const res = await notificationsApi.putNotification(id_notif);
      dispatch(fetchNotifications(user._id));
    } catch (error) {
      alert(error);
    }
  };
  const deleted = async (id) => {
    try {
      const res = await notificationsApi.deleteNotification(id);
      dispatch(fetchNotifications(user._id));
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Segment raised color="red">
      <Header as="h2" icon textAlign="center">
        <Icon name="bell" circular color="yellow" />
        <Header.Content>Notifications</Header.Content>
      </Header>
      <List divided verticalAlign="middle">
        {notifications.map((notif, index) => (
          <List.Item key={index}>
            {notif.Question !== null && (
              <div>
                {notif.status === false ? (
                  <Message style={{ backgroundColor: "#ADD8E6" }}>
                    <List.Content floated="right">
                      <Icon
                        name="trash"
                        onClick={() => deleted(notif._id)}
                      ></Icon>
                    </List.Content>
                    <Icon name="question circle outline" size="large" />
                    <Link
                      to={"/FAQ/" + notif.Question}
                      onClick={() => updatenotification(notif._id)}
                    >
                      {" "}
                      <List.Content>{notif.Message}</List.Content>
                      <List.Description>
                        <p style={{ fontSize: "13px" }}>
                          <ReactTimeAgo date={notif.Date} locale="en-US" />{" "}
                        </p>{" "}
                      </List.Description>
                    </Link>
                  </Message>
                ) : (
                  <Message>
                    <List.Content floated="right">
                      <Icon
                        name="trash"
                        onClick={() => deleted(notif._id)}
                      ></Icon>
                    </List.Content>
                    <Icon name="question circle outline" size="large" />
                    <Link
                      to={"/FAQ/" + notif.Question}
                      onClick={() => updatenotification(notif._id)}
                    >
                      {" "}
                      <List.Content>{notif.Message}</List.Content>
                      <List.Description>
                        <p style={{ fontSize: "13px" }}>
                          <ReactTimeAgo date={notif.Date} locale="en-US" />{" "}
                        </p>{" "}
                      </List.Description>
                    </Link>
                  </Message>
                )}
              </div>
            )}
            {notif.Course !== null && (
              <Link
                to={"/detailCourses/" + notif.Course}
                onClick={() => updatenotification(notif._id)}
              >
                {" "}
                {notif.status === false ? (
                  <Message style={{ backgroundColor: "#ADD8E6" }}>
                    <List.Content floated="right">
                      <Icon name="trash"></Icon>
                    </List.Content>
                    <Icon name="question circle outline" size="large" />
                    <List.Content>{notif.Message}</List.Content>
                    <List.Description>
                      <p style={{ fontSize: "13px" }}>
                        <ReactTimeAgo date={notif.Date} locale="en-US" />{" "}
                      </p>{" "}
                    </List.Description>
                  </Message>
                ) : (
                  <Message>
                    <List.Content floated="right">
                      <Icon name="trash"></Icon>
                    </List.Content>
                    <Icon name="question circle outline" size="large" />
                    <List.Content>{notif.Message}</List.Content>
                    <List.Description>
                      <p style={{ fontSize: "13px" }}>
                        <ReactTimeAgo date={notif.Date} locale="en-US" />{" "}
                      </p>{" "}
                    </List.Description>
                  </Message>
                )}
              </Link>
            )}
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}

export default NotificationComponent;
