import axios from "axios";
import React from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Modal,
} from "semantic-ui-react";
import FileUploadEdit from "../../utlis/FileUploadEdit";
import { isAuth } from "../../helpers/auth";
import { DeleteResources, UpdateResources, uploadFile } from "../../redux/slices/Task";
import { UpdateProfilePicture } from "../../redux/slices/User";

export default function ModalTask(props) {
  const Resources = useSelector((state) => state.tasks.files);

  const [open, setOpen] = React.useState(false);
  const [picture, setPicture] = React.useState([]);
  const dispatch = useDispatch();

 /* const updateImages = (newImages) => {
    if (newImages === null) {
      qes.Filee.forEach((element) => {
        setImages(element);
      });
    } else {
      alert("hi")
      setUp(1);
      setImages(newImages);
    }
  };*/
  const closeModel = () => {
  
   
   
    setOpen(false);
  };
  const handleChangeStatus = async ({ meta, file }, status) => {
   // console.log(status, meta, file);

if(status === "done") {
//setPicture(picture.concat(file))
var formData = new FormData();

formData.append("listQuestion", file);

  
      dispatch(uploadFile(formData));
  
       
     //  console.log(file);
 
      }
      
  };

  const handleRemoveUpload = (e, res) => {
   

   // console.log(res);
    dispatch(DeleteResources(res));
  //  console.log("Trigger remove photo");
    //console.log(Resources);
  };

  const Preview = ({ meta }) => {
    const { name, percent, status } = meta;
    return <span></span>;
  };


  return (
    <div>
     

    
<Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <div className='ui two buttons'>
          <Button 
          icon="cloud upload"
          >
            <Icon name="cloud upload"></Icon>
              upload File
            </Button>
            </div>
         
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            
          <FileUploadEdit
          //  refreshFunction={updateImages}
           // listfile={qes.Filee}  
          />

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <Button
            content="Yep, Save"
            labelPosition="right"
            icon="checkmark"
            onClick={closeModel}
            color="red"
          />
             <br></br>
        
        </Modal.Actions>
     
      </Modal>
   
      


    </div>
  );
}


