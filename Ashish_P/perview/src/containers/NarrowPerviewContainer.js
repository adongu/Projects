import { connect } from 'react-redux';
import NarrowPerview from '../render_components/PerviewsLayouts/NarrowPerview.js'
import { fetchUser } from '../actions/session_actions';
import { fetchMyPerviews, editPerview, deletePerview, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, createComment, deleteComment, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, findItem, social }, ownProps) => {
  return {
    currentUser: session.currentUser,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editPerview: (perview) => dispatch(editPerview(perview)),
    deletePerview: (perviewId) => dispatch(deletePerview(perviewId)),
    createComment: (perviewId, comment) => dispatch(createComment(perviewId, comment)),
    deleteComment: (perviewId, commentId) => dispatch(deleteComment(perviewId, commentId)),
    bookmarkPerview: (perviewId) => dispatch(bookmarkPerview(perviewId)),
    unbookmarkPerview: (perviewId) => dispatch(unbookmarkPerview(perviewId)),
    likePerview: (perviewId) => dispatch(likePerview(perviewId)),
    unlikePerview: (perviewId) => dispatch(unlikePerview(perviewId)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrowPerview);
