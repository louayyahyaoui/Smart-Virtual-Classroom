import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Form, Message } from 'semantic-ui-react';
import { getTaskByTeacher, taskSlice, updateTask } from '../../redux/slices/Task';
import FileUploadEdit from '../../utlis/FileUploadEdit';
import * as Yup from "yup";
import { useFormik } from "formik";
export default function FormTask({task}) {

  const [Images, setImages] = useState([]);
  const [enableUpload, setEnableUpload] = useState(false);

  const [up, setUp] = useState(0);

  const updateImages = (newImages) => {
    if (newImages === null) {
      task.listQuestion.forEach((element) => {
        setImages(element);
      });
    } else {
      setImages(Images.concat(newImages));
    }
  };
    const [taskEdit , setTaskEdit] = useState(task);
    

    const  dispatch = useDispatch();
   
   /* const handleUpdate = (e) =>{
        e.preventDefault();
      //  setTaskEdit(taskEdit.listQuestion = Images)
        setEnableUpload(true)
       console.log(Images);
        console.log(taskEdit.listQuestion);
        dispatch(updateTask(taskEdit)).then(()=>{
            dispatch(getTaskByTeacher({"idUser":taskEdit.creator,"idClass":taskEdit.cour}))
        });
    }*/
    const formik = useFormik({
      initialValues: {
        _id : task._id,
        title: task.title,
        description: task.description,
        theme: task.theme,
        cour : task.cour,
        typeTask: task.typeTask,
        listQuestion: [],
        listStudents: task.listStudents,
        endDate: task.endDate,
        creator: task.creator,

      },
  
  
      onSubmit: async (values) => {
       
        try {
          console.log("cc");
          console.log(Images);
          if(Images.length !==0 )
         { values.listQuestion = Images;
          alert("images : here : "+values.listQuestion);
        }
        else{
          values.listQuestion = task.listQuestion;
        }
        setEnableUpload(true)
        console.log(values);
        const res = await dispatch(updateTask(values)).then(()=>{
          dispatch(getTaskByTeacher({"idUser":task.creator,"idClass":task.cour}))
      });
        } catch (error) {
          alert(error);
        }
      },
    });
    return (
        <div>
             <Form  onSubmit={formik.handleSubmit}>
        <Form.Input
          label="Titre"
          type="text"
          
          name="title"
          maxLength="40"
          
          required
      
          onChange={
            formik.handleChange}
            value={formik.values.title}
        />
        <Form.TextArea
          label="Description"
          type="TextArea"
       
          name="description"
         
        
          onChange={
            formik.handleChange}
            value={formik.values.description}
        />
         
                 
          
            <Button type="submit" color="green" floated="right">
          Save
        </Button>
        <FileUploadEdit
          refreshFunction={updateImages}
            listfile={task.listQuestion}  
           // Enbale={enableUpload}
          />
           </Form>
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
      
        <br /> {/* Yikes! Deal with Semantic UI React! */}
     
        </div>
    )
}
