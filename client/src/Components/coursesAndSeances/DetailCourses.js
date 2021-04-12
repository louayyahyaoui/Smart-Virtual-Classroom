import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Button,
  Comment,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Label,
} from "semantic-ui-react";
import { isAuth } from "../../helpers/auth";
import { GetCoursesById } from "../../redux/slices/Courses";
import CommentComponent from "../Comment/CommentComponent";
import CommentChat from "./CommentChat";

function DetailCourses() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ress = useSelector((state) => state.courses.Resources);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateCreation, setDateCreation] = useState(Date.now());
  const [resources, setResources] = useState([]);

  useEffect(() => {
    dispatch(GetCoursesById(id)).then((response) => {
      console.log(response);
      setTitre(response.payload.titre);
      setDescription(response.payload.description);
      setDateCreation(response.payload.dateCreation);
      setResources(response.payload.multiple_resources);
    });
  }, [id]);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <Header as="h1">
              <Icon name="file alternate" />
              <Header.Content>
                {titre}
                <Header.Subheader>
                  <ReactTimeAgo date={dateCreation} locale="en-US" />
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Divider></Divider>
            <br />
            <Container>
              <p>{description}</p>
            </Container>
            <Grid>
              <Grid.Row>
                {resources.map((files, index) =>
                  files.split(".").pop() === "pdf" ||
                  files.split(".").pop() === "pptx" ||
                  files.split(".").pop() === "docx" ? (
                    <div key={index}>
                      <a href={files} target="_blank" rel="noopener noreferrer">
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
                    <a href={files} target="_blank" rel="noopener noreferrer">
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
                            alt={files.split("-").pop()}
                          />
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
                    </a>
                  )
                )}
              </Grid.Row>
            </Grid>
            <br />
            <br />
            <CommentComponent courseID={id}/>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DetailCourses;
