import '../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcomments.css';
import React from 'react';
import * as util from '../../../actions/util_actions';

// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      // Needs to be updated depending on user image, 30 works best without userimage at 23px
      topLineMaxLength: 15,
      newComment: '',
      addedComment: false,
      commentElementClass: 'perviewcomment__comments-container',
    }

    this.splitCommentObject = this.splitCommentObject.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.renderCommenterProfile = this.renderCommenterProfile.bind(this);
    this.renderSocialSection = this.renderSocialSection.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  componentWillMount() {
    this.setState({
      comments: this.props.perview.comments,
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

  componentDidUpdate() {
    if (this.state.addedComment) {
      this.scrollToBottom('comments__box');
    }
  }

  // scroll to end of comment box
  scrollToBottom(elementId) {
    let element = document.getElementById(elementId);
    // let commentElementScrollHeight = document.getElementsByClassName('perviewcomment__comments-container');

    // if(commentElementScrollHeight){
    // commentElementScrollHeight = commentElementScrollHeight[0].scrollHeight;
    // };
    if (element) {
      element.scrollTo(0, element.scrollHeight + 36);
    }
  }

  update (field) {
    return (e) => {
      let charCode = (e.target.value.charCodeAt(e.target.value.length - 1));
      if (charCode === 10) {
        this.handleSubmit(e);
        // scroll to bottom of comments section
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
          newComment: '',
          addedComment: true,
        });
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
          <div className="perviewcomment__userimgbox">
            <img className="perviewcomment__userimg"
              onClick={this.props.handleFriendClick(commenter.id)}
              src={util.generateUserImageUrl(commenter.facebookId, 'square')} alt="User"
            />
          </div>
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
        </div>
        {this.renderDeleteButton(comment)}
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
          <i
            className="fa fa-times"
            aria-hidden="true">
          </i>
        </div>
      )
    // }
  }

  splitCommentObject (comment) {
    let topComment = "",
        bottomComment = "";
    let commentArray = comment.comment.split(" ");

    let commenterNameLength = comment.commenter.firstName.length;
    let maxTopCommentLength = this.state.topLineMaxLength - commenterNameLength;

    commentArray.forEach((comment, i) => {
      console.log('topComment', topComment.length)
      if (topComment.length < maxTopCommentLength) {
        topComment += ` ${comment}`;
      } else {
        bottomComment += ` ${comment}`;
      };
    });

    return {
      'topComment': topComment || '',
      'bottomComment': bottomComment || ''
    };
  }

  renderAllComments () {
    if (this.state.comments.length < 1) {
      return (
        <span className="perviewcomment__commentsbox">
          Be the first one to leave a comment!
        </span>
      )
    }

    return (
      <div
        className="perviewcomment__commentsbox"
        id="comments__box"
      >
        {this.state.comments.map((comment) => {
          let commentObject = this.splitCommentObject(comment);

          return (
            <div
              key={`perviewcomment-${this.props.perview.id}-${comment.id}`}
              className={this.state.commentElementClass}
            >
              <div>
                {this.renderCommenterProfile(comment, commentObject.topComment)}
              </div>

              <div className="perviewcomment__bottomcomment">
                {commentObject.bottomComment}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
/**
* @TODO Add emoji selector
**/
  render () {
    return (
      <div
        className="perviewcomment__container"
      >
        <p
          className="perviewcomment__commentstitle"
        >
          Comments:
        </p>
        {this.renderAllComments()}

        <div
          className="perviewcomment__socialactions"
        >
          {this.renderSocialSection(this.props.perview)}
          {this.renderAddCommentForm()}
        </div>
      </div>
    )
  }
}

export default PerviewComments;
