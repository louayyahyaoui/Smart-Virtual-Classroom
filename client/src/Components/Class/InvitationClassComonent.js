import { Grid, Image, Label, Segment, Button, Card } from "semantic-ui-react";
import React, {  useEffect } from "react";
import {
  fetchActiveClass,
  fetchRequestClass,
  fetchInvitationclass,
  selectinvitationclass,
  fetchclass,
} from "./../../redux/slices/classsline";
import { ClassInvitationApi,AddclassApi } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";

export default function InvitationClassComonent() {
  const documentData = JSON.parse(localStorage.getItem("user"));

  const [classinvit, err] = useSelector(selectinvitationclass);
 
 
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvitationclass(documentData._id));
  }, [dispatch]);

  const Decline = async (idq) => {
    try {
      const res = await ClassInvitationApi.deleteClassInvitation(idq);
      dispatch(fetchInvitationclass(documentData._id));
      dispatch(fetchActiveClass(documentData._id));
      dispatch(fetchRequestClass(documentData._id));
    } catch (error) {
      alert(error);
    }
  };
  const Approve = async (idinviation,idclass,email) => {
    try {
      const res = await AddclassApi.addUserToClass(idclass,email);
      const res2 = await ClassInvitationApi.deleteClassInvitation(idinviation);
      dispatch(fetchInvitationclass(documentData._id));
      dispatch(fetchActiveClass(documentData._id));
      dispatch(fetchRequestClass(documentData._id));
      dispatch(fetchclass(documentData.role, documentData._id,"Active"));
    } catch (error) {
      alert(error);
    }
  };
 
  return (
    <div>
      <Grid columns={1}>
        <Grid.Column>
          <Segment raised>
            <Label as="a" color="teal" ribbon>
              Class Invitation
            </Label>
            {classinvit?.map((co, i) => (
              <Grid.Column key={i}>
                <Card.Group>
                  <Card color='teal' >
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src={co.userOb.picture}
                      />
                      <Card.Header>{co.classOb.className}</Card.Header>
                      <Card.Meta>{co.classOb.classSection}</Card.Meta>
                      <Card.Description>{co.classOb.classDescription}</Card.Description>                
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Button basic color="green" onClick={() => Approve(co._id,co.classOb._id,co.userOb.email)}>
                          Approve
                        </Button>
                        <Button basic color="red" onClick={() => Decline(co._id)}>
                          Decline
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            ))}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

