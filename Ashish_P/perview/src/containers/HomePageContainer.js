import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchUser } from '../actions/session_actions';
import { createPerview, fetchAllPerviews, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
