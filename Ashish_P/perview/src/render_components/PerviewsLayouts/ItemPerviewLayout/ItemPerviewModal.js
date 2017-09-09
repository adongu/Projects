import "../../../styles/stylesheets/itemperviewlayoutmodal.css"
import React from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
import moment from 'moment';

class ItemPerviewModal extends React.Component {

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
        <a className="itemperviewmodal__modal-show" onClick={this.showModal}>
          ...See more
        </a>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="itemperviewmodal__modal"
        >
          <Modal.Header className="itemperviewmodal__header" closeButton></Modal.Header>
          <Modal.Body className="itemperviewmodal__body">
            <div className="flexcolumn itemperviewmodal__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
              <div className="flexrow itemperviewmodal__userbox">
                <span className="itemperviewmodal__userimgbox">
                  <img className="itemperviewmodal__userimg" onClick={this.props.handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
                </span>
                <span className="itemperviewmodal__username">{user.firstName}</span>
              </div>
              <div className="itemperviewmodal__ratingbox">
                {this.props.renderStars(perview.rating)}
              </div>
              <div className="itemperviewmodal__reviewbox">
                {perview.tags}
              </div>
              <div className="itemperviewmodal__socialbox">
                <span className="itemperviewmodal__social-icon" onClick={this.props.handleSaveClick(perview)}>
                  <i className={`fa fa-bookmark-o itemperviewmodal__social-like ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                </span>
                <span className="itemperviewmodal__social-icon" onClick={this.props.handleLikeClick(perview)}>
                  <i className={`fa fa-heart-o itemperviewmodal__social-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default ItemPerviewModal;
