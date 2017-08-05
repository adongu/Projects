import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchUser } from '../actions/session_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
