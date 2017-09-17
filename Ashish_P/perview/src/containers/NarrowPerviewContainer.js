import { connect } from 'react-redux';
import NarrowPerview from "../../PerviewsLayouts/NarrowPerview.js"
import { fetchUser } from '../actions/session_actions';
import { fetchMyPerviews, editPerview, deletePerview, clearErrors } from '../actions/perview_actions';
import { likePerview, unlikePerview, bookmarkPerview, unbookmarkPerview } from '../actions/social_actions';

const mapStateToProps = ({ session, findItem, social }, ownProps) => {
  return {
    currentUserId: session.currentUser.id,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editPerview: (perview) => dispatch(editPerview(perview)),
    deletePerview: (perviewId) => dispatch(deletePerview(perviewId)),
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
