import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchuser } from '../actions/session_actions';

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentUser: session.currentUser,
    isFetching: session.isFetching
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchuser: () => dispatch(fetchuser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
