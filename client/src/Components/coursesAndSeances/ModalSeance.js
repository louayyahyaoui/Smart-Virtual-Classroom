import React from "react";
import { Dropdown, Feed, Icon, Modal } from "semantic-ui-react";
import FormSeance from "./FormSeance";

function ModalSeance(props) {
  return (
    <>
      <Modal
        trigger={
          <Dropdown.Item icon={props.icon} text={props.buttonTriggerTitle} />
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormSeance
            buttonSubmitTitle={props.buttonSubmitTitle}
            buttonColor={props.buttonColor}
            seanceId={props.seanceId}
            onSeanceAdded={props.onSeanceAdded}
            onSeanceUpdated={props.onSeanceUpdated}
            server={props.server}
            socket={props.socket}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalSeance;
