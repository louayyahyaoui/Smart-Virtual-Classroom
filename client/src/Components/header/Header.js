import { React, useEffect, useState } from "react";
import { Dropdown, Grid, Icon, Menu } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import ModalCourses from "../coursesAndSeances/ModalCourses";
import ModalSeance from "../coursesAndSeances/ModalSeance";
import { isAuth } from "../../helpers/auth";
import ModalTaskFile from "../Task/ModalTaskFile";
import Main from "../Main/Main";
import socket from "../../socket";
function Header(props) {
  const [activeItem, setActiveItem] = useState("Stream");
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const history = useHistory();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error }) => {
      if (!error) {
        const roomName = currentClass._id;
        const userName = currentUser.name;
        const userImage = currentUser.picture;

        sessionStorage.setItem("user", JSON.stringify(userName));
        sessionStorage.setItem("userImage", JSON.stringify(userImage));

        history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg("User name already exist");
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = currentClass._id;
    const userName = currentUser.name;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg("Enter Room Name or User Name");
    } else {
      socket.emit("BE-check-user", { roomId: roomName, userName });
    }
  }
  return (
    <>
      <Menu pointing secondary>
        <Link to="/stream">
          <Menu.Item
            name="Stream"
            icon="comments"
            active={activeItem === "Stream"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/FAQ">
          <Menu.Item
            name="FAQ"
            icon="comments"
            active={activeItem === "FAQ"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/members">
          <Menu.Item
            name="Members"
            icon="users"
            active={activeItem === "Members"}
            onClick={handleItemClick}
          />
        </Link>
        <Link
          to={isAuth().role === "Student" ? "/TaskListStudent" : "/TaskList"}
        >
          <Menu.Item
            name="Tasks"
            icon="tasks"
            active={activeItem === "Tasks"}
            onClick={handleItemClick}
          />
        </Link>

        <Menu.Item
          name="Meet"
          icon="video camera"
          active={activeItem === "Meet"}
          onClick={clickJoin}
        ></Menu.Item>

        {/* <a>
          <Icon name="group" />
          <Main></Main>
        </a> */}

        {isAuth().role === "Teacher" ? (
          <Menu.Item position="right">
            <Dropdown floating className="icon" icon="add circle">
              <Dropdown.Menu>
                <Dropdown.Header
                  icon="mouse pointer"
                  content="Select something to add"
                />
                <Dropdown.Divider />
                <ModalSeance
                  headerTitle="Add Theme"
                  buttonTriggerTitle="Add Theme"
                  buttonSubmitTitle="Add"
                  buttonColor="black"
                  icon="th"
                />
                <ModalCourses
                  headerTitle="Add Courses"
                  buttonTriggerTitle="Add Courses"
                  buttonSubmitTitle="Add"
                  buttonColor="red"
                  icon="add"
                />
                <ModalTaskFile
                  headerTitle="Add Task"
                  buttonTriggerTitle="Add Task"
                  buttonSubmitTitle="Add"
                  buttonColor="red"
                  icon="ad"
                />
                <Link to="/AddTask">
                  <>
                    <Dropdown.Item icon="tasks" text="Add Quiz" />
                  </>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : (
          <></>
        )}
      </Menu>
    </>
  );
}

export default Header;
