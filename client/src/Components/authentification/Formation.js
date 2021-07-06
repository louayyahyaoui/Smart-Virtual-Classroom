import React, { useEffect, useState } from 'react'
import ModalFormation from "./ModalFormation"
import {
    
    Item,
    
   
    Header,
 
    Segment,
   
  } from "semantic-ui-react";

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth } from '../../helpers/auth';
import { getUserDataById } from '../../redux/slices/User';
export default function Formation(props) {
  const data = useSelector((state) => state.user.UserDataById);
 const [formation, setFormation] = useState([]);
 const dispatch = useDispatch();
 console.log(data);
 useEffect(() => {
  dispatch(getUserDataById(isAuth()._id)).then((res)=>{

    setFormation(res.payload.data.formation);
  });
 }, [])
    return (
        <div>
          <Segment raised>
             
               <ModalFormation info="add"  addFormation={ formation => setFormation(formation)} />
               
               <Header as="h3" dividing>
        Formation 
     
      </Header>
   
      <Item.Group divided>
        {formation.map((forma)=>(
   <Item >
   <Item.Image size="tiny" src={process.env.PUBLIC_URL+"/school.png"} />

   <Item.Content>
     <Item.Header as='h2'>{forma.description}</Item.Header>
     <Item.Meta>
       <span className='cinema'>{moment(forma.dateDebut).format("L")} ~ {moment(forma.dateEnd).format("L")} </span>
     </Item.Meta>
     <Item.Description>{forma.title}</Item.Description>
     <Item.Extra>
     <ModalFormation info="edit" addFormation={ formation => setFormation(formation)}id={forma.id} title={forma.title} description={forma.description} dateDebut={forma.dateDebut} dateEnd={forma.dateEnd}/>
     </Item.Extra>
   </Item.Content>
 </Item>

        ))}
   
 

  </Item.Group>
  </Segment>
        </div>
    )
}
