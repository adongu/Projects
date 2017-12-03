import { connect } from 'react-redux';
import NarrowPerview from '../render_components/PerviewsLayouts/NarrowPerview.js'
import { showLoginModal } from '../actions/session_actions';
import { editPerview, deletePerview, clearErrors } from '../actions/perview_actions';
import { createComment, deleteComment } from '../actions/social_actions';

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
    showLoginModal: () => dispatch(showLoginModal()),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrowPerview);
