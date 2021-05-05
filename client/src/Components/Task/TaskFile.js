import React, {useState} from 'react'
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { Button, Divider } from 'semantic-ui-react';
import axios from "axios"
import { addUploadFile, uploadFile } from '../../redux/slices/Task';
import { useDispatch } from 'react-redux';
import FileUpload from '../../utlis/FileUpload';

export default function TaskFile(props) {

    const [tasks , setTask] = useState({
           
        title : props.data.title,
        description : props.data.description,
        theme : props.data.theme,
        typeTask : props.data.typeTask,
        listQuestion : props.data.listQuestion,
        listStudents : props.data.listStudents,
        endDate : props.data.endDate,
        creator : props.data.creator
     
    });

    const [Images, setImages] = useState(props.data.listQuestion);

    const [enableUpload, setEnableUpload] = useState(false);
   
  const updateImages = (newImages) => {
  
    setImages(newImages);
    
   
  };
  
    var step=2;
    const onclicNext = () => {  
     
     
      props.addTask(tasks.listQuestion = Images);
      props.addTask(tasks);
      
 
        props.nextStep(step+1);
        setEnableUpload(true);
        console.log(enableUpload);

      }
 
    return (
        <div>
          <div>       
              <FileUpload refreshFunction={updateImages} listfile={null} Enbale={enableUpload}/>
          </div>
 
         <Divider hidden></Divider>
  <Button
      
            color="red"
              type="submit" 
              floated='right'
              onClick={()=>onclicNext()}
             >Next</Button>
        </div>
    )
}
