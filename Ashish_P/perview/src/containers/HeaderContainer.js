import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchuser, logout } from '../actions/session_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser()),
    logout: () => dispatch(logout())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
