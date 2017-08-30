import { connect } from 'react-redux';
import { fetchUser, fetchToken } from '../actions/session_actions';
import PrivateRoute from '../render_components/PrivateRoute';

const mapStateToProps = ({ session }) => {
  console.log(session.currentUser);
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchToken: () => dispatch(fetchToken())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
