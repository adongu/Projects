import { connect } from 'react-redux';
import HomePage from "../render_components/Homepage/HomePage";

const mapStateToProps = ({ session }, ownProps) => {
  return {
    currentUser: session.currentUser
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
