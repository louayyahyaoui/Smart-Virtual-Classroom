import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

function ListUsers(props) {
  const [user, setusers] = useState([]);

  useEffect(() => {
    props.userlistromm.forEach((element) => {
      setusers(user.concat(element.info.userName));
      console.log(
        "list from list user " + JSON.stringify(element.info.userName)
      );
    
    });
  });

  return (
    <div>
     {
         props.userlistromm.map((u,index)=>{
         <h>{ JSON.stringify(u.info.userName)}</h>
         })
        }
    </div>
  );
}

export default ListUsers;
