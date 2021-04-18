import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Card,
  Dropdown,
  Feed,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import {
  GetSeancesByIdClass,
  RetrieveSeances,
} from "../../redux/slices/Seance";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalSeance from "./ModalSeance";
import { RetrieveCoursesByIdSeance } from "../../redux/slices/Courses";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { isAuth } from "../../helpers/auth";

function TableSeance(props) {
  const seances = useSelector((state) => state.seance.seance);

  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
  console.log(seances);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSeancesByIdClass(CurrentClass._id));
  }, []);

  return (
    <div>
      {seances.length === 0 ? (
        <>
          <br />
          <Image
            centered
            size="medium"
            src={process.env.PUBLIC_URL + "/NothingToDisplay.png"}
          />
          <Header as="h4" textAlign="center">
            <Header.Content>No themes found </Header.Content>
          </Header>
        </>
      ) : (
        <div>
          <br />
          <Segment>
            <Link to="/stream">
              <Header color="red" as="h3" textAlign="center">
                All Themes
              </Header>
            </Link>
          </Segment>

          <Card.Group>
            {seances.map((seance) => (
              <Card key={seance._id}>
                <Card.Content>
                  <Card.Header>
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={12}>
                          <Link to={`/seance/${seance.titre}/${seance._id}`}>
                            <Header as="h3" color="red">
                              {seance.titre}
                            </Header>
                          </Link>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          {isAuth().role === "Teacher" ? (
                            <Dropdown
                              fluid
                              pointing
                              direction="left"
                              className="icon"
                              icon="ellipsis vertical"
                            >
                              <Dropdown.Menu>
                                <ModalSeance
                                  headerTitle="Edit Seance"
                                  buttonTriggerTitle="Edit"
                                  buttonSubmitTitle="Save"
                                  buttonColor="black"
                                  icon="edit"
                                  seanceId={seance._id}
                                  //onSeanceUpdated={props.onSeanceUpdated}
                                  //server={props.server}
                                  //socket={this.props.socket}
                                />

                                <ModalConfirmDelete
                                  headerTitle="Delete Seance"
                                  buttonTriggerTitle="Delete"
                                  buttonColor="red"
                                  icon="trash"
                                  seance={seance}
                                  // onSeanceDeleted={props.onSeanceDeleted}
                                  //server={props.server}
                                  //socket={props.socket}
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : (
                            <></>
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                  <Card.Meta>
                    <ReactTimeAgo date={seance.dateCreation} locale="en-US" />
                  </Card.Meta>
                  <Card.Description>{seance.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      )}
    </div>
  );
}

export default TableSeance;
