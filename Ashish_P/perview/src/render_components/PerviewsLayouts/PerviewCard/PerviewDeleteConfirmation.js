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

  render() {
    return (
      <div>
        <button onClick={this.open} className="perviewdelete__open">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Perview Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>Are you Sure you want to Delete this Perview?</p>
              <div>
                <button onClick={this.props.confirmDeletePerview} className="">Yes I'm sure!</button>
                <button className="">Cancel</button>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.close}>Close</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default PerviewDeleteConfirmation;
