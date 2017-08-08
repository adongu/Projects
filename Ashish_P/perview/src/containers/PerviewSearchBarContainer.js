import { connect } from 'react-redux';
import SearchBar from '../render_components/Header/SearchBar'
import { fetchresults } from '../actions/search_perview_actions';

const mapStateToProps = ({ findPerview }, ownProps) => {
  let results = [];
  // if (find.results) {
  //   results = find.results.map((item) => {
  //     return {
  //       imgUrl: item.data.imageUrls.large,
  //       name: item.name,
  //       amount: item.data.lowestNewPrice.formattedAmount
  //
  //     }
  //   })
  // }

  return {
    results: findPerview.results
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
