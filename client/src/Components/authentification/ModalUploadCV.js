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
import { UpdateProfilePicture, UploadResume } from "../../redux/slices/User";

function ModalUploadCV() {
  const resume = useSelector((state) => state.user.resume);
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
            onClick={uploadResume}
            color="red"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ModalUploadCV;
