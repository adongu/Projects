import { connect } from 'react-redux';
import Header from '../render_components/Header/Header'
import { fetchuser } from '../actions/session_actions';

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Header);
