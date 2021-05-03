import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Divider, Grid, Header, Icon, Image, Message, Segment, Table } from 'semantic-ui-react';
import { getDetailByTaskByStudent } from '../../redux/slices/Grade';

export default function EndQuiz() {
let pts = 0;
const task = useSelector((state) => state.grades.grades);
const [finalTask , setFinalTask] = useState(task);
const { id } = useParams();
    const  dispatch = useDispatch();
    console.log();
    finalTask[0].task.listQuestion.forEach((element) => {
       pts+=  parseInt(element.fpoint);
    });
   
  useEffect(() => {
      console.log(finalTask[0]);
    dispatch(getDetailByTaskByStudent(id)).then((response)=>{
     
      console.log(response);
      setFinalTask(response.payload);
          });
    
    },[] );
 
    return (
        <>
         
             
            <Segment basic textAlign='center'>
        
       
        
        
    
    { (finalTask[0].grade * 100 / pts) > 70 ? (<>
  <Image centered src={process.env.PUBLIC_URL + "/Certification.png"} />
<p>
Congrats {finalTask[0].student.name} you have ben passed the Quiz  {finalTask[0].grade} / {pts} points.
</p>
</>
    ) : (
      <>
      <Image centered src={process.env.PUBLIC_URL + "/failedQuiz.jpg"} />
      <p>
      Sorry {finalTask[0].student.name} next Time .  {finalTask[0].grade} / {pts} points.
    </p>
    </>

    ) }
   
    
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Answers
      </Header>
    </Divider>
    <Grid columns="three">
        <Grid.Row>
          
            {finalTask[0].task.listQuestion.map((quiz, index) => (
    <Grid.Column>
                <Table key={index} color="red" textAlign="center">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {quiz.fquestion + "?"}{" "}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row
                      positive={quiz.foptionA === quiz.correct_answer  }
                      negative={ quiz.foptionA !==  quiz.correct_answer &&  quiz.foptionA === finalTask[0].listReponse[index]}
                    >
                      <Table.Cell>
                        {(     quiz.foptionA === finalTask[0].listReponse[index] && quiz.foptionA === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }

                {(     quiz.foptionA === finalTask[0].listReponse[index] && quiz.foptionA !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                      
                        {quiz.foptionA}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                                   positive={quiz.foptionB === quiz.correct_answer  }
                                   negative={quiz.foptionB !==  quiz.correct_answer &&  quiz.foptionB === finalTask[0].listReponse[index]}
                                  
                    >
                      <Table.Cell> 
                      {(   quiz.foptionB === finalTask[0].listReponse[index] && quiz.foptionB === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }

{(     quiz.foptionB === finalTask[0].listReponse[index] && quiz.foptionB !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                        {quiz.foptionB}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                                  positive={quiz.foptionC === quiz.correct_answer  }
                                  negative={quiz.foptionC !==  quiz.correct_answer &&  quiz.foptionC === finalTask[0].listReponse[index]}
                    >
                      <Table.Cell> 
                      {(  quiz.foptionC === finalTask[0].listReponse[index] &&  quiz.foptionC === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {(     quiz.foptionC === finalTask[0].listReponse[index] && quiz.foptionC !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                        {quiz.foptionC}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                                positive={quiz.foptionD === quiz.correct_answer  }
                                negative={quiz.foptionD !==  quiz.correct_answer &&  quiz.foptionD === finalTask[0].listReponse[index]}
                    >
                      <Table.Cell> 
                      {(    quiz.foptionD === finalTask[0].listReponse[index] && quiz.foptionD === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {(     quiz.foptionD === finalTask[0].listReponse[index] && quiz.foptionD !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                        {quiz.foptionD}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Divider hidden />
              </Grid.Column>
             ) )}

             </Grid.Row>
             </Grid>
              </Segment>

         


  
    
    </>
  );

}
