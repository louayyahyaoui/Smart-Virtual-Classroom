import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Divider, Grid, Header, Icon, Image, Message, Segment, Table } from 'semantic-ui-react';
import { getDetailByTaskByStudent } from '../../redux/slices/Grade';

export default function EndQuiz() {

const task = useSelector((state) => state.grades.grade)

    const  dispatch = useDispatch();
   
  useEffect(() => {

    //  dispatch(getDetailByTaskByStudent("60838f24aa6cf03c78b27b19"))
    
    },[] );
 
    return (
        <>
         
             
            <Segment basic textAlign='center'>
        
       
        
          <Image centered src={process.env.PUBLIC_URL + "/Certification.png"} />
    
    
    <p>
      Congrats {task[0].student.name} you have ben passed the Quiz.
    </p>
    
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
        Reponse
      </Header>
    </Divider>
    <Grid columns="three">
        <Grid.Row>
          
            {task[0].task.listQuestion.map((quiz, index) => (
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
                      negative={ quiz.foptionA !==  quiz.correct_answer &&  quiz.foptionA === task[0].listReponse[index]}
                    >
                      <Table.Cell>
                        {(     quiz.foptionA === task[0].listReponse[index] && quiz.foptionA === quiz.correct_answer  ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }

                {(     quiz.foptionA === task[0].listReponse[index] && quiz.foptionA !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                      
                        {quiz.foptionA}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                                   positive={quiz.foptionB === quiz.correct_answer  }
                                   negative={quiz.foptionB !==  quiz.correct_answer &&  quiz.foptionB === task[0].listReponse[index]}
                                  
                    >
                      <Table.Cell> 
                      {(   quiz.foptionB === task[0].listReponse[index] && quiz.foptionB === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }

{(     quiz.foptionB === task[0].listReponse[index] && quiz.foptionB !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                        {quiz.foptionB}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row
                                  positive={quiz.foptionC === quiz.correct_answer  }
                                  negative={quiz.foptionC !==  quiz.correct_answer &&  quiz.foptionC === task[0].listReponse[index]}
                    >
                      <Table.Cell> 
                      {(  quiz.foptionC === task[0].listReponse[index] &&  quiz.foptionC === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {(     quiz.foptionC === task[0].listReponse[index] && quiz.foptionC !== quiz.correct_answer  ) ?
                          (<Icon name="close" color="red" />): <></>
                      }
                      
                        {quiz.foptionC}</Table.Cell>
                    </Table.Row>
                    <Table.Row
                                positive={quiz.foptionD === quiz.correct_answer  }
                                negative={quiz.foptionD !==  quiz.correct_answer &&  quiz.foptionD === task[0].listReponse[index]}
                    >
                      <Table.Cell> 
                      {(    quiz.foptionD === task[0].listReponse[index] && quiz.foptionD === quiz.correct_answer ) ?
                          (<Icon name="check circle" color="green" />): <></>
                      }
                        {(     quiz.foptionD === task[0].listReponse[index] && quiz.foptionD !== quiz.correct_answer  ) ?
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
