import "../../styles/stylesheets/search.css";
import { debounce } from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

class SearchItemBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keywords: "",
      value: '',
      suggestions: [],
      isFetching: false
    };

    // this.updateKeywords = this.updateKeywords.bind(this);
    this.onChange = this.onChange.bind(this);
    this.logChange = this.logChange.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderFriends = this.renderFriends.bind(this);
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
      suggestion.itemDto.id
      // suggestion.data.asin
    );
    return suggestion.itemDto.name;
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions (value) {
    return this.state.suggestions;
  };

  onChange (event, { newValue }) {
    this.setState({
      value: newValue,
      isFetching: true
    });
    // if (newValue.length > 0) {
    this.props.fetchResults(newValue);
    // }
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

  renderFriends(suggestion) {
    // console.log('suggestions', suggestion);
    // if (suggestion !== null) {
    //   let suggestionKeys = Object.keys(suggestion);
    //   if (suggestionKeys === 1) {
    //     let perview = suggestion.suggestionKeys;
    //     let user = perview.userDto;
    //     return (
    //       <div id={`suggestion-liker-${user.id}`}>
    //         <img className="wideresults__review-user-img" src={user.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt={user.fullName}/>
    //       </div>
    //     )
    //   } else {
    //     return(
    //       <div>
    //        {suggestionKeys.map((perviewKey) => {
    //         let perview = suggestion.suggestionKeys[0];
    //         let user = perview.userDto;
    //         return (
    //           <div id={`suggestion-liker-${perview.id}`}>
    //             <img className="wideresults__review-user-img" src={perview.facebookProfilePictureUrl.replace(/\/picture$/, "")} alt={perview.fullName}/>
    //           </div>
    //         )
    //       })}
    //     </div>
    //     )
    //   }
    // }
  }

  renderSuggestion(suggestion){
    if (suggestion) {
      let userImageUrl = suggestion[0].itemDto.data.imageUrls.large.url;
      let productPrice = suggestion[0].itemDto.data.lowestNewPrice.formattedAmount;

      return (
        <div className="flexrow autosuggest__item">
          <div className="flexrow autosuggest__product">
            <div className="autosuggest__product-left">
              <img className="autosuggest__img" src={userImageUrl} alt="product"/>
            </div>
            <div className="flexcolumn autosuggest__product-right">
              <div className="autosuggest__name">{suggestion[0].itemDto.name}</div>
              <div className="autosuggest__price">{productPrice}</div>
            </div>
          </div>

          <div className="flexcolumn autosuggest__friends">
            <div>Likes</div>
            {this.renderFriends(suggestion)}
          </div>
        </div>
      );
    }
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search Perview',
      value,
      onChange: this.onChange,
      type: 'search'
    };

    return (
      <div className="search__container search__perview">
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
