import "../../styles/stylesheets/search.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

const languages = [{ name: 'C', year: 1972 },
{ name: 'Elm', year: 2014 },
{ name: 'Elm', year: 2012 }];

//// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//
//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

const renderInputComponent = inputProps => (
  <div className="search__inputContainer">
    <input {...inputProps} />
    <button className="search__btn">
      <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
    </button>
  </div>
);

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keywords: "",
      value: '',
      suggestions: [],
      isFetching: false
    };

    // this.updateKeywords = this.updateKeywords.bind(this);
    this.logChange = this.logChange.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.results) {
      this.setState({
        suggestions: nextProps.results,
        isFetching: false
      });
      console.log(nextProps.results);
    }
  }

  getSuggestionValue(suggestion) {
    // pass item to modal
    this.props.selectItem(
      suggestion.data.imageUrls.large.url,
      suggestion.name,
      suggestion.data.lowestNewPrice.formattedAmount,
      suggestion.id
      // suggestion.data.asin
    );
    return suggestion.name;
  }
  // Use your imagination to render suggestions.
  renderSuggestion(suggestion){
    let imgUrl = suggestion.data.imageUrls.large.url;
    let price = suggestion.data.lowestNewPrice.formattedAmount;
    return (
      <div className="search__suggestions-item">
        <div><img src={imgUrl} alt="product"/></div>
        <div>{suggestion.name}</div>
        <div>{price}</div>
      </div>
    );
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions (value) {
    return this.state.suggestions;
  };

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    });

    if (newValue.length > 0) {
      this.props.fetchresults(newValue);
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  updateKeywords(e) {
    this.setState({
      keywords: e.target.value
    });
    return (
      <div className="search__suggestions">
        { this.renderSuggestion }
      </div>
    )
  }

  logChange(val) {
    this.setState({value: val.value});
  }

  render() {

    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search on Amazon',
      value,
      onChange: this.onChange,
      type: 'search'
    };

    return (
      <div className="search__container">
        <div className="search__box">
          <Autosuggest
            id="header__suggest"
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            renderInputComponent={renderInputComponent}
            inputProps={inputProps}
          />
        </div>
    </div>
    )
  }
}
// https://codepen.io/moroshko/pen/PZWbzK for
export default withRouter(SearchBar);
