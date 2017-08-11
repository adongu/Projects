import "../../styles/stylesheets/search.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

class SearchItemBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keywords: "",
      value: '',
      suggestions: {},
      isFetching: false
    };

    // this.updateKeywords = this.updateKeywords.bind(this);
    this.logChange = this.logChange.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.results) {
      this.setState({
        suggestions: nextProps.results,
        isFetching: false
      });
    }
  }

  getSuggestionValue(suggestion) {
    // pass item to modal
    this.props.selectItem(
      suggestion.itemDto.data.imageUrls.large.url,
      suggestion.itemDto.dataname,
      suggestion.itemDto.data.lowestNewPrice.formattedAmount,
      suggestion.id
      // suggestion.data.asin
    );
    return suggestion.itemDto.name;
  }
  // Use your imagination to render suggestions.
  renderSuggestion(suggestion){
    let imgUrl = suggestion.itemDto.data.imageUrls.large.url;
    let price = suggestion.itemDto.data.lowestNewPrice.formattedAmount;
    return (
      <div className="flexrow autosuggest__product">
        <div className="autosuggest__product-left">
          <img className="autosuggest__img" src={imgUrl} alt="product"/>
        </div>
        <div className="flexcolumn autosuggest__product-right">
          <div className="autosuggest__name">{suggestion.itemDto.name}</div>
          <div className="autosuggest__price">{price}</div>
        </div>
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
      this.props.fetchResults(newValue);
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
      suggestions: {}
    });
  };

  renderInputComponent (inputProps) {
    return (
      <div className="search__inputContainer">
        <input {...inputProps} />
        <button className="search__btn">
          <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
        </button>
      </div>
    )
  };

  updateKeywords(e) {
    this.setState({
      keywords: e.target.value
    });
    return (
      <div className="search__suggestions">
        { this.renderSuggestion() }
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
            renderInputComponent={this.renderInputComponent}
            inputProps={inputProps}
          />
        </div>
    </div>
    )
  }
}
// https://codepen.io/moroshko/pen/PZWbzK for
export default withRouter(SearchItemBar);
