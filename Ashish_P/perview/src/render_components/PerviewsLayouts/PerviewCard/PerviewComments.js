import React from 'react';
// perview
class PerviewComments extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      newComment = ''
    }
  }

  updateInput () {
    return (e) => {
      this.setState({
        e.target.value
      })
    }
  }

  deleteComment (commentId) {

  }

  renderAddCommentForm () {
    return (
      <form action=>
        <textarea
          placeholder = "What would you like to ask ${THIS USER}"
        />

        <button>Submit</button>
      </form>
    )
  }

  renderAllComments () {
    return (
      <div className="divwrapper-fullwidth">
        {perview.comments.map((comment) => {
          return (
            <div>
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
