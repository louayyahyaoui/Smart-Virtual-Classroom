import React from 'react'
import { Icon, Label ,Header,Button,Segment} from 'semantic-ui-react'
import ModalSkills from './ModalSkills'
import ModalAddSkills from './ModalAddSkills'

export default function Skills(props) {
    return (
        <div>
           <Segment raised>
           <ModalAddSkills/> <ModalSkills skills={props.skills} deleteskills={props.deleteskills}/>
                     <Header as="h3" dividing>
        Skills 
      </Header>
              <Label.Group color='blue'>
   {props.skills.map((skill)=>(
    <Label as='h3'>{skill}</Label>
   ))}
    
    
  </Label.Group>
  </Segment>
        </div>
    )
}
