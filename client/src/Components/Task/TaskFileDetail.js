import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import { Button, Card, Container, Divider, Grid, Header, Icon, Image, Message } from 'semantic-ui-react';
import { getDetailByTaskByStudent, rendreTask } from '../../redux/slices/Grade';
import ModalTask from './ModalTask';

export default function TaskFileDetail() {

    const {id} = useParams();
   const state = useSelector(state => state.grades.grades[0]);
   const files = useSelector(state => state.tasks.files)
   


   
   const grade={
       "id":id,
       "taskStatus" : "remis",
       "listReponse" : files
     }

    const  dispatch = useDispatch();
    const submitTask = ()=>{
      console.log("grade : ");
      console.log(grade);
            dispatch(rendreTask(grade)).then(()=>{
              dispatch(getDetailByTaskByStudent(id));
            });
            
      }

    useEffect(() => {
        dispatch(getDetailByTaskByStudent(id));
    }, [id,dispatch]);


  
    return (
        <div>
            { !state ? (<></>)  : ( 
 <Grid>
  
 <Grid.Row>
   <Grid.Column width={1}>

       
   </Grid.Column>
   <Grid.Column width={14}>
     
   <Grid> <Grid.Row>  <Grid.Column width={12}>

      
      
     <Header as="h1">
       <Icon name="file alternate" />
       <Header.Content>
         {state.task.title}
         <Header.Subheader>
           <ReactTimeAgo date={state.task.DateAt} locale="en-US" />
         </Header.Subheader>
       </Header.Content>
     </Header>
     <Divider></Divider>
     <br />
     <Container>
       <p>{state.task.description}</p>
     </Container>
     <Grid>
       <Grid.Row>

    { !state.task.listQuestion ? (<></>) : (

state.task.listQuestion.map((files, index) =>

files.split(".").pop() === "pdf" ||
files.split(".").pop() === "pptx" ||
files.split(".").pop() === "docx" ? (
<div key={index}>
 <a href={files} target="_blank" rel="noopener noreferrer">
   <div>
     <Grid.Column width={3}>
       <img
         src={
           process.env.PUBLIC_URL +
           "/files-type/" +
           files.split(".").pop() +
           ".png"
         }
         style={{
           margin: "10px",
           height: "100px",
           width: "100px",
         }}
         alt=""
       />
     </Grid.Column>
     <Grid.Column width={3}>
       <Grid.Row>
         <Header as="h4" color="red">
           {files.split("-").pop().slice(0, 7) +
             "." +
             files.split(".").pop()}
         </Header>
       </Grid.Row>
       <Grid.Row>
         <Header as="h4" color="grey">
           {files.split(".").pop()} File
         </Header>
       </Grid.Row>
     </Grid.Column>
   </div>
 </a>
</div>
) : files.split(".").pop() === "mp3" ||
files.split(".").pop() === "mp4" ? (
<ReactPlayer
 key={index}
 width="300px"
 height="230px"
 controls={true}
 url={files}
/>
) : files.split(".").pop() === "png" ||
files.split(".").pop() === "jpg" ||
files.split(".").pop() === "jpeg" ||
files.split(".").pop() === "gif" ? (
<div>
 <Grid.Column width={3}>
   <a
     href={files}
     target="_blank"
     rel="noopener noreferrer"
   >
     <img
       src={files}
       alt={files.split("-").pop()}
       style={{
         margin: "10px",
         height: "100px",
         width: "100px",
       }}
     />
   </a>
 </Grid.Column>
 <Grid.Column width={3}>
   <Grid.Row>
     <Header as="h4" color="red">
       {files.split("-").pop().slice(0, 7) +
         "." +
         files.split(".").pop()}
     </Header>
   </Grid.Row>
   <Grid.Row>
     <Header as="h4" color="grey">
       {files.split(".").pop()} File
     </Header>
   </Grid.Row>
 </Grid.Column>
</div>
) : (
<a href={files} target="_blank" rel="noopener noreferrer">
 <div>
   <Grid.Column width={3}>
     <img
      style={{
        margin: "10px",
        height: "100px",
        width: "100px",
      }}
       src={
         process.env.PUBLIC_URL +
         "/files-type/" +
         "noFile.png"
       }
       alt={files.split("-").pop()}
     />
   </Grid.Column>
   <Grid.Column width={3}>
     <Grid.Row>
       <Header as="h4" color="red">
         {files.split("-").pop().slice(0, 7) +
           "." +
           files.split(".").pop()}
       </Header>
     </Grid.Row>
     <Grid.Row>
       <Header as="h4" color="grey">
         {files.split(".").pop()} File
       </Header>
     </Grid.Row>
   </Grid.Column>
 </div>
</a>
)
)
    )}
        
       </Grid.Row>
     </Grid>
     <br />
     <br />
     </Grid.Column>
     <Grid.Column width={4}>
     <Card>
      <Card.Content>
       
        <Card.Header>Your Task</Card.Header> 
        
        <Card.Description>
          {state.taskStatus ==="remis" ? (<>
            <Message positive>
    <Message.Header>Task Added Succesfully</Message.Header>
    
  </Message>
          </>) : (<>         <Message
    header='Upload Your File Here '
    content='Good Luck For your assignment'
  /></> )}
  
        </Card.Description>
        <br/>
       <ModalTask/>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'
          onClick={()=>submitTask()}
          >
            Rendre Task
          </Button>
          
       
        </div>
      </Card.Content>
    </Card>
     </Grid.Column>
     </Grid.Row>
        </Grid>
 
   </Grid.Column>





   <Grid.Column width={1}>
  
   </Grid.Column>
   
 </Grid.Row>

</Grid>

            )}
      
        </div>
    )
}
