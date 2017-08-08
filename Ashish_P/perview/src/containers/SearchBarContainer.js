import { connect } from 'react-redux';
import SearchBar from '../render_components/Header/SearchBar'
import { fetchresults } from '../actions/search_actions';

const mapStateToProps = ({ find }, ownProps) => {
  return {
    results: find.results
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchresults: (keywords) => dispatch(fetchresults(keywords))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
