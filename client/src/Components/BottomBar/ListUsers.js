import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

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
     
     <Dropdown
    placeholder='Select Friend'
  
    selection
    options={listUsers}
  />
        

    </div>
  );
}

export default ListUsers;
