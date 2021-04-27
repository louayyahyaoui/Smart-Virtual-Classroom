import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { Button, Card, Grid, Header, Icon, Image, Input, Loader, Segment } from 'semantic-ui-react'
import { isAuth } from '../../helpers/auth';
import { assignGradeToStudent } from '../../redux/slices/Grade';
import { getDetailTask } from '../../redux/slices/Task';
import CorrectedTask from './CorrectedTask';



export default function UncorrectedTask(props) {
  const {id} = useParams();
    const [grade , setGrade] = useState();
    const [_id, setIdTask] = useState();
    const [objgrade , setObjGrade] =useState({"_id" : null , "grade" :null});

    const submitGrade =   ( e ,data) => {
        
            setObjGrade({"_id" :data,"grade" : e.target.value });
    
  console.log(objgrade);
    };
    const  dispatch = useDispatch();

    const assignGrade = () =>{
  
        dispatch(assignGradeToStudent(objgrade)).then(()=>{
          dispatch(getDetailTask(id));
        });
        
    }
      
    useEffect(() => {
     
      
      dispatch(getDetailTask(id));
    }, [id])

    return (
        <div>
              <Card.Group>
                  { props.uncorrectTasks.length<= 0  ? (<div> vide</div>)  : (

 props.uncorrectTasks.map((task,index) =>
    task.grade ===null ? (
  <Card key={index} color='red' raised>

   

    <Card.Content>
      <Image
        floated='right'
        size='mini'
        
        src={task.student.picture}
      />
      <Card.Header>{task.student.name}
   
      </Card.Header>
     
      <Card.Meta >
          <strong>{task.taskStatus}</strong>
          
  
  </Card.Meta>
      <Card.Description>
  
    File
             

      </Card.Description>
    </Card.Content>
    <Card.Content extra>
  
    <Input
   
  name="grade"
   type="number"
  size='mini'
  


onChange={(e) => submitGrade(e , task._id)}


/><Button color="red" onClick={()=>assignGrade()} >Send</Button>
    
    </Card.Content>
  </Card>
    ): (
      
<></>
    )) 
                   )}
  
  </Card.Group>
        </div>
    )
}
