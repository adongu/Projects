import "../../styles/stylesheets/itemperview.css";
import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBarContainer from '../../containers/NavBarContainer.js';
import ItemPerviewLayout from "../PerviewsLayouts/ItemPerviewLayout/ItemPerviewLayout";

class ItemPerviews extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      fetchingUpdate: false,
      requestLoading: false,
      categoryIds: [],
      itemId: null
    }

    this.fetchFilteredPerviews = this.fetchFilteredPerviews.bind(this);
  }

  componentWillMount () {
    this.props.fetchItemPerviews(Number(this.props.match.params.item_id));

    this.setState({
      itemId: Number(this.props.match.params.item_id)
    });

  }

  componentDidMount() {
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.requestLoading !== this.props.requestLoading) {
    //   this.setState({
    //     requestLoading: nextProps.requestLoading
    //   });
    // }

    if (this.props.match.params.item_id !== nextProps.match.params.item_id) {
      nextProps.fetchItemPerviews(Number(nextProps.match.params.item_id));

      this.setState({
        itemId: Number(nextProps.match.params.item_id)
      });
    }

    if (nextProps.fetchingUpdate !== this.props.fetchingUpdate) {
      this.setState({
        fetchingUpdate: nextProps.fetchingUpdate
      })

      // if (this.state.fetchingUpdate) {
        nextProps.fetchItemPerviews(Number(nextProps.match.params.item_id));
      // }
    }
  }

  fetchFilteredPerviews(categoryId) {
    this.props.fetchItemPerviews(this.state.itemId, categoryId)
  }

  renderComponents() {
    if (this.state.requestLoading) {
      return (
        <div>spinner</div>
      )
    } else {
      return (
        <ItemPerviewLayout
          perviews = {this.props.perviews}
          bookmarkPerview = {this.props.bookmarkPerview}
          unbookmarkPerview = {this.props.unbookmarkPerview}
          likePerview = {this.props.likePerview}
          unlikePerview = {this.props.unlikePerview}
          history = {this.props.history}
        />
      )
    }
  }

  render() {
    return (
    <div className="itemperview__container">
      <NavBarContainer
        filterPerviews = {this.fetchFilteredPerviews}
      />

      <div className="itemperview__perviews">
        {this.renderComponents()}
      </div>
    </div>
    )
  }
}

export default withRouter(ItemPerviews);
