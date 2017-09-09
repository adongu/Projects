import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem, match }) => {
  return {
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    currentUser: session.currentUser,
    match: match
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
