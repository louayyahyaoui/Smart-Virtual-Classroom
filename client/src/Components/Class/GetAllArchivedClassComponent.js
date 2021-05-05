import {
  Grid,
  Label,
  Segment,
  Card,
  Dropdown,
  Header,
} from "semantic-ui-react";
import React, {  useEffect } from "react";
import {
  fetchclassArchived,
  selectclassarchived,
} from "../../redux/slices/classsline";
import { useDispatch, useSelector } from "react-redux";
import ActivedClassComponent from "./ActivedClassComponent";
export default function GetAllClassComponent() {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [archived] = useSelector(selectclassarchived);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchclassArchived(documentData.role, documentData._id,"Archive"));
  },[dispatch]);
  const aff = (id) => {
    if (documentData.role === "Teacher") return "Level " + id + "th";
    else if (documentData.role === "Student") return "Year " + id;
  };
  return (
    <div>
      {archived?.map((cl, index) => (
        <Grid columns={1} key={index}>
          <Grid.Column>
            <Segment raised>
              <Label as="a" color="grey" ribbon>
                {aff(cl._id)}
              </Label>
              <Grid columns={4}>
                {cl.classObjet?.map((co, i) => (
                  <Grid.Column key={i}>
                    <Card.Group stackable>
                      <Card
                        color={co.classColor}
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
                                        <ActivedClassComponent
                                          headerTitle="Active Class"
                                          buttonTriggerTitle="Active"
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
    </div>
  );
}
