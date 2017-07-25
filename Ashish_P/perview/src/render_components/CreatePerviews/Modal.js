import React from 'react';
import { ButtonToolbar, Modal, Button} from 'react-bootstrap';
import SearchBar from "../Header/SearchBar/SearchBar";

class CreatePerview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  render() {
    return (
      <ButtonToolbar>
        <button className="navbar__creatererview-btn" onClick={this.showModal}>
          Create a Perview
        </button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="CreatePerview__Modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Create a PerView</Modal.Title>
          <div className="CreatePerview__search-msg">
            Search a product to perview it
          </div>
          </Modal.Header>
          <Modal.Body>
            <SearchBar />
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default CreatePerview;
