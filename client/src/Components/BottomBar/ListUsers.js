import React, { useEffect, useState } from "react";
import { Dropdown, Feed, Grid, Menu, Segment } from "semantic-ui-react";

function ListUsers(props) {
  console.log(props.userlistromm);
 /* const listUsers = [{ key: Number, text: "", value: "" }];
  for (let i = 0; i < props.userlistromm.length; i++) {
    const option = {
      key: props.userlistromm[i]._id,
      text: props.userlistromm[i].info.userName,
      value: props.userlistromm[i].info.userName,
    };
    
    listUsers.push(option);
  }
  console.log("cc");
  console.log(props.userlistromm);
  */

  return (
    <div>
    {props.userlistromm?.map((cl, index) => (
      <div key={index}>
        <Grid stackable>
        <Grid.Row divided>     
        <Feed>
        <Feed.Event>
          <Feed.Label image={cl.info.Image} />
          <Feed.Content>
            <Feed.Summary>
            {cl.info.userName}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        </Feed>
        </Grid.Row>
        </Grid>
      </div>
       ))}
    </div>
  );
}

export default ListUsers;
