import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchUser, logOut } from '../actions/session_actions';
import { fetchResults } from '../actions/search_perview_actions';


const mapStateToProps = ({ session, findPerview }) => {
  return {
    currentUser: session.currentUser,
    results: findPerview.perviewResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    fetchResults: (keywords) => dispatch(fetchResults(keywords)),
    logOut: () => dispatch(logOut()),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
