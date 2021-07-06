import React from 'react'
import {
    Image,
    Item,
    Button,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Radio,
    Loader,
    Segment,
    Label
} from "semantic-ui-react";
import ModalBio from "./ModalBio"
export default function Bio(props) {
    return (
        <div>
            <Segment raised>
            <ModalBio
               bio={props.bio} setBio={bio => props.setBio(bio)}
               name={props.name}  
               email={props.email} 
                sexe={props.sexe} 
                phone={props.phone}
                address={props.address}
                 birthday={props.birthday}  
                 linkedIn={props.linkedIn} 
                 github={props.github} 
            />
            <Header as="h3" dividing>
        Bio 
   
      </Header>
     
                <p>{props.bio}</p>
            </Segment>
        </div>
    )
}
