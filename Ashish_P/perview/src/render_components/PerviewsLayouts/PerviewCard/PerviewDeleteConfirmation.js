import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewdeleteconfirmation.css";
import React from 'react';
import { ButtonToolbar, Modal, Button } from 'react-bootstrap';

const PerviewDeleteConfirmation = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleDeleteClick() {
    this.props.confirmDeletePerview();
    this.setState({ showModal: false });
  },

  render() {
    return (
      <div className="perviewdelete__box">
        <span onClick={this.open} className="perviewdelete__open">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </span>

        <Modal
          {...this.props}
          show={this.state.showModal} onHide={this.close}
          dialogClassName="perviewdelete__modal"
        >
          <Modal.Header closeButton className="perviewdelete__modal-header">
            <Modal.Title>Delete Perview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="perviewdelete__content">
              <p className="perviewdelete__confirm-text">
                Are you Sure you want to delete this Perview forever?
              </p>
              <div className="perviewdelete__options">
                <span onClick={this.handleDeleteClick} className="perviewdelete__delete">
                  Yes I'm sure!
                </span>
                <span onClick={this.close} className="perviewdelete__cancel">
                  Cancel
                </span>
              </div>
            </div>

          </Modal.Body>
        </Modal>
      </div>
    );
  }
});

export default PerviewDeleteConfirmation;
