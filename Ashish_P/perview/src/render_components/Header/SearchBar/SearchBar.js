import "../../../styles/stylesheets/search.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keywords: "",
      value: ""
     };

    this.renderResults = this.renderResults.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);
    this.updateKeywords = this.updateKeywords.bind(this);
    this.logChange = this.logChange.bind(this);
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

  logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
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
    console.log(this.state.keywords);
    return (
      <div className="search__suggestions">
        { this.renderSuggestions }
      </div>
    )
  }

  logChange(val) {
    console.log("Selected: " + val.value);
    this.setState({value: val.value});
  }

  arrowRenderer () {
  	return (
  		<i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
  	);
  }

  render() {
    let options = [
      { value: 'one', label: 'One', className: 'search__options-one'},
      { value: 'two', label: 'Two',  className: 'search__options-two'}
    ]

    return (
      <div>
      <div className="search__container">
        <div className="search__box">
          <form className="flexrow search__bar">
            <input onInput={ this.updateKeywords } className="search__input" placeholder="Search on amazon"></input>
            <button className="search__btn">
              <i className="fa fa-search search__btn-icon" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
      <Select
        className="search__autosuggest"
        name="form-field-name"
        placeholder="Search on Amazon"
        arrowRenderer={ this.arrowRenderer}
        value={this.state.value}
        menuBuffer={4}
        options={options}
      />
    </div>
    )
  }
}

export default withRouter(SearchBar);
