import {
  Grid,
  Label,
  Segment,
  Card,
  Dropdown,
  Header,
  Icon,
} from "semantic-ui-react";
import React, {  useEffect } from "react";
import {
  fetchclass,
  selectclass,
  selectrequestclass,
  selectactiveclass,
  fetchActiveClass,
  fetchRequestClass,
} from "./../../redux/slices/classsline";
import { useDispatch, useSelector } from "react-redux";
import InvitationClassComonent from "./InvitationClassComonent";
import EditComponent from "./EditComponent";
import ArchieveClassComponent from "./ArchieveClassComponent";
import { getclassApi } from "../../api/api";
import { useHistory } from "react-router";
import AddClassComponent from "./AddClassComponent";
export default function GetAllClassComponent() {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [classs] = useSelector(selectclass);
  const [active] = useSelector(selectactiveclass);
  const [request] = useSelector(selectrequestclass);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchclass(documentData.role, documentData._id,"Active"));
    dispatch(fetchActiveClass(documentData._id));
    dispatch(fetchRequestClass(documentData._id));
  },[dispatch]);
  const aff = (id) => {
    if (documentData.role === "Teacher") return "Level " + id + "th";
    else if (documentData.role === "Student") return "Year " + id;
  };
  const selectClass = async (classSelected) => {
    const res = await getclassApi.getclassById(classSelected);
    console.log(res.classOwner);
    localStorage.setItem("idClass", JSON.stringify(res));
    history.push("/stream");
  };
  return (
    <div>
      <AddClassComponent />
      <Segment.Group horizontal>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="tasks" circular />
            <Header.Content>Missed Activity</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label style={{ textAlign: "center" }} circular color="red">
              0
            </Label>
          </div>
        </Segment>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="file text" circular />
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
            <Icon name="add user" circular />

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
