import React from 'react';
// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      newComment: ''
    }
  }

  updateInput () {
    return (e) => {
      this.setState({
        newComment: e.target.value
      })
    }
  }

  deleteComment (commentId) {

  }

  renderAddCommentForm () {
    return (
      <form action="">
        <textarea
          placeholder = "What would you like to ask ${THIS USER}"
        />

        <button>Submit</button>
      </form>
    )
  }

  renderAllComments () {
    console.log('perviewcomment', this.props.perview);
    console.log('perviewcomment', this.props.perview.comments);
    return (
      <div className="divwrapper-fullwidth">
        {this.props.perview.comments.map((comment) => {
          return (
            <div key={`perviewcomment-${this.props.perview.id}-${comment.id}`}>
              {/* {comment.username}
              {comment.userProfile}
              {comment.date}
              {comment.tags} */}
              comment
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
