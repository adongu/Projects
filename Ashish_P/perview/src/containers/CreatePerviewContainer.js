import { connect } from 'react-redux';
import CreatePerviewModal from '../render_components/CreatePerviews/CreatePerviewModal';
import { createPerview, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPerview: (formData) => dispatch(createPerview(formData)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CreatePerviewModal);
