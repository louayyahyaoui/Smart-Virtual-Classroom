import React from 'react'
import { useState } from 'react';
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Button } from "semantic-ui-react";

export default function ComponentInterests({triggerNextStep,refreshInterests},props) {
    const [interests,SetInterests] = useState([]);

    const  handleChangeTag = (tag) => {
      console.log(tag);
      SetInterests(tag);
    //refreshSkills(skills)
    console.log("FormAskData");
    console.log(interests);
     };
  
  
     const handleClickButton = () =>{
      triggerNextStep({ trigger: "Summary" });
      refreshInterests(interests);
     }
  
  
  
     return (
       <>
         <TagsInput value={interests} onChange={handleChangeTag} />
         <div style={{ maxHeight: "10%" }}>
           <Button
            
             onClick={handleClickButton}
             basic
             color="red"
           >
             Next
           </Button>
         </div>
       </>
     );
}
