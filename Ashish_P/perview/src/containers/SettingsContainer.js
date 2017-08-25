import { connect } from 'react-redux';
import { fetchUser } from '../actions/session_actions'
import Settings from '../render_components/Settings/Settings';

const mapStateToProps = ({ session }) => {
  currentUser: session.currentUser
}

const mapDispatchToProps = (dispatch) => {
  fetchUser: () => dispatch(fetchUser())
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
