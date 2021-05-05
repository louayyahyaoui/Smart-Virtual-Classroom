import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Feed, Header, Image, Segment } from 'semantic-ui-react'
import { isAuth } from '../../helpers/auth';
import { getTasksById } from '../../redux/slices/Grade';
import { getNbrTasksAttribue } from '../../redux/slices/Task';

export default function ReminderTask() {

    const tasks = useSelector( state => state.tasks.tasksAttribue);
    const [reminder , setReminder] =useState(false)
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
    const taskDetail={
      "idUser":isAuth()._id,
      "idClass" : currentClass._id,
      
    }
   
 
    
   
    
      const dispatch = useDispatch();
  
 
      useEffect(()=>{
       
          dispatch(getNbrTasksAttribue(taskDetail));
        
         
         },[])
       
         console.log(tasks);
    return (
       
        <>
           <Segment>
           
              <Header color="red" as="h3" textAlign="center">
                TO DO
              </Header>
      
          </Segment>

      <Card color="red">
  
    <Card.Content>
    {tasks.length > 0 ? (<>
       
       {tasks.map((task)=>

      <Feed>
        <Feed.Event>
          <Feed.Label               avatar image={process.env.PUBLIC_URL +  task.task.typeTask === "Quiz" ? "/quiz.jpg" : "/file.jpg"}  />
          <Feed.Content>
          
            <Feed.Summary >
            <Link  to={task.task.typeTask === "Quiz" ? "/TaskQuizDetail/"+task._id : "/TaskFileDetail/"+task._id}>     
              <h5>{task.task.title}</h5> 
              </Link>
            
            </Feed.Summary>
           
          </Feed.Content>
        </Feed.Event>

      </Feed>
        )}
       
        </>) : (<Feed.Event  > <h5>Good No Tasks </h5></Feed.Event>)}
    </Card.Content>
  </Card>
        </>
    )
}
