import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Header, Icon, Image, Message, Segment } from 'semantic-ui-react';
import { getDetailByTaskByStudent } from '../../redux/slices/Grade';

export default function EndQuiz() {
const {id} = useParams()
const task = useSelector((state) => state.grades.grades)
    const  dispatch = useDispatch();
    useEffect(() => {
      dispatch(getDetailByTaskByStudent(id))
    
    }, [id])
    console.log(task);
    return (
        <div>
          { !task ? (<></>) : ( <>
          
          <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content>Result</Header.Content>
    </Header>
    <Segment.Group horizontal>
    <Segment></Segment>
    <Segment circular centred> <Header as='h2'>
        {task[0].student.name}
        <Header.Subheader>{task[0].grade}</Header.Subheader>
      </Header></Segment>
    <Segment></Segment>
  </Segment.Group>
          </> )}


  
    
    </div>
  );

}
