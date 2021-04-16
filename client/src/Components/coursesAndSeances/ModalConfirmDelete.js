import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Feed, Icon, Modal } from "semantic-ui-react";
import { DeleteSeance } from "../../redux/slices/Seance";

function ModalConfirmDelete(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);

  const handleSubmit = (e) => {
    let params = e.target.getAttribute("seanceid");

    dispatch(DeleteSeance(params))
      .then((response) => {
        handleClose();
        //props.onSeanceDeleted(response.data.result);
        //this.props.socket.emit("delete", response.data.result);
      })
      .catch((err) => {
        handleClose();
        throw err;
      });
  };
  return (
    <>
      <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="delete" text="Delete" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete{" "}
            <strong>{props.seance.titre}</strong>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={handleSubmit}
            seanceid={props.seance._id}
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

export default ModalConfirmDelete;
