/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-bootstrap-modal';
import PropTypes from 'prop-types';

class LoadModalCom extends React.Component {
  static propTypes = {
    uploading: PropTypes.bool,
  };

  static defaultProps = {
    uploading: false,
  };

  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(prevProps) {
    // Hologram is uploading, show message to user
    if (prevProps.uploading === true) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="loading-screen">
        <Modal show={this.state.open} onHide={() => this.onCloseModal()} aria-labelledby="message">
          <Modal.Body id="message">
            <div className="loader" />
            <div>
              Images uploading, please wait.....
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default LoadModalCom;
