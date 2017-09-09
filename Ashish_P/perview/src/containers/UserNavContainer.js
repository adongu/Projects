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
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true
  }
)(UserNav);
