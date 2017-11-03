import '../../styles/stylesheets/signin.css';
import '../../styles/assets/background.png';
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import SignInContainer from '../../containers/SignInContainer.js';

const SignInModalWrapper = React.createClass({
  getInitialState() {
    return { show: false };
  },

  showModal() {
    this.setState({ show: true });
  },

  hideModal() {
    this.setState({ show: false });
  },

  render() {
    return (
      <ButtonToolbar className="signinmodal__box">
        <button className="signinmodal-show" onClick={this.showModal}>
          Create Perview
        </button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <closeButton />

          <Modal.Body>
            <div className="divwrapper-fullwidth">
              <SignInContainer
              />
          </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  },
});

export default SignInModalWrapper;
