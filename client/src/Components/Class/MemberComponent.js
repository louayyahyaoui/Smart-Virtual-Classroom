import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Header, Icon, Image, Segment } from "semantic-ui-react";
import { AddclassApi,getclassApi } from "../../api/api";
import { fetchSingleClass, selectedClasses } from "../../redux/slices/classsline";
import AddUserToClassComponent from "./AddUserToClassComponent";

function MemberComponent() {
    const classinvit = JSON.parse(localStorage.getItem("idClass"));
    const documentData = JSON.parse(localStorage.getItem("user"));
    const dispatch =  useDispatch();
    const Remove = async (idclass,email) => {
        try {
          const res = await AddclassApi.removeUserFromClass(idclass,email);
          console.log(res);
          const res2 = await getclassApi.getclassById(classinvit._id);
          localStorage.setItem("idClass",JSON.stringify(res2));
          dispatch(fetchSingleClass(res2));
        } catch (error) {
          alert(error);
        }
      };
  return (
    <div>
      
         {classinvit.classOwner._id === documentData._id && (
        <AddUserToClassComponent floated="right"/>
         )}
        <Header as="h2" icon textAlign= "center">
        <Icon name="users" size="big" />
        Accounts
        </Header>
        <Segment raised color="red">
      <Header as="h2" icon>
        
        <Header.Subheader>
        {classinvit.classUsers?.map((co, i) => (
          <Header as="h4"  key={i} >
            <Image
              circular
              src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
            />{" "}
            {co.name}
            {classinvit.classOwner._id === documentData._id && (
            <Button floated="left"  onClick={() => Remove(classinvit._id,co.email)} >Remove</Button>
            )}
          </Header>
        ))}
        
        </Header.Subheader>
      </Header>
      </Segment>
    </div>
  );
}

export default MemberComponent;
