import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Accordion,
  Button,
  Dimmer,
  Dropdown,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import ModalCoursesEdit from "./ModalCoursesEdit";
import ModalConfirmDeleteCourses from "./ModalConfirmDeleteCour";

//import { Player, ControlBar } from "video-react";
import QierPlayer from "qier-player";
import ReactPlayer from "react-player/lazy";

import { RetrieveCoursesByIdClass } from "../../redux/slices/Courses";

import ModalCourses from "./ModalCourses";
import { Link } from "react-router-dom";
import { GetSeancesByIdClass } from "../../redux/slices/Seance";
import { isAuth } from "../../helpers/auth";

//import { Image } from "semantic-ui-react";
function TableCourses(props) {
  const courses = useSelector((state) => state.courses.courses);
  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
  console.log(courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RetrieveCoursesByIdClass(CurrentClass._id));
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const louay = activeIndex;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <div>
      {courses.length === 0 ? (
        <>
          <Image
            centered
            size="medium"
            src={process.env.PUBLIC_URL + "/NoFileFound.png"}
          />
          <Header as="h2" textAlign="center">
            <Header.Content>Sorry No Courses Found </Header.Content>
          </Header>
        </>
      ) : (
        courses.map((c, index) => (
          <div>
            <Accordion>
              <Segment raised color="grey">
                <Feed key={c._id}>
                  <Feed.Event>
                    <Feed.Label image={c.idOwner.picture} />

                    <Feed.Content>
                      <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={handleClick}
                      >
                        <Grid stackable>
                          <Grid.Column width={11}>
                            <Feed.Summary>
                              <a>{c.idOwner.name}</a> posted a new course
                              <Feed.Date>
                                <ReactTimeAgo
                                  date={c.dateCreation}
                                  locale="en-US"
                                />
                              </Feed.Date>
                            </Feed.Summary>
                          </Grid.Column>
                          <Grid.Column width={5}>
                            <>
                              {isAuth().role === "Teacher" ? (
                                <>
                                  <Feed.Meta>
                                    <Feed.Like>
                                      <ModalCoursesEdit
                                        headerTitle="Edit Courses"
                                        buttonTriggerTitle="Edit"
                                        buttonSubmitTitle="Save"
                                        buttonColor="black"
                                        icon="edit"
                                        coursesId={c._id}
                                      />
                                    </Feed.Like>
                                  </Feed.Meta>
                                  <Feed.Meta>
                                    <Feed.Like>
                                      <ModalConfirmDeleteCourses
                                        headerTitle="Delete Courses"
                                        buttonTriggerTitle="Delete"
                                        buttonColor="red"
                                        icon="trash"
                                        courses={c}
                                      />
                                    </Feed.Like>
                                  </Feed.Meta>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          </Grid.Column>
                        </Grid>
                      </Accordion.Title>

                      <Accordion.Content active={activeIndex === index}>
                        <Link to={"/detailCourses/" + c._id}>
                          <Header
                            as="h3"
                            icon="file alternate outline"
                            content={c.titre}
                          />
                        </Link>

                        <Feed.Extra text>{c.description}</Feed.Extra>
                        <Feed.Extra images>
                          <Grid stackable>
                            <Grid.Row>
                              {c.multiple_resources.map((files, index) =>
                                files.type === "application/pdf" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={3}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "pdf" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              {files.originalname.slice(0, 7)}
                                            </Header>
                                          </Grid.Row>
                                          <Grid.Row>
                                            <Header as="h4" color="grey">
                                              {files.type.slice(0, 7)} File
                                            </Header>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type ===
                                  "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={3}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "pptx" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              {files.originalname.slice(0, 7)}
                                            </Header>
                                          </Grid.Row>
                                          <Grid.Row>
                                            <Header as="h4" color="grey">
                                              {files.type.slice(0, 7)} File
                                            </Header>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type ===
                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={3}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "docx" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              {files.originalname.slice(0, 7)}
                                            </Header>
                                          </Grid.Row>
                                          <Grid.Row>
                                            <Header as="h4" color="grey">
                                              {files.type.slice(0, 7)} File
                                            </Header>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type === "video/mp4" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <QierPlayer
                                        width={250}
                                        height={100}
                                        language="en"
                                        themeColor="#000000"
                                        srcOrigin={files.url}
                                      />
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.originalname.slice(0, 7)}
                                        </Header>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Header as="h4" color="grey">
                                          {files.type.slice(0, 7)} File
                                        </Header>
                                      </Grid.Row>
                                    </Grid.Column>
                                  </div>
                                ) : files.type === "audio/mpeg" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <div className="player-wrapper">
                                        <ReactPlayer
                                          key={index}
                                          width="250px"
                                          height="100px"
                                          controls={true}
                                          url={files.url}
                                        />
                                      </div>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.originalname.slice(0, 7)}
                                        </Header>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Header as="h4" color="grey">
                                          {files.type.slice(0, 7)} File
                                        </Header>
                                      </Grid.Row>
                                    </Grid.Column>
                                  </div>
                                ) : files.type === "image/png" ||
                                  files.type === "image/jpg" ||
                                  files.type === "image/jpeg" ||
                                  files.type === "image/gif" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <a
                                        href={files.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={files.url}
                                          alt={files.type}
                                          style={{
                                            margin: "10px",
                                            height: "100px",
                                            width: "100px",
                                          }}
                                        />
                                      </a>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.originalname.slice(0, 7)}
                                        </Header>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Header as="h4" color="grey">
                                          {files.type.slice(0, 7)} File
                                        </Header>
                                      </Grid.Row>
                                    </Grid.Column>
                                  </div>
                                ) : (
                                  // <a href={files} target="_blank" rel="noopener noreferrer">
                                  //   <img
                                  //     src={files}
                                  //     width="300px"
                                  //     style={{ margin: "2px" }}
                                  //     alt=""
                                  //   />
                                  // </a>
                                  <a
                                    href={files.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div>
                                      <Grid.Column width={3}>
                                        <img
                                          style={{
                                            margin: "10px",
                                            height: "100px",
                                            width: "100px",
                                          }}
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/files-type/" +
                                            "noFile.png"
                                          }
                                          alt={files.type}
                                        />
                                      </Grid.Column>
                                      <Grid.Column width={3}>
                                        <Grid.Row>
                                          <Header as="h4" color="red">
                                            {files.originalname.slice(0, 7)}
                                          </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                          <Header as="h4" color="grey">
                                            {files.type.slice(0, 7)} File
                                          </Header>
                                        </Grid.Row>
                                      </Grid.Column>
                                    </div>
                                  </a>
                                )
                              )}
                            </Grid.Row>
                          </Grid>
                        </Feed.Extra>
                      </Accordion.Content>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Segment>
            </Accordion>
            <br />
          </div>
        ))
      )}
    </div>
  );
}

export default TableCourses;
