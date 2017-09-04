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
        <div className="itemperviewmodal__modal-show" onClick={this.showModal}>
          ...See more
        </div>

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
                <span className="itemperview__social-bookmark" onClick={this.props.handleSaveClick(perview.id)}>
                  <i className="fa fa-bookmark-o itemperview__icon-bookmark" aria-hidden="true"></i>
                </span>
                <span className="itemperview__social-like" onClick={this.props.handleLikeClick(perview.id)}>
                  <i className="fa fa-heart-o itemperview__icon-like" aria-hidden="true"></i>
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
