import React , { state, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';

import { getTaskById, getTasks } from "../../redux/slices/Task.js";
import { Button,Divider,Segment,Card,Icon,Header,Menu, Grid} from 'semantic-ui-react';
import {Link, link} from 'react-router-dom';
import AddTask from './AddTask.js';
export default function Task() {
 
    const tasks = useSelector( state => state.tasks.tasks)

 
  
  const dispatch = useDispatch();
 //console.log(tasks)
   
 useEffect(()=>{
     
  dispatch(getTasks());
  //const [data] = dispatch(getTasks());
  // getTasks(dispatch);
 
 },[dispatch])

 
    return (
     <>


      <Header as='h2' block >
    Dispaly Tasks
  </Header>
  <Divider hidden/>
  <Card.Group >
    {tasks.map((task,index) => 
   
      <Card
      href='#card-example-link-card'key={index}
      >

<Card.Content header={task.title} />
<Card.Content description={task.theme} />
<Card.Content extra>
  <Icon name='user' />4 Students
</Card.Content>
</Card>

    )}
     
     </Card.Group>

  
  </>

    )  ;
    
}