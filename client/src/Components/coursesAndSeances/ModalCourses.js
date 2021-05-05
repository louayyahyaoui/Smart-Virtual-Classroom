import React from "react";
import { Dropdown, Feed, Icon, Modal } from "semantic-ui-react";
import FormCourses from "./FormCourses";

function ModalCourses(props) {
  return (
    <>
      <Modal
        trigger={<Dropdown.Item icon="file text" text="Add courses" />}
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormCourses
            buttonSubmitTitle={props.buttonSubmitTitle}
            buttonColor={props.buttonColor}
            coursesId={props.coursesId}
            onCoursesAdded={props.onCoursesAdded}
            onCoursesUpdated={props.onCoursesUpdated}
            server={props.server}
            //socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalCourses;
