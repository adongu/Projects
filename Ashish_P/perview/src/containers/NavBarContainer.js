import { connect } from 'react-redux';
import NavBar from "../render_components/NavBar/NavBar";
import { fetchUser } from '../actions/session_actions';
import { fetchResults } from '../actions/search_item_actions';
import { createPerview, createItem, clearErrors } from '../actions/perview_actions';

const mapStateToProps = ({ session, perview, findItem }) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
