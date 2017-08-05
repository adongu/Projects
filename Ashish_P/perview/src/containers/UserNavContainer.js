import { connect } from 'react-redux';
import UserNav from '../render_components/Header/UserNav'

const mapStateToProps = (props) => {
  return {
    location: props.location
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect (
  null, null, null, {
  pure: true
})(UserNav);
