import { connect } from 'react-redux';
import SearchBar from '../render_components/Header/SearchBar'
import { fetchresults } from '../actions/search_item_actions';

const mapStateToProps = ({ findItem }, ownProps) => {
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
    results: findItem.results
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
