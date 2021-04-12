
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Divider, Grid, Header, Icon, Image, Input, Menu } from 'semantic-ui-react'
import { assignGradeToStudent } from '../../redux/slices/Grade';
import {  getDetailTask } from '../../redux/slices/Task';
import CorrectedTask from './CorrectedTask';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
 
} from "react-router-dom";
import UncorrectedTask from './UncorrectedTask';

export default function DetailTask() {
  const {id} = useParams();

  const [activeItem, setActiveItem] = useState("Uncorrected");
  

    const tasks = useSelector( state => state.tasks.tasks)
   
  
    const submitGrade = (e) =>{
 
    }
    const  dispatch = useDispatch();
   
    useEffect(() => {
     
      
      dispatch(getDetailTask(id));
    }, [id])

    const handleItemClick = (e, { name }) => setActiveItem(name);
    return (
        <div>
        <Divider  hidden/>

   

<Header  as='h2' content='Task Info' />

            <Grid >
    <Grid.Row>
      <Grid.Column width={3}>
      <Menu pointing secondary vertical>
      
      <Menu.Item
                  name="Corrected"
                  
                  active={activeItem === "Corrected"}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Uncorrected"
             
                  active={activeItem === "Uncorrected"}
                  onClick={handleItemClick}
                />
      </Menu> 
     
      </Grid.Column>
      <Grid.Column width={13}>

     
     { activeItem ==="Uncorrected" ? (  <UncorrectedTask uncorrectTasks={tasks}/> )  : (<CorrectedTask correctTasks={tasks}/>) }
                
              

            
        
      </Grid.Column>
     
    </Grid.Row>
  </Grid>


        </div>
    )
}
