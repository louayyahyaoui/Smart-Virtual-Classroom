import React, { useState } from 'react'
import ModalFormation from "./ModalFormation"
import {
    
    Item,
    
   
    Header,
 
    Segment,
   
  } from "semantic-ui-react";

import moment from 'moment';
export default function Formation(props) {
 
 const [formation, setFormation] = useState([]);

    return (
        <div>
          <Segment raised>
             
               <ModalFormation info="add"  />
               
               <Header as="h3" dividing>
        Formation 
     
      </Header>
   
      <Item.Group divided>
        {props.formation.map((forma)=>(
   <Item >
   <Item.Image size="tiny" src={process.env.PUBLIC_URL+"/school.png"} />

   <Item.Content>
     <Item.Header as='h2'>{forma.description}</Item.Header>
     <Item.Meta>
       <span className='cinema'>{moment(forma.dateDebut).format("L")} ~ {moment(forma.dateEnd).format("L")} </span>
     </Item.Meta>
     <Item.Description>{forma.title}</Item.Description>
     <Item.Extra>
     <ModalFormation info="edit" addFormation={forma => setFormation(forma)} id={forma.id} title={forma.title} description={forma.description} dateDebut={forma.dateDebut} dateEnd={forma.dateEnd}/>
     </Item.Extra>
   </Item.Content>
 </Item>

        ))}
   
 

  </Item.Group>
  </Segment>
        </div>
    )
}
