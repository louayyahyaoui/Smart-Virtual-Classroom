import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Feed,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Modal,
} from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FileUploadEdit from "../../utlis/FileUploadEdit";
import { isAuth } from "../../helpers/auth";
import {  getDetailByTaskByStudent, rendreTask } from "../../redux/slices/Grade";
import { UpdateProfilePicture } from "../../redux/slices/User";
import FileUpload from "../../utlis/FileUpload";

export default function ModalTask({task}) {
  

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [Images, setImages] = useState([]);
  const [enableUpload, setEnableUpload] = useState(false);

  

  const updateImages = (newImages) => {
    if (newImages === null) {
      task.listReponse.forEach((element) => {
        setImages(element);
        
      });
    } else {
      setImages(Images.concat(newImages));
    }
  };

    


    const formik = useFormik({
      initialValues: {
        _id : task._id,
        grade: task.grade,
        taskStatus: "Remis",
      student : task.student,
       task: task.task,
        listReponse: [],
      

      },
  
  
      onSubmit: async (values) => {
       
        try {
          console.log("cc");
          console.log(Images);
          if(Images.length !==0 )
         { values.listReponse = Images;
          
        }
        else{
          values.listReponse = task.listReponse;
        }
        setEnableUpload(true)
        console.log(values);
        const res = await dispatch(rendreTask(values)).then(()=>{

          dispatch(getDetailByTaskByStudent(task._id));

          setEnableUpload(false)
        });
        } catch (error) {
          alert(error);
        }
      },
    });
  const closeModel = () => {
  
    dispatch(getDetailByTaskByStudent(task._id));
   
    setOpen(false);
  };



  return (
    <div>
     

    
<Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="tiny"
        trigger={
          <div className='ui two buttons'>
          <Button  color="red" fluid floated
          icon="cloud upload"
          >
            <Icon name="cloud upload"></Icon>
              { task.taskStatus === "Remis" ? ( <> update Task </>) : ( <> Rendre Task </> ) }
            </Button>
            </div>
         
        }
      >
        <Modal.Header>Upload Your File Here </Modal.Header>
        <Modal.Content>
          <Modal.Description>
          <Form  onSubmit={formik.handleSubmit}>
         
        { task.taskStatus ==="Remis"  ? ( 
    <FileUploadEdit
    refreshFunction={updateImages}
    listfile={ task.listReponse}  
    Enbale={enableUpload}
  />

        ) : (

          <FileUpload
          refreshFunction={updateImages}
          listfile={ null}  
          Enbale={enableUpload}
        />
        )}
         <Button type="submit" color="red" floated="right"   icon="checkmark">
          rendre Task
        </Button>
</Form>
          </Modal.Description>
        </Modal.Content>
        <br/>
        <br/>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Back To Task
          </Button>
        
             <br></br>
        
        </Modal.Actions>
     
      </Modal>
   
      


    </div>
  );
}


