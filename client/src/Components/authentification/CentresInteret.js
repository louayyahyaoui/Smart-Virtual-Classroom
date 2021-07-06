import React, { useEffect, useState } from 'react'
import {  Item,  Header, Segment } from 'semantic-ui-react';
import ModalCentresInteret from "./ModalCentresInteret";
import ModalAddCentresInteret from "./ModalAddCentresInteret";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataById } from '../../redux/slices/User';
import { isAuth } from '../../helpers/auth';

export default function CentresInteret(props) {
  const data = useSelector((state) => state.user.UserDataById);
  const [interets, setInterets] = useState([]);
  const dispatch = useDispatch();
  console.log(data);
  useEffect(() => {
   dispatch(getUserDataById(isAuth()._id)).then((res)=>{
 
    setInterets(res.payload.data.interets);
   });
  }, [])
  return (
    <div>
      <Segment raised>
     <ModalAddCentresInteret/>   <ModalCentresInteret addInterets={ interet => setInterets(interet) } interets={interets}/>
        <Header as="h3" dividing>
          Centres d’intérêt
        </Header>
        <Item.Group>
          {interets.map((interet)=>(

<Item>
<Item.Image size='tiny' src={ process.env.PUBLIC_URL+"/interet.png"} />

<Item.Content>
  <Item.Header as='h2'>{interet}</Item.Header>

 
</Item.Content>
</Item>
          ))}
         

        
        </Item.Group>
      </Segment>
    </div>
  )
}
