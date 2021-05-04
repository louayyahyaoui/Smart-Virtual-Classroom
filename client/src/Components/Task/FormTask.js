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

  const [Images, setImages] = useState(task.listQuestion);
  let listFile;
  const [enableUpload, setEnableUpload] = useState(false);
  const [successMessage, SetSuccessMessage] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const [up, setUp] = useState(0);

  const updateImages = (newImages) => {
 

    setImages(newImages);


  };

    const [taskEdit , setTaskEdit] = useState(task);
    

    const  dispatch = useDispatch();
   
 
    const d = new Date(task.endDate,);
    const initialDateValue = d;
    const formik = useFormik({
      initialValues: {
        _id : task._id,
        title: task.title,
        description: task.description,
        theme: task.theme,
        cour : task.cour,
        typeTask: task.typeTask,
        listQuestion:Images,
        listStudents: task.listStudents,
        endDate: initialDateValue,
        creator: task.creator,

      },
  
  
      onSubmit: async (values) => {
       
        try {
         
          setEnableUpload(true);
            values.listQuestion = Images;
         
           
  
        
        console.log(values);
        const res = await dispatch(updateTask(values)).then(()=>{
          dispatch(getTaskByTeacher({"idUser":task.creator,"idClass":task.cour}));
          SetSuccessMessage("Update Task successfully !")
      });
        } catch (error) {
          SetErrorMessage("Semothing Wrrong Check Your Data Please  !")
          alert(error);
        }
      },
    });
    return (
        <div>
          { successMessage ? ( <Message
          success
          color="green"
          header="Nice one! 📒 📕 📚 📖"
            content={successMessage}
        />) : (<></>)}
       
       {errorMessage ? (
          <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
          content={errorMessage}
        
        />
       ) : (<></>)}
       
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
       required
          name="description"
         
        
          onChange={
            formik.handleChange}
            value={formik.values.description}
        />
             <Form.Field>
                  <label>Due</label>
                  <SemanticDatepicker
                  required
                   value={formik.values.endDate}
                   onChange={(e, data) =>
                    (formik.values.endDate= data.value )
                  }
                  />
                </Form.Field>
                 
          { task.typeTask === "File" ? (  <FileUploadEdit
          refreshFunction={updateImages}
            listfile={task.listQuestion}  
            Enbale={enableUpload}
          />)  :  (<></>)}
       
      
          <br/>
               <Button type="submit" color="red" disabled={formik.values.title ==="" || formik.values.description=== "" || formik.values.endDate===null }
               content="Update Task"  floated="right"  icon="checkmark" / >
        
           </Form>
       
           <br/>
        <br/>
    
        <br /> {/* Yikes! Deal with Semantic UI React! */}
     
        </div>
    )
}
