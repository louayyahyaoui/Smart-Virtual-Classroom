import { Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Divider, Header, Icon,Message } from "semantic-ui-react";

import {
  fetchRecomandedCourses,
  selectRecomandedCourses,
} from "../../redux/slices/recomandationslice";
import CardRecomandation from "./CardRecomandation";
function Recomandation() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecomandedCourses(currentUser._id));
     
 
  }, [dispatch]);
  const [RcomandedCourses] = useSelector(selectRecomandedCourses);
  

  return (
    <div>
    
      <List >
        {RcomandedCourses.slice(0, 5).map((Recomandedcourse, index) => (
                
          <List.Item >   
            <List.Content >
              {" "}
              <CardRecomandation recomanded={Recomandedcourse} />
            </List.Content>
          </List.Item>
          
        ))}
      </List>
      
    
    </div>
  );
}

export default Recomandation;
