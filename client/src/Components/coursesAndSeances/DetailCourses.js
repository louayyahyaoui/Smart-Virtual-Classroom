import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import ScreenRecord from "./ScreenRecord";
import QierPlayer from "qier-player";

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
      <Grid stackable>
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
            <br />
            <Grid stackable>
              <Grid.Row>
                {resources.map((files, index) =>
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
                            alt={files.originalname}
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
                            alt={files.originalname}
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
            <br />
            <br />
            <CommentComponent courseID={id} />
            <br />
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default DetailCourses;
