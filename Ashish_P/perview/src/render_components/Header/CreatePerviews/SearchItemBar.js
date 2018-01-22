import "../../../styles/stylesheets/search.css";
import { debounce } from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

class SearchItemBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keywords: '',
      value: '',
      suggestions: [],
      isFetching: false
    };

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
    this.props.selectItem(suggestion);
    return suggestion.title;
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  fetchResults = debounce((newValue) => {
    this.props.fetchResults(newValue);
  }, 250);

  getSuggestions (value) {
    return this.state.suggestions;
  };

  onChange (event, { newValue }) {
    this.setState({
      value: newValue,
      isFetching: true
    });

    if (newValue.length > 0) {
      this.fetchResults(newValue);
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
      keywords: '',
      value: '',
      suggestions: [],
      isFetching: false
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

  renderInputComponent (inputProps) {
    let renderSearchOrLoading;
    if (this.state.isFetching) {
      renderSearchOrLoading = (
        <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
      )
    } else {
      renderSearchOrLoading = (
        <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
      )
    }

    return (
      <div className="search__inputContainer">
        <input {...inputProps} />
        <button className="search__btn">
          {renderSearchOrLoading}
        </button>
      </div>
    )
  };
  // Use your imagination to render suggestions.
  renderSuggestion(suggestion){
    let imgUrl = suggestion.imageUrls.large.url;
    let price = suggestion.listPrice.formattedAmount;

    return (
      <div className="flexrow autosuggest__productcontainer">
        <div className="autosuggest__product-left">
          <img className="autosuggest__img" src={imgUrl} alt="product"/>
        </div>
        <div className="flexcolumn autosuggest__product-right">
          <div className="autosuggest__name">{suggestion.title}</div>
          <div className="autosuggest__price">{price}</div>
        </div>
      </div>
    );
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

export default withRouter(SearchItemBar);
