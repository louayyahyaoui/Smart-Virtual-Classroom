import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Header, Segment } from 'semantic-ui-react'
import { isAuth } from '../../helpers/auth';
import { getTasksById } from '../../redux/slices/Grade';

export default function ReminderTask() {

    const grades = useSelector( state => state.grades.grades);
    const [reminder , setReminder] =useState(false)
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
    const taskDetail={
      "idUser":isAuth()._id,
      "idClass" : currentClass._id,
      
    }
   
 
    
   
    
      /*const dispatch = useDispatch();
  
 
      useEffect(()=>{
       
          dispatch(getTasksById(taskDetail));
        
         
         },[])
       */
         console.log(grades);
    return (
       
        <>
           <Segment>
           
              <Header color="red" as="h3" textAlign="center">
                TO DO
              </Header>
      
          </Segment>

       
        <Card>
        
            
            <Card.Content header='TO DO' >
       
   
       

          
 <Card.Description>
                { reminder ? ( <p>Check Your Task List You Have Assign Task clic  <Link to="/TaskListStudent">ici</Link> </p>)  : ( <p>All Done Good No Tasks Assign </p>) }
                
                </Card.Description>
        
        
                <Card.Description>
              <p>All Done Good No Tasks Assign </p>
                
                </Card.Description>
                <Card.Description>
              <p>All Done Good No Tasks Assign </p>
                
                </Card.Description>
                <Card.Description>
              <p>All Done Good No Tasks Assign </p>
                
                </Card.Description>
      
      </Card.Content>
      </Card>
        </>
    )
}
