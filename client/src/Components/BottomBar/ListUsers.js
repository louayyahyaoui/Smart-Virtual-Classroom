import React, { useEffect, useState } from "react";
import { Dropdown, Menu } from "semantic-ui-react";

function ListUsers(props) {
  const listUsers = [{ key: Number, text: "", value: "" }];
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
  

  return (
    <div>
     <Menu compact>
     <Dropdown
    placeholder='List Participant'
  
    selection
    options={listUsers}
  />
        </Menu>

    </div>
  );
}

export default ListUsers;
