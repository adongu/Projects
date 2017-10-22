import '../../../styles/stylesheets/PerviewLayouts/PerviewCard/PerviewComments.css';
import React from 'react';
// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
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
      <form onSubmit={this.handleSubmit}>
        <textarea
          onChange={this.update("newComment")}
          placeholder = "What would you like to ask ${THIS USER}"
          value={this.state.newComment}
        />

        <button>Submit</button>
      </form>
    )
  }

  renderCommenterProfile (commenter) {
    return (

      <div className="flexrow perviewcard__review-user">
        <div className="perviewcard__review-user-icon">
          <img className="perviewcard__review-user-img"
            onClick={this.props.handleFriendClick(commenter.id)} src={commenter.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt="User"
          />
        </div>
        <a
          onClick={this.props.handleFriendClick(commenter.id)}
          className="flexcolumn perviewcard__review-username"
        >
          <div></div>
          <span>{commenter.firstName} {commenter.lastName}</span>
        </a>
      </div>
    )
  }

  renderDeleteButton (comment) {
    if (this.props.currentUserId === comment.commenter.id) {
      return (
        <div onClick={this.handleDeleteComment(comment.id)}>Delete Comment</div>
      )
    }
  }

  renderAllComments () {
    console.log('perviewcomment', this.props.perview);
    console.log('perviewcomment', this.props.perview.comments);
    return (
      <div className="divwrapper-fullwidth">
        {this.state.comments.map((comment) => {
          return (
            <div key={`perviewcomment-${this.props.perview.id}-${comment.id}`}>
              {this.renderCommenterProfile(comment.commenter)}
              {comment.comment}

              {this.renderDeleteButton(comment)}
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div className="divwrapper-fullwidth">
        <div>
          {this.renderAddCommentForm()}
          {this.renderAllComments()}
        </div>
      </div>
    )
  }
}

export default PerviewComments;
