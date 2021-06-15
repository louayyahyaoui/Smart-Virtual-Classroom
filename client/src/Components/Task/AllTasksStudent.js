import moment from 'moment';
import React from 'react'

import { Link } from 'react-router-dom';
import {  Divider, Header, Icon, Item, Segment,  } from 'semantic-ui-react'



export default function AllTasksStudent(props) {

   
   
    return (
        <div>
              { props.allGrades.length <= 0 ? (

<Segment placeholder>
<Header icon>
  <Icon name='tasks' />
  No Tasks For you .
</Header>

</Segment> 
                   ) : (
                    props.allGrades.map((task,index) =>
                    
                    <Link to={task.task.typeTask === "Quiz" ? "/TaskQuizDetail/"+task._id : "/TaskFileDetail/"+task._id}>                      
                      <Segment color='grey' raised > 
                     
                       <Item.Group divided key={index} >
                      
             <Item  >
             <Item.Image size='tiny' 
              avatar src={process.env.PUBLIC_URL +  task.task.typeTask === "Quiz" ? "/quiz.jpg" : "file.jpg"} /> 
           
              <Item.Content >
                <Item.Header as='a'>{task.task.title}</Item.Header>
                <Item.Meta>
                   <span className='cinema'>At {moment(task.task.DateAt).format("MMM Do YY")}</span>
                </Item.Meta>
                <Item.Description>{task.task.description}</Item.Description>
              
                
             
                </Item.Content>
             
                  <label >  <h4>Status : {task.taskStatus}<br/>
                  <span className='cinema'> End Date : {moment(task.task.endDate).format("MMM Do ")}<br/></span>
                  {task.grade ===null ? ( <span> Not Corrected Yet</span> )  : (

<span>    Grade : {task.grade}<br/></span>
                  )}</h4>
                  </label>
                  
             
              
              
                
             </Item>
             
             </Item.Group>
             
             </Segment>
             <Divider hidden></Divider>
             </Link>

                     ))}
        </div>
    )
}
