import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem, match, history }) => {
  return {
    isFetching: session.isFetching,
    requestLoading: perview.requestLoading,
    match: match,
    history: history
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
