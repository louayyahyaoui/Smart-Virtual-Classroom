import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import {  fetchclass,fetchActiveClass,fetchclassArchived } from "../../redux/slices/classsline";
import { AddclassApi} from "../../api/api";
export default function ActivedClassComponent(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const documentData = JSON.parse(localStorage.getItem("user"));
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  const handleSubmit = async (e) => {
    let params = e.target.getAttribute("classid");
    let error = { visible: false, message: "" };
    try {
      await AddclassApi.updateClassArchive(params);
      dispatch(fetchclass(documentData.role, documentData._id,"Active"));
      dispatch(fetchclassArchived(documentData.role, documentData._id,"Archive"));
      dispatch(fetchActiveClass(documentData._id));
      handleClose();
    } catch (err) {
      error = {
        visible: true,
        message: JSON.stringify(err.errors, null, 2),
      };
    }
  };
  return (
    <>
      <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="sync alternate" text="Active" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to set this as an active class again named{" "}
            <strong>{props.classes.className}</strong> ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={handleSubmit}
            classid={props.classes._id}
            color="red"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="black">
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
