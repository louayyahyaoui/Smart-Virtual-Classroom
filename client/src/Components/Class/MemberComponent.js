import React , {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import { AddclassApi, getclassApi,ClassInvitationApi } from "../../api/api";
import {
  fetchclass,
  fetchInvitationclassId,
  selectmembers,
  selectusers,
  fetchUsers
} from "../../redux/slices/classsline";
import AddUserToClassComponent from "./AddUserToClassComponent";

function MemberComponent() {
  const history = useHistory();
  
  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [members] = useSelector(selectmembers);
  const dispatch = useDispatch();
  const [usersList] = useSelector(selectusers);
  useEffect(() => {
    dispatch(fetchInvitationclassId(classinvit._id));
    dispatch(fetchUsers());
  });
  setTimeout(()=>{},200);
  const Remove = async (idclass, email) => {
    try {
      const res = await AddclassApi.removeUserFromClass(idclass, email);
      console.log(res);
      const res2 = await getclassApi.getclassById(classinvit._id);
      localStorage.setItem("idClass", JSON.stringify(res2));
      dispatch(fetchclass(documentData.role, documentData._id,"Active"));
      history.push("/members");
    } catch (error) {
     console.log(error);
    }
  };

  const RemoveInvitation = async (idq) => {
    try {
      await ClassInvitationApi.deleteClassInvitation(idq);
      dispatch(fetchInvitationclassId(classinvit._id));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {classinvit.classOwner._id === documentData._id && (
        <AddUserToClassComponent floated="right" users={usersList} members={members} />
      )}
      <Header as="h2" icon textAlign="center">
        <Icon name="users" size="big" />
        Accounts
      </Header>
      <Segment raised color="red">
        <div>
          <Header.Subheader>
            {classinvit.classUsers?.map((co, i) => (
              <div key={i}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={1}>
                      <Image
                        circular
                        size="mini"
                        src={co.picture}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>{co.name}</Grid.Column>
                    <Grid.Column width={1}>
                      {classinvit.classOwner._id === documentData._id ? (
                        <Icon
                          name="delete"
                          size="tiny"
                          link
                          onClick={() => Remove(classinvit._id, co.email)}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            ))}
          </Header.Subheader>
        </div>
      </Segment>
      <Header as="h2" icon textAlign="center">
        <Icon name="add user" size="big" />
        Pending Accounts
      </Header>
      <Segment raised color="orange">
        <div>
          <Header.Subheader>
            {members?.map((co, i) => (
              <div key={i}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={1}>
                      <Image
                        circular
                        size="mini"
                        src={co.userOb.picture}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>{co.userOb.name}</Grid.Column>
                    <Grid.Column width={1}>
                    {classinvit.classOwner._id === documentData._id ? (
                        <Icon
                          name="delete"
                          size="tiny"
                          link
                          onClick={() => RemoveInvitation(co._id)}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
          
            ))}
          </Header.Subheader>
        </div>
      </Segment>
    </div>
  );
}

export default MemberComponent;
