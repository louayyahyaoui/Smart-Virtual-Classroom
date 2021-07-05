import axios from "axios";
import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Header,
  Modal,
  Loader,
  Segment,
} from "semantic-ui-react";
import { isAuth, setLocalStorage } from "../../helpers/auth";
import { getUserDataById, UpdateProfilePicture, UpdateUserState, UploadResume } from "../../redux/slices/User";

function ModalUploadCV(props) {
  const resume = useSelector((state) => state.user.resume);
  const Resources = useSelector((state) => state.user.Resources);
  const [loader, SetLoader] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [cv, setCV] = React.useState("");
  const dispatch = useDispatch();

  const uploadResume = () => {
    
  

    var formData = new FormData();
    SetLoader(true);
    formData.append("multiple_resources", cv);

    dispatch(UploadResume(formData)).then((response) => {

     
      SetLoader(false);
      setOpen(false);

      axios.put(
        `http://localhost:5000/api/user/updateProfile/${
          isAuth()._id
        }`,
        {
          name: props.name,
          bio: props.bio,
          linkedInUrl: props.linkedIn,
          GithubUrl: props.github,
          picture: Resources,
          sexe: props.sexe,
          address: props.address,
          cv: response.payload,
          birthday: props.birthday,
        }
      )
      .then((res) => {
       
       // SetLoader(false);
        dispatch(UpdateUserState());
        dispatch(getUserDataById(isAuth()._id));
        setLocalStorage("user", res.data.result);
        //setFormSuccessMessage("Your profile was updated successfully !");
       // SetFormClassName("success");
  
      })
      .catch((err) => {
      //  setFormSuccessMessage("Something went wrong !!");
       // SetFormClassName("warning");
      });

    });
 
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setCV(file);
    }
    if (status === "removed") {
      console.log(status, meta, file);
    }
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button attached="bottom" content="Upload your CV" />}
      >
        <Modal.Header>Select Your resume</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
            <br />
            <br />

            <br />
            <Dropzone
              styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
              canCancel={true}
              canRemove={true}
              canRestart={true}
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              accept="application/pdf"
              inputContent={(files, extra) =>
                extra.reject ? "PDF files only" : "Drag Files"
              }
              styles={{
                dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
                inputLabel: (files, extra) =>
                  extra.reject ? { color: "red" } : {},
              }}
            />
            <br />
            {loader ? (
              <Dimmer active>
                <Loader>Preparing Files ... please wait !</Loader>
              </Dimmer>
            ) : (
              <></>
            )}
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
            onClick={()=>uploadResume()}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalUploadCV;
