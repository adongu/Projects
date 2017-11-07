import '../../styles/stylesheets/signin.css';
import '../../styles/assets/background.png';
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import SignInContainer from '../../containers/SignInContainer.js';

class SignInModalWrapper extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.props.hideLoginModal();
    this.setState({ show: false });
  }

  componentWillMount() {
    this.setState({
      show: false
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.props.showLoginModal) {
      this.setState.show
    }
  }

  render() {
    return (
      <ButtonToolbar className="signinmodal__box">
        <span className="signinmodal-btn" onClick={this.showModal}>
          Sign in
        </span>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="signinmodal"
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
  }
};

export default SignInModalWrapper;
