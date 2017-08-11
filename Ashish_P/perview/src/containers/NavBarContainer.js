import { connect } from 'react-redux';
import NavBar from '../render_components/NavBar/NavBar'
import { createPerview, clearErrors } from '../actions/perview_actions';
import { fetchUser } from '../actions/session_actions';

const mapStateToProps = ({session}, ownProps) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    createPerview: (formData) => dispatch(createPerview(formData)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
