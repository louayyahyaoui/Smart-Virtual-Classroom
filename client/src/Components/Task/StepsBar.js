import React, {  useState } from 'react'

import {Step,Icon,Button ,Divider,Header, Message} from 'semantic-ui-react';
import AddTask from './AddTask';
import SendTask from './SendTask';
import AddQuiz from '../Quiz/AddQuiz';
import TaskFile from './TaskFile';
import { isAuth } from '../../helpers/auth';
import { Link } from 'react-router-dom';


export default function StepsBar() {

 

  const classs = JSON.parse(localStorage.getItem("idClass"));
  /* save data quiz */
  const [quiz , setQuiz] = useState({
    id : "",
    fquestion : "",
    foptionA : "",
    foptionB : "",
    foptionC : "",
    foptionD : "",
    fpoint : "",


})



  /* save task data to upload late or update  */
  const [task , setTask] = useState({
   
    title : "",
    description : "",
    theme : "",
    cour : classs._id,
    typeTask : "Quiz",
    listQuestion : [],
    listStudents : [],
    endDate : null,
    creator : isAuth()._id
 
});
console.log("step : ")
console.log(task);
 
  const [step, setStep] = useState(1);
console.log(step)
  const handleNextStep = ()=>{
 
    setStep(step+1)
   
   
  }
  
  const handleBackStep = ()=>{
    
    setStep(step-1)

  }
   
    return (
        <div>
              <Divider hidden/>
    <Header  as='h2' content='Add Quiz' />
    
    <Divider />
    <Step.Group widths={3}>
    <Step completed={step===2 || step===3 || step===4} active={step===1}>
      <Icon name='newspaper' />
      <Step.Content>
        <Step.Title>Info Quiz</Step.Title>
        <Step.Description>Add Quiz Details ..</Step.Description>
      </Step.Content>
    </Step>
    <Step completed={step=== 3 || step ===4} active={step===2}>
      <Icon name='tasks' />
      <Step.Content>
        <Step.Title>Quiz</Step.Title>
        <Step.Description>Add Quiz Content ..</Step.Description>
      </Step.Content>
    </Step>
    <Step  active={step===3}completed={step=== 4}>
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Send</Step.Title>
        <Step.Description>Confirm Your Add ..</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
 
 
  {step === 1  ?  ( <AddTask data={task} addTask={task => setTask(task)} nextStep={step => setStep(step)} />) :  step === 2 ?
  

  task.typeTask==="File" ?  ( 
  
    <TaskFile  data={task} addTask={task => setTask(task)}   nextStep={step => setStep(step)} />
    
    )  :
  
  ( 
  
  <AddQuiz  data={task} addTask={task => setTask(task)}   nextStep={step => setStep(step)} />
  
  )  
  
  
  
  : step===3 ?  ( <SendTask data={task} nextStep={step => setStep(step)} /> ) : ( <>   
  <Message
    success
    header='Your Task  was successful Added'
    content='You may now log-in with the username you have chosen'
  ></Message>
  <Link to="/TaskList">
  <Button fluid color="red">View All Tasks</Button>
  </Link>
  
  </>
  ) }

  
 
 
 
  
<div hidden={step<2 || step>3}>
  <Button 
  disabled={step<2}
  floated='left'
  onClick={handleBackStep}
  >Back</Button>

  </div>
 
        </div>
    )
}
