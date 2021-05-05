import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Icon, Item, Label, Segment, Statistic } from 'semantic-ui-react'
import { getTasksById } from '../../redux/slices/Grade';


export default function MissingTasks(props) {
    return (
        <div>
              { props.taskmissing.length <= 0 ? (

<Segment placeholder>
<Header icon>
  <Icon name='tasks' />
  No Missing Tasks For you.
</Header>

</Segment> 
                   ) : (
                    props.taskmissing.map((task,index) =>
                    task.taskStatus ==="missing" ?(
                      <Link to={task.task.typeTask === "Quiz" ? "/TaskQuizDetail/"+task._id : "/TaskFileDetail/"+task._id}>   
                      <Segment color="grey" raised> 
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
                <label color="green">  <h4>
                  <span className='cinema'> End Date : {moment(task.task.endDate).format("MMM Do ")}<br/></span>
                  </h4>
                  </label>
                
                
             </Item>
             
             </Item.Group>
          
             </Segment>
             <Divider hidden></Divider>
             </Link>
                     ) : (<></>) ) ) }
        </div>
    )
}
