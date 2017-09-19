import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewdetailmodal.css";
import React from 'react';
import { Modal, ButtonToolbar } from 'react-bootstrap';

class PerviewDetailModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      show: false
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal () {
    this.setState({ show: true });
  }

  hideModal () {
    this.setState({ show: false });
  }

  render () {
    let perview = this.props.perview
    let user = perview.userDto;

    return (
      <ButtonToolbar>
        <a className="perviewdetailmodal__modal-show" onClick={this.showModal}>
          ...more
        </a>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="perviewdetailmodal__modal"
        >
          <Modal.Header className="perviewdetailmodal__header" closeButton></Modal.Header>
          <Modal.Body className="perviewdetailmodal__body">
            <div className="flexcolumn perviewdetailmodal__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
              <div className="flexrow perviewdetailmodal__userbox">
                <span className="perviewdetailmodal__userimgbox">
                  <img className="perviewdetailmodal__userimg" onClick={this.props.handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
                </span>
                <span className="perviewdetailmodal__username">{user.firstName}</span>
              </div>
              <div className="perviewdetailmodal__ratingbox">
                {this.props.renderStars(perview.rating)}
              </div>
              <div className="perviewdetailmodal__reviewbox">
                {perview.tags}
              </div>
              <div className="perviewdetailmodal__socialbox">
                <span className="perviewdetailmodal__social-icon" onClick={this.props.handleSaveClick(perview)}>
                  <i className={`fa fa-bookmark perviewdetailmodal__social-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                </span>
                <span className="perviewdetailmodal__social-icon" onClick={this.props.handleLikeClick(perview)}>
                  <i className={`fa fa-heart perviewdetailmodal__social-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default PerviewDetailModal;
