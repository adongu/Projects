import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchPerviewBar from '../SearchPerviewBar';
import { Grid, Row, Col } from 'react-bootstrap';
import "../../../styles/stylesheets/Header/header.css";

class MobileSearch extends Component {
  static propTypes = {
    fetchResults: PropTypes.func,
    selectItem: PropTypes.func.isRequired,
    results: PropTypes.object,
  }
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
        <div
          onClick={this.searchClick}
          className="mobilesearch__button"
        >
          <i className="fa fa-search search__btn-icon" aria-hidden="true"></i>
        </div>

        {this.state.isOpen &&
          <Grid
            className="mobilesearch__container"
          >
            <Row>
              <Col xs={12} sm={12} mdHidden lgHidden>
                <SearchPerviewBar
                  selectItem={this.props.selectItem}
                  results={this.props.perviewResults}
                  fetchResults={this.props.fetchPerviewResults}
                  noSearchIcon={true}
                />
              </Col>
            </Row>
          </Grid>
        }

      </div>
    )
  }
}

export default withRouter(MobileSearch);
