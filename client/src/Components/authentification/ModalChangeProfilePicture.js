import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dimmer,
  Header,
  Image,
  Loader,
  Modal,
} from "semantic-ui-react";
import { isAuth, setLocalStorage } from "../../helpers/auth";

import { UpdateProfilePicture, UpdateUserState } from "../../redux/slices/User";

function ModalChangeProfilePicture(props) {
 
  const Resources = useSelector((state) => state.user.Resources);
  const [loader, SetLoader] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const dispatch = useDispatch();

  const updatePicture = () => {
    var formData = new FormData();
    SetLoader(true);
    formData.append("multiple_resources", picture);

    dispatch(UpdateProfilePicture(formData)).then((response) => {

console.log(response);
      axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/updateProfile/${
          isAuth()._id
        }`,
        {
          name: props.name,
          bio: props.bio,
          linkedInUrl: props.linkedIn,
          GithubUrl: props.github,
          picture: response.Resources,
          sexe: props.sexe,
          address: props.address,
          cv: props.cv,
          birthday: props.birthday,
        }
      )
      .then((res) => {
       
       // SetLoader(false);
        dispatch(UpdateUserState());
        setLocalStorage("user", res.data.result);
        //setFormSuccessMessage("Your profile was updated successfully !");
       // SetFormClassName("success");
  
      })
      .catch((err) => {
      //  setFormSuccessMessage("Something went wrong !!");
       // SetFormClassName("warning");
      });
      SetLoader(false);
      setOpen(false);
    });
  };
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "done") {
      setPicture(file);
    }
    if (status === "removed") {
      console.log(status, meta, file);
    }
  };

  console.log(props.name);
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Image
            circular
            fluid
            size="small"


            label={{
              as: "a",
              color: "red",
              content: "Edit",
              icon: "edit",
              ribbon: true,
            }}
            src={Resources}
          />
        }
      >
        <Modal.Header>Select a Photo</Modal.Header>

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
              accept="image/*"
              inputContent={(files, extra) =>
                extra.reject ? "Image files only" : "Drag Files"
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
            onClick={updatePicture}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalChangeProfilePicture;
