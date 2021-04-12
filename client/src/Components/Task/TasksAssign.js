import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Header, Icon, Item, Label, Segment, Statistic } from 'semantic-ui-react'
import { getTasksById } from '../../redux/slices/Grade';

const student = [
    {id : "6065ef725837a846a0aa2718" ,student : 'Sofien'}]
export default function TasksAssign(props) {

   
   
    return (
        <div>
             { props.taskAssign.length <= 0 ? (

<Segment placeholder>
<Header icon>
  <Icon name='tasks' />
  No Assign Tasks For you {student[0].student}.
</Header>

</Segment> 
                   ) : (
               props.taskAssign.map((task,index) =>
               task.taskStatus === "Attribué" ? (
                      <Segment color="red" raised> 
                       <Item.Group divided key={index} >
                     
             <Item  >
             <Item.Image size='tiny' 
              avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' /> 
             
              <Item.Content >
                <Item.Header as='a'>{task.task.title}</Item.Header>
                <Item.Meta>
                  <span >{task.task.description}</span>
                </Item.Meta>
           
            
             
                
             
                </Item.Content>
            
                <label>{task.taskStatus}</label>
                
             </Item>
             
             </Item.Group>
             
             </Segment>
             
                     ) : (<div></div>)  ))}
        </div>
    )
}
