import React from "react";
import { Feed, Icon, Modal } from "semantic-ui-react";
import FormCoursesEdit from "./FormCoursesEdit";

function ModalCoursesEdit(props) {
  return (
    <div>
      <Modal
        trigger={
          <Feed.Like>
            <Icon name={props.icon} /> {props.buttonTriggerTitle}
          </Feed.Like>
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormCoursesEdit
            buttonSubmitTitle={props.buttonSubmitTitle}
            buttonColor={props.buttonColor}
            coursesId={props.coursesId}
            //onCoursesAdded={this.props.onCoursesAdded}
            onCoursesUpdated={props.onCoursesUpdated}
            server={props.server}
            //socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
}
export default ModalCoursesEdit;
