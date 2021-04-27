import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Header, Icon, Image, Input, Label, Segment } from 'semantic-ui-react'
import { getCorrectedTask, getDetailTask } from '../../redux/slices/Task'

export default function CorrectedTask(props) {



    return (
        <div>
             <Card.Group>
             { !props.correctTasks ? (<div></div>)  : (
             props.correctTasks.map((task,index) =>
            task.grade!=null ? (
    <Card key={index} color='red' raised>
 
     

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
            <strong>{task.taskStatus}</strong>
            
    
    </Card.Meta>
        <Card.Description>
       <strong>File </strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
    
      <Label color="red">
        {task.grade}
     
      </Label>
      
      </Card.Content>
    </Card>
             ) : (
             
             <>Vide</>
             
             )))}
  </Card.Group>
        </div>
    )
}
