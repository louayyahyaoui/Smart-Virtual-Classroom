import React from 'react'
import {  Item,  Header, Segment } from 'semantic-ui-react';
import ModalCentresInteret from "./ModalCentresInteret";
import ModalAddCentresInteret from "./ModalAddCentresInteret";

export default function CentresInteret(props) {
  return (
    <div>
      <Segment raised>
     <ModalAddCentresInteret/>   <ModalCentresInteret interets={props.interets}/>
        <Header as="h3" dividing>
          Centres d’intérêt
        </Header>
        <Item.Group>
          {props.interets.map((interet)=>(

<Item>
<Item.Image size='tiny' src='/images/wireframe/image.png' />

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
