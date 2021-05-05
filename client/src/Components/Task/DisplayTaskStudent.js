import React ,{useEffect, useState} from 'react';
import { useSelector ,useDispatch} from 'react-redux';

import { Button,Statistic, Icon, Divider, Item, Label,Header, Segment, Menu, Grid } from 'semantic-ui-react';
import { isAuth } from '../../helpers/auth';

import { getTasksById } from '../../redux/slices/Grade';
import { getNbrTasksAttribue } from '../../redux/slices/Task';
import AllTasksStudent from './AllTasksStudent';
import MissingTasks from './MissingTasks';
import TasksAssign from './TasksAssign';
import TasksRemis from './TasksRemis';


export default function DisplayTaskStudent() {
 
  const [activeItem, setActiveItem] = useState("All");
  const grades = useSelector( state => state.grades.grades);
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const taskDetail={
    "idUser":isAuth()._id,
    "idClass" : currentClass._id,
    
  }
  console.log(grades)
    const dispatch = useDispatch();
  console.log(grades);
    useEffect(()=>{
     
        dispatch(getTasksById(taskDetail));
        dispatch(getNbrTasksAttribue(taskDetail));
       
       
       },[])

       const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <>
       
    <Divider  hidden/>

   

         <Header  as='h2' content='List Task' />
         <Divider />
         <Grid >
    <Grid.Row>
      <Grid.Column width={3}>
         <Menu pointing secondary vertical>
         <Menu.Item
          name='All'
          active={activeItem === "All"}
          onClick={handleItemClick}
       
        />
        <Menu.Item
          name='Attribué'
          active={activeItem === "Attribué"}
          onClick={handleItemClick}
       
        />
         <Menu.Item
          name='Remis'
          active={activeItem === "Remis"}
          onClick={handleItemClick}
       
        />
        <Menu.Item
          name='Manquant'
          active={activeItem === "Manquant"}
          onClick={handleItemClick}
        />
       
      </Menu>
      </Grid.Column>
      <Grid.Column width={13}>

                  
    

                  {   activeItem ==="All" ? (  <AllTasksStudent allGrades={grades} /> ) 
                  : activeItem ==="Attribué" ?  (<TasksAssign taskAssign={grades}/>) 
                  : activeItem ==="Remis" ?  (<TasksRemis remisGrades={grades}/>)
                  :   (<MissingTasks taskmissing={grades}/>)
             

                }
    
    
    </Grid.Column>
     
     </Grid.Row>
   </Grid>
 


    


 </>
        
  );
}
