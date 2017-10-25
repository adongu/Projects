import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewdetailmodal.css";
import React from 'react';
import { Modal, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerviewComments from './PerviewComments';

class PerviewDetailModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      show: false,
      comments: [],
      toRenderPerviewCardDetailsView: true,
      toRenderPerviewCommentsView: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.renderItemSection = this.renderItemSection.bind(this);
    this.renderDetailsSection = this.renderDetailsSection.bind(this);
    this.renderSocialSection = this.renderSocialSection.bind(this);
    this.renderCommentSection = this.renderCommentSection.bind(this);
  }

  componentWillMount() {
    this.setState({
      toRenderPerviewCardDetailsView: this.props.renderPerviewCardDetailsView,
      toRenderPerviewCommentsView: this.props.renderSolicitCommentsView,
      comments: this.props.perview.comments
    });
  }
  //
  componentWillReceiveProps (nextProps) {
    if (nextProps.renderPerviewCardDetailsView !== this.props.renderPerviewCardDetailsView) {
      this.setState({
        toRenderPerviewCardDetailsView: nextProps.renderPerviewCardDetailsView
        // renderSolicitCommentsView: false
      });
    }

    if (nextProps.perview.comments.length !== this.props.perview.comments.length) {
      this.setState({
        toRenderPerviewCardDetailsView: nextProps.renderSolicitCommentsView,
        comments: nextProps.perview.comments
        // renderSolicitCommentsView: false
      });
    }
  }

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

  /**
   * @param perview type object
   * itemDto
  **/
  renderItemSection (item) {
    console.log('is solicit', item);
    if(item && this.props.toRenderPerviewCommentsView) {
      // solicit background
      if(this.props.perview.solicit) {
        return (
          <div className="perviewdetailmodal__solicitbox">
            <div className="perviewdetailmodal__solicitbackground">
              Looking for Recommendations
            </div>
          </div>
        )
      } else {
        return (
          <div className="flexcolumn narrowperviews__productbox divwrapper-fullwidth">
            <div className="narrowperviews__img">
              <Link to={`/item/${item.id}`}>
                <img className="narrowperviews__productimg-photo" src={item.data.imageUrls.large.url} alt="product"/>
              </Link>
            </div>

            <Link to={`/item/${item.id}`} className="narrowperviews__product-name">
              {item.data.title}
            </Link>

            <div className="flexrow narrowperviews__buybox">
              {item.data.listPrice.formattedAmount}

              <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">
                Buy on Amazon
              </a>
            </div>
          </div>
        )
      }
    }
  }

// Abstract details into its own component
  renderDetailsSection (user, perview) {
    // if (this.props.toRenderPerviewCardDetailsView) {
    return (
      <div className="flexcolumn divwrapper-fullwidth">
        <div className="flexrow perviewdetailmodal__userbox">
          <span className="perviewdetailmodal__userimgbox">
            <img className="perviewdetailmodal__userimg" onClick={this.props.handleFriendClick(user.id)} src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"/>
          </span>
          <span className="perviewdetailmodal__username">{user.firstName}</span>
        </div>
        <div className="perviewdetailmodal__ratingbox">
          {this.props.renderStars ? this.props.renderStars(perview.rating) : ''}
        </div>
        <div className="perviewdetailmodal__reviewbox">
          {perview.tags}
        </div>
      </div>
    )
  }

  renderCommentSection () {
    if (this.props.toRenderPerviewCommentsView) {
      return (
        <PerviewComments
          currentUserId = {this.props.currentUserId}
          perview = {this.props.perview}
          comments = {this.state.comments}
          handleFriendClick = {this.props.handleFriendClick}
          createComment = {this.props.createComment}
          deleteComment = {this.props.deleteComment}
        />
      )
    }
  }

  renderSocialSection (perview) {
    return (
      <div className="perviewdetailmodal__socialbox">
        <span className="perviewdetailmodal__social-icon" onClick={this.props.handleSaveClick(perview)}>
          <i className={`fa fa-bookmark perviewdetailmodal__social-bookmark ${perview.bookmarkedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
        </span>
        <span className="perviewdetailmodal__social-icon" onClick={this.props.handleLikeClick(perview)}>
          <i className={`fa fa-heart perviewdetailmodal__social-like ${perview.likedByLoggedInUser ? "active" : ""}`} aria-hidden="true"></i>
        </span>
      </div>
    )
  }

  render () {
    // console.log('perview', this.props.perview);
    const perview = this.props.perview
    const { itemDto } = perview;
    const user = perview.userDto;

    return (
      <ButtonToolbar>
        <a className="perviewdetailmodal__modal-show" onClick={this.showModal}>
          {this.props.toRenderPerviewCommentsView ? 'comments': '... more'}
        </a>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName={`perviewdetailmodal__modal${this.props.toRenderPerviewCommentsView ? '-large' : ''}`}
        >
          <Modal.Header className="perviewdetailmodal__header" closeButton></Modal.Header>
          <Modal.Body className="perviewdetailmodal__body">
            <div
              className="flexrow perviewdetailmodal__perviewbox"
            >
              <div className={`${this.props.toRenderPerviewCommentsView ? 'perviewdetailmodal__itembox' : ''}`}>
                {this.renderItemSection(itemDto)}
              </div>
              <div className={`perviewdetailmodal__socialbox${this.props.toRenderPerviewCommentsView ? '' : '-large'}`}>
                {this.renderDetailsSection(user, perview)}
                {this.renderSocialSection(perview)}
                {this.renderCommentSection(user, perview)}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default PerviewDetailModal;
