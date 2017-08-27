import { connect } from 'react-redux';
import { fetchUser } from '../actions/session_actions';
import { fetchNumPerviews } from '../actions/perview_actions';
import Settings from '../render_components/Settings/Settings';

const mapStateToProps = ({ session, perview }) => {
  return {
    currentUser: session.currentUser,
    numPerviews: perview.numPerviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchNumPerviews: () => dispatch(fetchNumPerviews())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
