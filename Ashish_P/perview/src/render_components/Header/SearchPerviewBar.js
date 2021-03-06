import "../../styles/stylesheets/search.css";
import { debounce } from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import IsolatedScroll from 'react-isolated-scroll';
import * as util from '../../actions/util_actions.js';
import { Grid, Row, Col } from 'react-bootstrap';

class SearchItemBar extends Component {
  static propTypes = {
    noSearchIcon: PropTypes.bool,
  }
  constructor(props){
    super(props);

    this.state = {
      keywords: "",
      value: '',
      hoverUserName: '',
      suggestions: [],
      isFetching: false
    };

    this.fetchResults = this.fetchResults.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.logChange = this.logChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderSuggestionsContainer = this.renderSuggestionsContainer.bind(this);
    this.renderSeeAllLink = this.renderSeeAllLink.bind(this);
    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderSearchPerviewFriends = this.renderSearchPerviewFriends.bind(this);
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
    let perview = suggestion[0];
    this.props.selectItem(
      perview.itemDto.data.imageUrls.large.url,
      perview.itemDto.dataname,
      perview.itemDto.data.listPrice.formattedAmount,
      perview.itemDto.id
    );
    return perview.itemDto.name;
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions (value) {
    return this.state.suggestions;
  };

  fetchResults = debounce((newValue) => {
    this.props.fetchResults(newValue);
  }, 250);

  onChange (event, { newValue }) {
    this.setState({
      value: newValue,
      isFetching: true
    });

    this.fetchResults(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
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
    } else if (!this.props.noSearchIcon) {
      renderSearchOrLoading = (
        <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
      )
    }
// @TODO: Add delete button for text on mobile
    const renderCloseButton = () => {
      return (
        <span>
          x
        </span>
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
    this.setState({value: val.value });
  }
// prevents scrolling on outside of autosuggest if mouse is inside component
  renderSuggestionsContainer({ containerProps, children }) {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
      if (isolatedScroll !== null) {
        ref(isolatedScroll.component);
      }
    };

    return (
      <IsolatedScroll ref={callRef} {...restContainerProps}>
        {children}
      </IsolatedScroll>
    );
  }

  renderSeeAllLink(suggestion) {
    let numPerviews = suggestion.length;
    let itemId = suggestion[0].itemDto.id;

    if (numPerviews > 3) {
      return (
        <Link to={`/item/${itemId}`}>See all</Link>
      )
    }
  }

  renderSearchPerviewFriends(perviews) {
    if (perviews !== null) {
      let truncatedPerviews = perviews.length > 3 ? perviews.slice(0, 3) : perviews;

      return(
        <div className="flexrow headersearch__container">
          {truncatedPerviews.map((perview) => {
            let user = perview.userDto;

            return (
              <div key={`headersearch-${perview.id}`}>

                <div className="headersearch__userbox">
                  <img
                    onMouseOver={() => { this.setState({ hoverUserName: perview.userDto.fullName}) }}
                    onMouseLeave={() => { this.setState({ hoverUserName: "" }) }}
                    className="headersearch__userimg-img"
                    title={user.fullName}
                    src={util.generateUserImageUrl(user.facebookId, 'square')}
                    alt={user.fullName}/>
                </div>

                <div className={'headersearch__friendbox'}>
                  <div className="headersearch__friend-text">
                    {user.firstName}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }

  renderSuggestion(suggestion){
    if (suggestion) {
      let itemImageUrl = suggestion[0].itemDto.data.imageUrls.large.url;
      let itemPrice = suggestion[0].itemDto.data.listPrice.formattedAmount;

      return (
        <Row className="flexrow autosuggest__item">
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            className="flexrow autosuggest__product"
          >
            <div className="autosuggest__product-left">
              <img className="autosuggest__img" src={itemImageUrl} alt="product"/>
            </div>

            <div className="flexcolumn autosuggest__product-right">
              <div className="autosuggest__name">
                {suggestion[0].itemDto.name}
              </div>
              <div className="autosuggest__price">
                {itemPrice}
              </div>
            </div>
          </Col>

          <Col
            xsHidden
            smHidden
            mdHidden
            lg={4}
            className="autosuggest__friends"
          >
            <div className="autosuggest__friends-header">Perviewed by:</div>
            <div>
              {this.renderSearchPerviewFriends(suggestion)}
            </div>
            <div>
              {this.renderSeeAllLink(suggestion)}
            </div>
          </Col>
        </Row>
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
    // for customerization with className
    const theme = {
      container:                'react-autosuggest__container',
      containerOpen:            'react-autosuggest__container--open',
      input:                    'react-autosuggest__input',
      inputOpen:                'react-autosuggest__input--open',
      inputFocused:             'react-autosuggest__input--focused',
      suggestionsContainer:     'react-autosuggest__autosuggestions-container headersearch__autosuggestions-container',
      suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open headersearch__suggestions-container--open',
      suggestionsList:          'react-autosuggest__suggestions-list',
      suggestion:               'react-autosuggest__suggestion',
      suggestionFirst:          'react-autosuggest__suggestion--first',
      suggestionHighlighted:    'react-autosuggest__suggestion--highlighted',
      sectionContainer:         'react-autosuggest__section-container',
      sectionContainerFirst:    'react-autosuggest__section-container--first',
      sectionTitle:             'react-autosuggest__section-title'
    }

    return (
      <div className="search__container headersearch__perview">
        <Grid className="search__box">
          <Autosuggest
            id="headersearch__container"
            theme={theme}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            renderInputComponent={this.renderInputComponent}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            inputProps={inputProps}
          />
        </Grid>
      </div>
    )
  }
}

export default withRouter(SearchItemBar);
