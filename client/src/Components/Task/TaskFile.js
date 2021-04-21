import React, {useState} from 'react'
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { Button, Divider } from 'semantic-ui-react';
import axios from "axios"
import { addUploadFile } from '../../redux/slices/Task';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch()
    const [multiple_resources, SetMultiple_resources] = useState([]);
    const handleChangeStatus = ({ meta, file }, status) => {
      //console.log(status, meta, file);
  
      if (status === "done") {

          SetMultiple_resources(multiple_resources.concat(file));
      }
      if (status === "removed") {
          let multiple_resource = multiple_resources.slice();
          multiple_resource = multiple_resources.filter((u) => {
            return u !== file;
          });
          SetMultiple_resources(multiple_resource);
      }
    };
    var step=2;
    const testUpload = () => {  
  dispatch(addUploadFile(multiple_resources)).then((res)=>{
     // console.log(res.payload);
      props.addTask(tasks.listQuestion = res.payload);
      props.addTask(tasks);
     //console.log(tasks)
  
})
  //console.log(tasks)
  props.nextStep(step+1);
      }
    
      const event = ()=>{
        
        //props.addTask(tasks.listQuestion = inputFields);
       // props.addTask(tasks);
      
      }
    return (
        <div>
           <Dropzone
          styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
          canCancel={true}
          canRemove={true}
          canRestart={true}
          onChangeStatus={handleChangeStatus}
        />
         <Divider hidden></Divider>
  <Button
      
            color="red"
              type="submit" 
              floated='right'
              onClick={testUpload}
             >Next</Button>
        </div>
    )
}
