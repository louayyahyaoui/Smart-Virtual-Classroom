/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-bootstrap-modal';
import PropTypes from 'prop-types';
import CropperCom from './Cropper';
import CropperIcon from '../images/crop.png';

class ModalCom extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    cropperConfig: PropTypes.object,
    removeFile: PropTypes.func,
    cropperUpdate: PropTypes.func,
  };

  static defaultProps = {
    file: {},
    cropperConfig: {},
    removeFile: () => {},
    cropperUpdate: () => {},
  };

  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      modalLittle: true,
      open: false,
      isHover: false,
    };
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  handleClick() {
    this.props.removeFile(this.props.file);
  }

  handleMouseHover() {
    this.setState({ isHover: !this.state.isHover });
  }

  render() {
    return (
      <div className="dropzone-image">
        <div tabIndex="-1" role="button" className="remove-icon" onClick={() => this.handleClick()} >
          <div className="remove-text">✖</div>
        </div>
        <div
          tabIndex="0"
          role="button"
          className="image-wrapper"
          onClick={this.onOpenModal}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {this.state.isHover ?
            <img alt="crop" className="cropper-icon" src={CropperIcon} />
            : null }
          <img alt="file preview" className="preview" src={this.props.file.preview} />
        </div>
        <Modal show={this.state.open} onHide={() => this.onCloseModal()} aria-labelledby="ModalHeader">
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">Crop your images here.</Modal.Title>
          </Modal.Header>
          <Modal.Body id="cropper">
            <CropperCom
              config={this.props.cropperConfig}
              src={this.props.file.origin}
              file={this.props.file}
              onUpdate={this.props.cropperUpdate}
              closeModal={this.onCloseModal}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ModalCom;
