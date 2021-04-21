import {
  Grid,
  Label,
  Segment,
  Card,
  Dropdown,
  Image,
  Header,
  Icon,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import {
  fetchclass,
  selectclass,
  selectrequestclass,
  selectactiveclass,
  fetchActiveClass,
  fetchSingleClass,
  fetchRequestClass,
} from "./../../redux/slices/classsline";
import getUserById from "./../../redux/slices/User";
import { useDispatch, useSelector } from "react-redux";
import InvitationClassComonent from "./InvitationClassComonent";
import EditComponent from "./EditComponent";
import ArchieveClassComponent from "./ArchieveClassComponent";
import { getclassApi, AddclassApi, ClassInvitationApi } from "../../api/api";
import { useHistory } from "react-router";
import AddClassComponent from "./AddClassComponent";
export default function GetAllClassComponent() {
  const documentData = JSON.parse(localStorage.getItem("user"));

  const [classs, err] = useSelector(selectclass);
  const [active, er] = useSelector(selectactiveclass);
  const [request, errr] = useSelector(selectrequestclass);
 
 

  const dispatch = useDispatch();
  const dispatchClass = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchclass(documentData.role, documentData._id));
    dispatch(fetchActiveClass(documentData._id));
    dispatch(fetchRequestClass(documentData._id));
  }, [dispatch]);

  const aff = (id) => {
    if (documentData.role === "Teacher") return "Level " + id + "th";
    else if (documentData.role === "Student") return "Year " + id;
  };

  const imageSet = (b) => {};
  const RequestClass = (b) => {
    console.log(b);
    if (request===[])
    return 0;
    else
    return b.request_class;
  };
  const selectClass = async (classSelected) => {
    const res = await getclassApi.getclassById(classSelected);
    console.log(res.classOwner);

    localStorage.setItem("idClass", JSON.stringify(res));
    // dispatch(fetchSingleClass(res));
    history.push("/stream");
  };
  return (
    <div>
      <AddClassComponent />
      <Segment.Group horizontal>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="users" circular />
            <Header.Content>Missed Activity</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label style={{ textAlign: "center" }} circular color="red">
              2
            </Label>
          </div>
        </Segment>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="tv" circular />
            <Header.Content>Active Courses</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label circular color="green">
            {active.length === 0  ? (
            <div >0</div>
              ) : (
                active?.map((b, ii) => (
                  <div key={ii}> {b.active_class}</div>
                ))
              )}
            </Label>
          </div>
        </Segment>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="redo" circular />

            <Header.Content>Request Courses</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label style={{ textAlign: "center" }} circular color="grey">
            {request.length === 0  ? (
            <div >0</div>
              ) : (
                request?.map((b, ii) => (
                  <div key={ii}> {b.request_class}</div>
                ))
              )}
            </Label>
          </div>
        </Segment>
      </Segment.Group>
      {classs?.map((cl, index) => (
        <Grid columns={1} key={index}>
          <Grid.Column>
            <Segment raised>
              <Label as="a" color="red" ribbon>
                {aff(cl._id)}
              </Label>
              <Grid columns={4}>
                {cl.classObjet?.map((co, i) => (
                  <Grid.Column key={i}>
                    <Card.Group stackable>
                      <Card
                        color={co.classColor}
                        onClick={() => selectClass(co._id)}
                      >
                        <Image
                          src={imageSet(co.classOwner)}
                          wrapped
                          ui={true}
                        />

                        <Card.Content>
                          <Card.Header>
                            <Grid stackable>
                              <Grid.Row>
                                <Grid.Column width={12}>
                                  <Header as="h3" color="red">
                                    {co.className}
                                  </Header>
                                </Grid.Column>

                                <Grid.Column width={2}>
                                  {co.classOwner === documentData._id ? (
                                    <Dropdown
                                      fluid
                                      pointing
                                      direction="left"
                                      className="icon"
                                      icon="ellipsis vertical"
                                    >
                                      <Dropdown.Menu>
                                        <EditComponent
                                          headerTitle="Archive Class"
                                          buttonTriggerTitle="Archive"
                                          classes={co}
                                        />
                                        <ArchieveClassComponent
                                          headerTitle="Archive Class"
                                          buttonTriggerTitle="Archive"
                                          classes={co}
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
                          <Card.Meta>{co.classSection}</Card.Meta>
                          <Card.Description>
                            <p
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                maxHeight: 250,
                              }}
                            >
                              {co.classDescription}
                            </p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Card.Group>
                  </Grid.Column>
                ))}
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      ))}
      <InvitationClassComonent></InvitationClassComonent>
    </div>
  );
}
// onClick={() => deleteClass(cl.classObjet._id) }
/*
  <Image
                            floated="right"
                            size="mini"
                            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg">
                          
                            */
