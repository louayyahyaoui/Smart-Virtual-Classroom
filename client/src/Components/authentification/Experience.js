import moment from 'moment';
import React from 'react'
import {

  Item,
  Button,

  Header,

  Segment,

} from "semantic-ui-react";
import ModalExperience from "./ModalExperience"
export default function Experience(props) {
  return (
    <div>
      <Segment raised>
      <ModalExperience info="add" />
        <Header as="h3" dividing>
          Experience
        </Header>
        <Item.Group divided>
        {props.experience.map((exp)=>(
           <Item >
           <Item.Image size="tiny" src={process.env.PUBLIC_URL+"/company.png"} />

            <Item.Content>
              <Item.Header as='h2'>{exp.title}</Item.Header>
              <Item.Meta>
              <span className='cinema'>{moment(exp.dateDebut).format("L")} ~ {moment(exp.dateFin).format("L")} </span>
              </Item.Meta>
              <Item.Description>{exp.description}</Item.Description>
              <Item.Extra>
                <ModalExperience info="edit" title={exp.title} id={exp.id} description={exp.description} dateDebut={exp.dateDebut} dateFin={exp.dateFin} />
              </Item.Extra>
            </Item.Content>
          </Item>
     ))}
         
        </Item.Group>
      </Segment>
    </div>
  )
}
