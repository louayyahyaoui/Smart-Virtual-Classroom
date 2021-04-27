import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Form, Message } from 'semantic-ui-react';
import { getTaskByTeacher, taskSlice, updateTask } from '../../redux/slices/Task';

export default function FormTask(props) {

    const [taskEdit , setTaskEdit] = useState(props.task)
    const  dispatch = useDispatch();
   
    const handleUpdate = (e) =>{
        e.preventDefault();
        dispatch(updateTask(taskEdit)).then(()=>{
            dispatch(getTaskByTeacher({"idUser":taskEdit.creator,"idClass":taskEdit.cour}))
        });
    }
   
    return (
        <div>
             <Form  onSubmit={handleUpdate}>
        <Form.Input
          label="Titre"
          type="text"
        
          name="Titre"
          maxLength="40"
          
          required
          value={taskEdit.title}
          onChange={(e) =>
            setTaskEdit({ ...taskEdit, title: e.target.value })
          }
        />
        <Form.TextArea
          label="Description"
          type="TextArea"
       
          name="Description"
          maxLength="5000"
          required
          value={taskEdit.description}
          onChange={(e) =>
            setTaskEdit({ ...taskEdit, description: e.target.value })
          }
        />
           <SemanticDatepicker
                    onChange={(e, data) =>
                        setTaskEdit({ ...taskEdit, endDate: data.value })
                    }
                    format={"YYYY-MM-DD"}
                    value={taskEdit.endDate|Date}
                   // value={taskEdit.endDate.format("YYYY-MM-DD")}
                  />
        <Message
          success
          color="green"
          header="Nice one! 📒 📕 📚 📖"
            
        />
        <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
        
        />
        <Button color="green" floated="right">
          Save
        </Button>
        <br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
        </div>
    )
}
