import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewdetailmodal.css";
import React from 'react';
import { Modal, ButtonToolbar } from 'react-bootstrap';
import PerviewComments from './PerviewComments';

class PerviewDetailModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      show: false,
      comments: [],
      toRenderPerviewCardDetailsView: false,
      toRenderPerviewCommentsView: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.renderDetailsSection = this.renderDetailsSection.bind(this);

    this.renderSolicitSection = this.renderSolicitSection.bind(this);
    this.renderCommentSection = this.renderCommentSection.bind(this);
  }

  // componentWillMount() {
  //   if (this.props.renderPerviewCardDetailsView) {
  //     this.setState({
  //       toRenderPerviewCardDetailsView: this.props.renderPerviewCardDetailsView
  //     });
  //   } else if (this.props.renderSolicitCommentsView) {
  //     this.setState({
  //       toRenderPerviewCardDetailsView: this.props.renderSolicitCommentsView,
  //       comments: this.props.perview.comments
  //     });
  //   }
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.renderPerviewCardDetailsView !== this.props.renderPerviewCardDetailsView) {
  //     this.setState({
  //       toRenderPerviewCardDetailsView: nextProps.renderPerviewCardDetailsView
  //       // renderSolicitCommentsView: false
  //     });
  //   } else if (nextProps.renderSolicitCommentsView !== this.props.renderSolicitCommentsView) {
  //     this.setState({
  //       toRenderPerviewCardDetailsView: nextProps.renderSolicitCommentsView,
  //       comments: nextProps.perview.comments
  //       // renderSolicitCommentsView: false
  //     });
  //   }
  // }

  showModal () {
    this.setState({ show: true });
  }

  hideModal () {
    this.setState({
      show: false,
      toRenderPerviewCardDetailsView: false,
      renderSolicitCommentsView: false
    });
  }

  renderDetailsSection (user, perview) {
    if (this.props.toRenderPerviewCardDetailsView) {
      return (
        <div className="flexcolumn divwrapper-fullwidth">
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
      )
    }
  }

  renderSolicitSection () {

  }

  renderCommentSection () {
    if (this.props.toRenderPerviewCommentsView) {
      return (
        <PerviewComments
          perview = {this.props.perview}
          createComment = {this.props.createComment}
          deleteComment = {this.props.deleteComment}
        />
      )
    }
  }

  render () {
    let perview = this.props.perview
    let user = perview.userDto;

    return (
      <ButtonToolbar>
        <a className="perviewdetailmodal__modal-show" onClick={this.showModal}>
          {this.state.toRenderPerviewCardDetailsView ? '... more' : 'comments'}
        </a>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="perviewdetailmodal__modal"
        >
          <Modal.Header className="perviewdetailmodal__header" closeButton></Modal.Header>
          <Modal.Body className="perviewdetailmodal__body">
            <div
              className="flexcolumn perviewdetailmodal__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}
            >
              <div className="divwrapper-fullwidth">
                {this.renderCommentSection(user, perview)}
                {this.renderDetailsSection(user, perview)}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default PerviewDetailModal;
