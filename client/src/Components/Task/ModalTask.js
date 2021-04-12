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
import { isAuth } from "../../helpers/auth";
import { DeleteResources, UpdateResources, uploadFile } from "../../redux/slices/Task";
import { UpdateProfilePicture } from "../../redux/slices/User";

export default function ModalTask(props) {
  const Resources = useSelector((state) => state.tasks.files);

  const [open, setOpen] = React.useState(false);
  const [picture, setPicture] = React.useState([]);
  const dispatch = useDispatch();

  const closeModel = () => {
  
   
   
    setOpen(false);
  };
  const handleChangeStatus = async ({ meta, file }, status) => {
    console.log(status, meta, file);

if(status === "done") {
//setPicture(picture.concat(file))
var formData = new FormData();

formData.append("listQuestion", file);

  
      dispatch(uploadFile(formData));
  
       
       console.log(file);
 
      }
      
  };

  const handleRemoveUpload = (e, res) => {
   

    console.log(res);
    dispatch(DeleteResources(res));
    console.log("Trigger remove photo");
    console.log(Resources);
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
            
            <Dropzone
          inputContent="Drop Files here or click to choose ..."
          onChangeStatus={handleChangeStatus}
          canCancel={false}
          canRemove={false}
          canRestart={false}
          PreviewComponent={Preview}
        />
  <Grid>
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
              <List divided verticalAlign="middle">

                {Resources.map((files, index) => (
                  <List.Item>
                    <List.Content floated="right">
                      <Button
                        circular
                        size="small"
                        color="red"
                        icon="trash"
                        onClick={(e) => {
                          handleRemoveUpload(e, files[0]);
                        }}
                      ></Button>
                    </List.Content>
                    {files[0].split(".").pop() === "png" ||
                    files[0].split(".").pop() === "jpg" ||
                    files[0].split(".").pop() === "jpeg" ||
                    files[0].split(".").pop() === "gif" ? (
                      <Image src={files[0]} rounded size="mini" />
                    ) : files[0].split(".").pop() === "pdf" ||
                    files[0].split(".").pop() === "docx" ||
                    files[0].split(".").pop() === "pptx" ||
                    files[0].split(".").pop() === "mp4" ||
                    files[0].split(".").pop() === "mp3" ? (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL +
                          "/files-type/" +
                          files[0].split(".").pop() +
                          ".png"
                        }
                      />
                    ) : (
                      <Image
                        rounded
                        size="mini"
                        src={
                          process.env.PUBLIC_URL + "/files-type/" + "noFile.png"
                        }
                      />
                    )}

                    <List.Content>
                      <Header as="h4" color="red">
                        {files[0].split(".").pop()}
                      </Header>
                      <highlight>
                        <strong>{files[0].split("-").pop()}</strong>
                      </highlight>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
        </Grid>
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
        </Modal.Actions>
      </Modal>
   
      


    </div>
  );
}


