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
        <a className="itemperview__modal-show" onClick={this.showModal}>
          ...See more
        </a>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flexcolumn itemperview__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
              <div className="itemperview__timestamp">{moment(perview.ts).format("MMM D")}</div>
              <div className="flexrow itemperview__userbox">
                <span className="itemperview__userimgbox">
                  <img className="itemperview__userimg" onClick={this.props.handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
                </span>
                <span className="itemperview__username">{user.firstName}</span>
              </div>
              <div className="itemperview__ratingbox">
                {this.props.renderStars(perview.rating)}
              </div>
              <div className="itemperview__reviewbox">{perview.tags}</div>
              <div className="itemperview__socialbox">
                <span className="itemperview__social-bookmark" onClick={this.props.handleSaveClick(perview)}>
                  <i className={`fa fa-bookmark-o itemperview__icon-like ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
                </span>
                <span className="itemperview__social-like" onClick={this.props.handleLikeClick(perview)}>
                  <i className={`fa fa-heart-o itemperview__icon-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
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
