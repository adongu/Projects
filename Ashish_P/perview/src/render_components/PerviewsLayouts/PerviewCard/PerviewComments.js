import '../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcomments.css';
import React from 'react';
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
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleSubmit (e) {
    // return (e) => {
    e.preventDefault();
    e.stopPropagation()

    if (e.target.charCode === 13 && this.props.createComment && this.props.perview.id && this.state.newComment.length > 0) {
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
          className="perviewcomment__newcomment"
          onChange={this.update("newComment")}
          placeholder = "What would you like to ask?"
          value={this.state.newComment}
        />

        <button
          className="perviewcomment__newcomment-submit"
          type="submit"
        >
          Submit
        </button>
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
              onClick={this.props.handleFriendClick(commenter.id)} src={commenter.facebookProfilePictureUrl} alt="User"
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
          {this.renderDeleteButton(comment)}
        </div>
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
      <div className="divwrapper-fullwidth">
          {this.renderAllComments()}
          {this.renderAddCommentForm()}
      </div>
    )
  }
}

export default PerviewComments;
