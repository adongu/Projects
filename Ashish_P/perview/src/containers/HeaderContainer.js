import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchUser, logOut } from '../actions/session_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    logOut: () => dispatch(logOut())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
