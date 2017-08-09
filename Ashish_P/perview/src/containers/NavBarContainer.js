import { connect } from 'react-redux';
import NavBar from '../render_components/NavBar/NavBar'
import { createPerview, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({session}, ownProps) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch, newProps) => {
  return {
    createPerview: (formData) => dispatch(createPerview(formData)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
