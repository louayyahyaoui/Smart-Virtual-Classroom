import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react'
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
   
   /* for (var i = 0; i < grades.length; i++) {
        if(grades[i].taskStatus==="Attribué"){
            setReminder(true);
            break;
            }
            
      }*/
    
   
    
      /*const dispatch = useDispatch();
  
 
      useEffect(()=>{
       
          dispatch(getTasksById(taskDetail));
        
         
         },[])
       */
         console.log(grades);
    return (
       
        <>
            
            <Card.Content>
        <Card.Header>To Do </Card.Header>
   
       

          
 <Card.Description>
                { reminder ? ( <p>Check Your Task List You Have Assign Task clic  <Link to="/TaskListStudent">ici</Link> </p>)  : ( <p>All Done Good No Tasks Assign </p>) }
                
                </Card.Description>
        
        
             
      
      </Card.Content>
        </>
    )
}
