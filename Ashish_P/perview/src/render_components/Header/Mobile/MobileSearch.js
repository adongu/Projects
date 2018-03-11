import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from '../SearchPerviewBar';
import { Grid, Row, Col } from 'react-bootstrap';
import "../../../styles/stylesheets/Header/header.css";

class MobileSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }

    this.searchClick = this.searchClick.bind(this);
  }

  searchClick() {
    console.log('this.state.isOpen', this.state.isOpen);
    this.setState({ isOpen: !this.state.isOpen});
  }

  render() {
    return (
      <div>
        <span
          onClick={this.searchClick}
          className="mobilesearhc__button"
        >
          <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
        </span>

        {this.state.isOpen &&
          <Grid
            className="mobilesearch__container"
          >
            <Row>
              <SearchPerviewBar
                selectItem={this.props.selectItem}
                results={this.props.perviewResults}
                fetchResults={this.props.fetchPerviewResults}
                noSearchIcon={true}
              />
            </Row>
          </Grid>
        }

      </div>
    )
  }
}

export default MobileSearch;
