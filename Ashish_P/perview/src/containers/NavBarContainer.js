import { connect } from 'react-redux';
import NavBar from '../render_components/NavBar/NavBar'

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.currentUser
  }
}

const mapDispatchToProps = () => {
  return {

  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
