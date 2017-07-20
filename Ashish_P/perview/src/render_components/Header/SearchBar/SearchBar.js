import React from 'react';
import { withRouter } from 'react-router-dom';
import "../../../styles/stylesheets/search.css";

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = { keywords: "" };

    this.renderResults = this.renderResults.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
  }

  renderResults({img, title, price, perviews}) {
    return (
      <div className="search__suggestions-item">
        <div><img /></div>
        <div>`${title}`</div>
        <div>`${price}`</div>
        <div>`${perviews}`</div>
      </div>
    )
  }

  renderSuggestions(searchResults = [{img: "img", title: "title", price: 149, perviews: 2}]) {
    console.log(this.state.keywords.length);
    if (this.state.keywords.length > 0) {
      let maxNumResults = Math.min(searchResults.length, 3)
      for(let i = 0; i < maxNumResults; i++) {
        this.renderResults(searchResults[i])
      }
    }
  }

  updateKeywords(e) {
    this.setState({
      keywords: e.target.value
    });
    console.log(this.state.keywords.length);
    return (
      <div className="search__suggestions">
        { this.renderSuggestions }
      </div>
    )
  }

  render() {
    return (
      <div className="search__container">
        <div className="search__box">
          <form className="search__bar">
            <input onInput={ this.updateKeywords } className="search__input"></input>
            <button className="search__btn">
              <i className="fa fa-search search__btn-icon" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchBar);
