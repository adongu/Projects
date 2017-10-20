import React from 'react';
// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      newComment: ''
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.renderCommenterProfile = this.renderCommenterProfile.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
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

  renderPerviewDetails () {
    return (
      <div>
        user
      </div>
    )
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
      <div>
        {commenter.facebookProfilePictureUrl}
        {commenter.firstName}
        {commenter.lastName}
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
        {this.props.perview.comments.map((comment) => {
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
          {this.renderPerviewDetails}
          {this.renderAddCommentForm()}
          {this.renderAllComments()}
        </div>
      </div>
    )
  }
}

export default PerviewComments;
