import { connect } from 'react-redux';
import SearchPerviewBar from '../render_components/Header/SearchPerviewBar'
import { fetchresults } from '../actions/search_perview_actions';

const mapStateToProps = ({ findPerview }, ownProps) => {
  let results = [];
  return {
    isFetching: findPerview,isFetching,
    results: findPerview.perviewResults
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
)(SearchPerviewBar);
