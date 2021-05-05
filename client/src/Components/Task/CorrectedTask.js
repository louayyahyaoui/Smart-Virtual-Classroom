import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, Feed, Header, Icon, Image, Input, Label, List, Segment } from 'semantic-ui-react'
import { assignGradeToStudent } from '../../redux/slices/Grade'
import { getCorrectedTask, getDetailTask } from '../../redux/slices/Task'

export default function CorrectedTask(props) {
const zero = 0;
  const dispatch = useDispatch();

  const assignGrade = (id) => {
    
    dispatch(assignGradeToStudent({ _id: id, grade:null })).then(() => {
      dispatch(getDetailTask(id));
    });
  };

    return (
        <div>
             <Card.Group>
             { !props.correctTasks ? (<div></div>)  : (
             props.correctTasks.map((task,index) =>
               
            task.grade!=null ? ( 
    <Card key={index} color='grey' raised>
 
     

      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={task.student.picture}
        />
        <Card.Header>
        <strong>{task.student.name}</strong>
        </Card.Header>
       
        <Card.Meta >
            <strong>{task.taskStatus}</strong> <br/>
        
    </Card.Meta>
        <Card.Description>
        { task.task.typeTask === "File" ?  (<>
          <Feed.Extra images style={{ display: "flex" }}>
                        <List horizontal>
                          {task.listReponse.map((file, index) => (
                            <List.Item key={index}>
                            {(() => {
                              switch (file.toString().split(".").pop()) {
                                case "pdf":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                    target="_blank"
                                    >
                                      {" "}
                                      <Icon name="file pdf" color="red" size="huge" />
                                    </a>
                                  );
                                case "docx":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon name="file word" color="blue" size="huge" />
                                    </a>
                                  );
                                case "pptx":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon
                                        name="file powerpoint"
                                        color="red"
                                        size="huge"
                                      />
                                    </a>
                                  );
                                case "xlsx":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon
                                        name="file excel outline"
                                        color="green"
                                        size="huge"
                                      />
                                    </a>
                                  );
                                case "zip":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon name="zip" size="huge" />
                                    </a>
                                  );
                                case "js":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon name="js" color="yellow" size="huge" />
                                    </a>
                                  );
                                case "php":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon name="zip" color="blue" size="huge" />
                                    </a>
                                  );
                                case "txt":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
                                      <Icon name="file text" size="huge" color="blue" />
                                    </a>
                                  );
          
                                case "jpg":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
          
                                    <img
                                      style={{
                                        minWidth: "50px",
                                        width: "50px",
                                        height: "50px",
                                      }}
                                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      alt={`scan`}
                                    />
                                    </a>
                                  );
                                case "jpeg":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`} target="_blank">
          
                                    <img
                                      style={{
                                        minWidth: "50px",
                                        width: "50px",
                                        height: "50px",
                                      }}
                                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      alt={`scan`}
                                    />
                                    </a>
                                  );
                                case "png":
                                  return (
                                    <a href={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}target="_blank">
          
                                    <img
                                      style={{
                                        minWidth: "50px",
                                        width: "50px",
                                        height: "50px",
                                      }}
                                      src={`https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/${file}?alt=media`}
                                      alt={`scan`}
                                    />
                                    </a>
                                  );
          
                                default:
                                  return <Icon name="File" color="Black" size="huge" />;
                              }
                            })()}
          
                            <p>{file.toString().split("_").pop()}</p>
                          </List.Item>
                          ))}
                        </List>
                      </Feed.Extra>
        
                      <Label   color="red" icon>
        <Icon name='clipboard check' />
                              <Label.Detail>{task.grade}</Label.Detail>
        
       
      </Label> <Button color="red" size='mini' floated onClick={() => assignGrade(task._id)}>
                    Cancel
                  </Button>
        </>) : (<> <h5>Quiz</h5>  <br/>   <Label   color="red" icon>
        <Icon name='clipboard check' />
                              <Label.Detail>{task.grade}</Label.Detail>
        
       
      </Label> </>)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
    
    
      <Link to={ task.task.typeTask === "File" ? "/TaskFileDetail/"+task._id :  "/TaskQuizDetail/"+task._id }>
            <Button inverted fluid color="red" content="View Detail"/>
            </Link>
      </Card.Content>
      
    </Card>
             ) : (
             
             <></>
             
             )))}
  </Card.Group>
        </div>
    )
}
