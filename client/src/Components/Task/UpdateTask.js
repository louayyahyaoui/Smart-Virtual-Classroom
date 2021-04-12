import { Button } from '@material-ui/core'
import React from 'react'
import { updateTask } from '../../redux/slices/Task';
import {useDispatch} from 'react-redux';
export default function UpdateTask() {


    const dispatch = useDispatch();
    const task = {
    "_id" : "6058a3a0c6c53f47ec8e521b",
  
    "title" : "task1" ,
    "typeTask" : "Quiz" ,
 
     "description" :"saluuuuuuuuut sofieeeeeeeeeen"
}

    return (
        <div>
            <Button onClick={()=>dispatch(updateTask(task))}>Update</Button>
        </div>
    )
}
