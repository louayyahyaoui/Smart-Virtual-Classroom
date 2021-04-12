import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Accordion,
  Feed,
  Grid,
  Header,
  Icon,
  Label,
  LabelDetail,
  Progress,
  Segment,
} from "semantic-ui-react";
import { RetrieveCoursesByIdSeance } from "../../redux/slices/Courses";
import ModalCoursesEdit from "./ModalCoursesEdit";
import ModalConfirmDeleteCourses from "./ModalConfirmDeleteCour";
import { Image } from "antd";
import { Link } from "react-router-dom";

function ListCoursesBySeance() {
  const { id, titre } = useParams();
  const courses = useSelector((state) => state.courses.coursesBySeance);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const louay = activeIndex;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    console.log(courses);

    dispatch(RetrieveCoursesByIdSeance(id));
  }, [id]);

  return (
    <div>
      {courses.length === 0 ? (
        <Segment placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            No documents are listed for this customer.
          </Header>
        </Segment>
      ) : (
        <Header as="h2" color="red" icon textAlign="center">
          <Icon color="red" name="file alternate" circular />
          <Header.Content>
            {"Courses Available for "}{" "}
            <Label color="black" horizontal>
              {titre}
            </Label>
          </Header.Content>
        </Header>
      )}

      <div>
        {courses.map((c, index) => (
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
                        <Grid>
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
                            <div>
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
                            </div>
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
                          <Grid>
                            <Grid.Row>
                              {c.multiple_resources.map((files, index) =>
                                files.split(".").pop() === "pdf" ||
                                files.split(".").pop() === "pptx" ||
                                files.split(".").pop() === "docx" ? (
                                  <div key={index}>
                                    <a
                                      href={files}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={3}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              files.split(".").pop() +
                                              ".png"
                                            }
                                            style={{
                                              margin: "2px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              {files
                                                .split("-")
                                                .pop()
                                                .slice(0, 7) +
                                                "." +
                                                files.split(".").pop()}
                                            </Header>
                                          </Grid.Row>
                                          <Grid.Row>
                                            <Header as="h4" color="grey">
                                              {files.split(".").pop()} File
                                            </Header>
                                          </Grid.Row>
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.split(".").pop() === "mp3" ||
                                  files.split(".").pop() === "mp4" ? (
                                  <ReactPlayer
                                    key={index}
                                    width="300px"
                                    height="230px"
                                    controls={true}
                                    url={files}
                                  />
                                ) : files.split(".").pop() === "png" ||
                                  files.split(".").pop() === "jpg" ||
                                  files.split(".").pop() === "jpeg" ||
                                  files.split(".").pop() === "gif" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <a
                                        href={files}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={files}
                                          alt={files.split("-").pop()}
                                          style={{
                                            height: "100px",
                                            width: "100px",
                                          }}
                                        />
                                      </a>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.split("-").pop().slice(0, 7) +
                                            "." +
                                            files.split(".").pop()}
                                        </Header>
                                      </Grid.Row>
                                      <Grid.Row>
                                        <Header as="h4" color="grey">
                                          {files.split(".").pop()} File
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
                                    href={files}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div>
                                      <Grid.Column width={3}>
                                        <img
                                          style={{
                                            height: "100px",
                                            width: "100px",
                                          }}
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/files-type/" +
                                            "noFile.png"
                                          }
                                          alt={files.split("-").pop()}
                                        />
                                      </Grid.Column>
                                      <Grid.Column width={3}>
                                        <Grid.Row>
                                          <Header as="h4" color="red">
                                            {files
                                              .split("-")
                                              .pop()
                                              .slice(0, 7) +
                                              "." +
                                              files.split(".").pop()}
                                          </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                          <Header as="h4" color="grey">
                                            {files.split(".").pop()} File
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
        ))}
      </div>
    </div>
  );
}

export default ListCoursesBySeance;
