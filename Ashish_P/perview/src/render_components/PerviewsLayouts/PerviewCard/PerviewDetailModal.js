import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewdetailmodal.css";
import React from 'react';
import moment from 'moment';
import { Modal, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PerviewComments from './PerviewComments';
import * as util from '../../../actions/util_actions.js';

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
    this.handleShowModalClick = this.handleShowModalClick.bind(this);

    this.renderItemSection = this.renderItemSection.bind(this);
    this.renderDetailsSection = this.renderDetailsSection.bind(this);
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

    if(nextProps.perview.comments) {
      if (nextProps.perview.comments.length !== this.props.perview.comments.length) {
        this.setState({
          toRenderPerviewCardDetailsView: nextProps.renderSolicitCommentsView,
          comments: nextProps.perview.comments
          // renderSolicitCommentsView: false
        });
      }
    }
  }

  showModal() {
    if (this.props.currentUserId) {
      this.setState({ show: true });
    }
  }

  hideModal() {
    this.setState({
      show: false,
      toRenderPerviewCardDetailsView: false,
      renderSolicitCommentsView: false
    });
  }

  handleShowModalClick() {
    console.log('handleShowModalClick', this.props);
    if (this.props.currentUserId) {
      this.showModal();
    } else {
      if (this.props.showLoginModal) {
        this.props.showLoginModal();
      }
    }
  }

  /**
   * @param perview type object
   * itemDto
  **/
  renderItemSection (item) {
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
    if(this.props.toRenderPerviewCommentsView) {
      return (
        <div className="flexcolumn divwrapper-fullwidth">
          <div className="flexrow perviewdetailmodal__userbox">
            <span className="perviewdetailmodal__userimgbox">
              <img className="perviewdetailmodal__userimg" onClick={this.props.handleFriendClick(user.id)} src={util.generateUserImageUrl(user.facebookId, 'square')} alt="User"/>
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
  }

  renderCommentSection () {
    if (this.props.toRenderPerviewCommentsView) {
      return (
        <PerviewComments
          currentUserId = {this.props.currentUserId}
          perview = {this.props.perview}
          comments = {this.state.comments}
          handleSaveClick = {this.props.handleSaveClick}
          handleLikeClick = {this.props.handleLikeClick}
          handleFriendClick = {this.props.handleFriendClick}
          createComment = {this.props.createComment}
          deleteComment = {this.props.deleteComment}
        />
      )
    }
  }

  render () {
    // console.log('perview', this.props.perview);
    const perview = this.props.perview
    const { itemDto } = perview;
    const user = perview.userDto;

    return (
      <ButtonToolbar>
        <a className="perviewdetailmodal__modal-show" onClick={this.handleShowModalClick}>
          {this.props.toRenderPerviewCommentsView ? 'Comments': '... more'}
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
                {this.renderDetailsSection(user, perview)}
              </div>
              <div className={`perviewdetailmodal__socialbox${this.props.toRenderPerviewCommentsView ? '' : '-large'}`}
              >
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
