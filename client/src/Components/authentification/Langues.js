import React from 'react'
import { Icon,Button,Header, Label,Segment } from 'semantic-ui-react'
import ModalLangues from "./ModalLangues"
import ModalAddLangues from "./ModalAddLangues"
export default function Langues(props) {
    return (
        <div>
           <Segment raised>
           <ModalAddLangues />  <ModalLangues langues={props.langues}/>
               
               <Header as="h3" dividing>
        Langues 
     
      </Header>
      {props.langues.map((lang)=>(
    <Label as='h3'>{lang}</Label>
   ))}
               </Segment>
        </div>
    )
}
