import {
  Grid,
  Image,
  Label,
  Segment,
  Button,
  Card,
  Dropdown,
  Header,
  Icon,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { fetchclass, selectclass,fetchSingleClass } from "./../../redux/slices/classsline";
import { useDispatch, useSelector } from "react-redux";
import InvitationClassComonent from "./InvitationClassComonent";
import EditClassComponent from "./EditClassComponent";
import { getclassApi,AddclassApi } from "../../api/api";
import Home from "../home/HomeClass";
import { useHistory } from "react-router";
import AddClassComponent from "./AddClassComponent";
export default function GetAllClassComponent() {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [classs, err] = useSelector(selectclass);
  const dispatch = useDispatch();
  const dispatchClass = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchclass(documentData.role, documentData._id));
  }, [dispatch]);
  const deleteClass = async (idq) => {
    try {
      const res = await AddclassApi.deleteClass(idq);
      dispatch(fetchclass(documentData.role, documentData._id));
    } catch (error) {
      alert(error);
    }
  };
  const aff = (id) => {
    if (documentData.role === "Teacher") return "Level " + id + "th";
    else if (documentData.role === "Student") return "Year " + id;
  };

  const lenght = (data) => {
    if(data===0)
    return 1;
    else
    return data;
  }
 
 const selectClass = async (classSelected)=>{
 
  const res = await getclassApi.getclassById(classSelected);
  console.log(res.classOwner);

  localStorage.setItem("idClass",JSON.stringify(res));
 // dispatch(fetchSingleClass(res));
  history.push('/stream');
 }
  return (
    <div>
      <AddClassComponent />
      <Segment.Group horizontal >
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
            <Icon name="users" circular />
            <Header.Content>Active Courses</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label circular color="green">
              2
            </Label>
          </div>
        </Segment>
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="users" circular />

            <Header.Content>Request Courses</Header.Content>
          </Header>
          <div style={{ textAlign: "center" }}>
            <Label style={{ textAlign: "center" }} circular color="grey">
              2
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
              <Grid columns={2}>
                {cl.classObjet?.map((co, i) => (
                  <Grid.Column key={i}>
                    <Card.Group >
                      <Card  color="red" onClick={()=> selectClass(co._id)}>
                        {co.classOwner === documentData._id && (
                          <div style={{ float: "left" }}>
                            <Dropdown floated="left" icon="ellipsis vertical">
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <EditClassComponent classes={co} />
                                </Dropdown.Item>
                                <Dropdown.Item
                                  
                                >
                                  Archieve
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        )}
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                          />
                          <Card.Header>{co.className}</Card.Header>
                          <Card.Meta>{co.classSection}</Card.Meta>
                          <Card.Description>
                            
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