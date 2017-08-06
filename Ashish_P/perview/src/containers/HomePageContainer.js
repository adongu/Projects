import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";
import { fetchuser } from '../actions/session_actions';

const mapStateToProps = (props, ownProps) => {
  return {
    currentUser: props.session.currentUser
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
