import '../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcomments.css';
import React from 'react';
import * as util from '../../../actions/util_actions.js';

// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      topLineMaxLength: 25,
      newComment: ''
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.renderCommenterProfile = this.renderCommenterProfile.bind(this);
    this.renderSocialSection = this.renderSocialSection.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  componentWillMount() {
    this.setState({
      comments: this.props.perview.comments
    });
  }
  //

  componentWillReceiveProps (nextProps) {
    if (nextProps.perview.comments.length !== this.props.perview.comments.length) {
      this.setState({
        comments: nextProps.perview.comments
      });
    }
  }

  update (field) {
    return (e) => {
      let charCode = (e.target.value.charCodeAt(e.target.value.length - 1));
      if (charCode === 10) {
        this.handleSubmit(e);
      } else {
        this.setState({
          [field]: e.target.value
        })
      }
    }
  }

  handleSubmit (e) {
    // return (e) => {
    e.preventDefault();
    e.stopPropagation()

    if (this.props.createComment && this.props.perview.id && this.state.newComment.length > 0) {
      let commentObject = {'perviewId': this.props.perview.id, 'comment': this.state.newComment };

      if(this.props.createComment(commentObject)) {
        this.setState({
          newComment: ''
        })
      }
    }
    // }
  }

  handleDeleteComment (commentId) {
    return (e) => {
      e.preventDefault();
      if (this.props.deleteComment && this.props.perview.id) {
        let commentObject = {'perviewId': this.props.perview.id, 'commentId': commentId}

        this.props.deleteComment(commentObject);
      }
    }
  }

  renderAddCommentForm () {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="perviewcomment__form"
      >
        <textarea
          type='text'
          className="perviewcomment__newcomment"
          onChange={this.update("newComment")}
          placeholder = "What would you like to ask?"
          value={this.state.newComment}
        />

        <span
          className="perviewcomment__formtip"
        >
          {this.state.newComment.length > 0 ? 'Press \'Enter\' key to Submit' : ''}
        </span>
      </form>
    )
  }

  renderCommenterProfile (comment, topComment) {
    const commenter = comment.commenter;

    return (
      <div className="flexrow perviewcomment__review-user">
        <div className="flexrow perviewcomment__userbox">
          {/* <div className="perviewcomment__userimgbox">
            <img className="perviewcomment__userimg"
              onClick={this.props.handleFriendClick(commenter.id)}
              src={util.generateUserImageUrl(commenter.facebookId, 'square')} alt="User"
            />
          </div> */}
          <a
            onClick={this.props.handleFriendClick(commenter.id)}
            className="perviewcomment__username"
          >
            {commenter.firstName}
          </a>
        </div>

        <div className="perviewcomment__topcomment">
          <span>
            {topComment}
          </span>
          {this.renderDeleteButton(comment)}
        </div>
      </div>
    )
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

  renderDeleteButton (comment) {
    // if (this.props.currentUserId === comment.commenter.id) {
      return (
        <div
          onClick={this.handleDeleteComment(comment.id)}
          className="perviewcomment__delete"
        >
          <span>x</span>
        </div>
      )
    // }
  }

  renderAllComments () {
    return (
      <div className="divwrapper-fullwidth perviewcomment__commentsbox">
        <p className="perviewcomment__commentstitle">Comments</p>

        {this.state.comments.map((comment) => {
          let topComment, bottomComment;
          let commenterNameLength = comment.commenter.firstName.length;
          let combinedNameAndCommentLength = commenterNameLength + comment.comment.length;
          let maxTopCommentLength = this.state.topLineMaxLength - commenterNameLength;

          if (combinedNameAndCommentLength > 2) {
            topComment = comment.comment.slice(0, maxTopCommentLength)
            bottomComment = comment.comment.slice(maxTopCommentLength);
          }
          return (
            <div key={`perviewcomment-${this.props.perview.id}-${comment.id}`}>
              <div>
                {this.renderCommenterProfile(comment, topComment)}
              </div>

              <div className="perviewcomment__bottomcomment">
                {bottomComment}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div className="perviewcomment__container divwrapper-fullwidth">
          {this.renderAllComments()}

        <div className="perviewcomment__socialactions">
          {this.renderSocialSection(this.props.perview)}
          {this.renderAddCommentForm()}
        </div>
      </div>
    )
  }
}

export default PerviewComments;
