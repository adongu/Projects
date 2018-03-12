import "../../../styles/stylesheets/createperviewmodal.css";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import SearchItemBar from "./SearchItemBar";
// import {
//  renderMoreInfoPopover
// } from '../../SharedComponents/PricePopOver';

class CreatePerviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      chosen: false,
      isSolicit: false,
      perviewSolicitId: null,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      itemId: null,
      tags: '',
      rating: 0,
      ratingHover: 0,
      lastRating: 0,
      ratingTip: {
        0: "",
        1: "Hate",
        2: "Dislike",
        3: "Neutral",
        4: "Like",
        5: "Love"
      },
      asin: null,
      item: {},
      perviewers: []
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.handleShowModalClick = this.handleShowModalClick.bind(this);
    this.showReviewBox = this.showReviewBox.bind(this);
    this.renderReviewStars = this.renderReviewStars.bind(this);

    this.selectItem = this.selectItem.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemResults !== this.props.itemResults) {
      console.log('update new itemresults');
      this.setState({
        itemResults: nextProps.itemResults
      })
    }
  }

  showModal(e) {
    if (this.props.currentUser) {
      this.setState((prevState, props) => ({ show: true }));
    }
  }

  hideModal() {
    this.setState({
      show: false,
      itemResults: [],
      chosen: false,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      itemId: null,
      tags: '',
      rating: 0,
      lastRating: 0,
      ratingHover: 0,
      perviewers: []
    });
  }

  handleShowModalClick(e) {
    e.stopPropagation();
    if (this.props.currentUser) {
      this.showModal();
    } else {
      if (this.props.showLoginModal) {
        this.props.showLoginModal();
      }
    }
    //
    // if (this.props.closeHamburgerNav) {
    //   this.props.closeHamburgerNav();
    // }
  }

  renderReviewStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={`star_rating_${ele}`} className={ele <= ratings ? 'active_star' : 'no_star'}
          onClick={() => {this.setState({ rating: ele, lastRating: ele })}}>

          <div className={`createperview__ratingtipbox ${this.state.ratingHover === ele ? 'active' : ''}`}>
            <div className="createperview__ratingtip">{this.state.ratingTip[ele]}</div>
            {/* <div className={`createperview__ratingtipbox-triangle ${this.state.ratingHover === ele ? 'active' : ''}`}></div> */}
          </div>

          <i onMouseOver={()=>{ this.setState({ rating: ele, ratingHover: ele }) }}
            onMouseLeave={()=>{ this.setState({ rating: this.state.lastRating, ratingHover: 0 })}}
            className="fa fa-star createperview__rating-star" aria-hidden="true">
          </i>
        </span>
      )
    })
  }

  selectItem(item) {
    this.props.createItem(item)
    .then((result) => {
      let item = this.props.selectedItem;
      this.setState({
        imgUrl: item.data.imageUrls.large.url,
        name: item.data.title,
        price: item.data.listPrice.formattedAmount,
        itemId: item.id,
        chosen: true
      })
    })
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.props.currentUser){
      let submitPerviewObject = {};

      let formData = new FormData();
      formData.append("itemId", this.state.itemId);
      formData.append("tags", this.state.tags);
      formData.append("rating", this.state.rating);

      submitPerviewObject.formData = formData;
      submitPerviewObject.solicitPerviewId = this.props.perviewSolicitId;
      submitPerviewObject.isSolicit = this.state.isSolicit;

      // when submit fails prevent review lost
      if(!this.props.createPerview(submitPerviewObject)) {
        this.setState({
          itemId: this.state.itemID,
          tags: this.state.tags,
          rating: this.state.rating
        })
      } else {
        this.setState({
          itemId: null,
          tags: '',
          rating: 0

        })
        this.hideModal();
        if (this.props.history.location.pathname !== '/' ) {
          this.props.history.replace({ pathname: '/' });
        }
      }
    } else {
      // make user go back to signin
      this.props.history.replace({ pathname: '/signin' })
    }
  }

  showReviewBox() {
    if(this.state.chosen) {
      return (
        <div className="flexcolumn createperview__product-container">
          <div className="flexrow createperview__product">
            <div className="createperview__product-left">
              <img className="createperview__product-img" src={this.state.imgUrl} alt="product"/>
            </div>
            <div className="createperview__product-right">
              <div className="flextcolumn createperview__product-info">
                <div className="createperview__product-title">
                  {this.state.name}
                </div>
                <div className="flexcolumn createperview__product-details">
                  <div className="createperview__product-price">
                    {this.state.price}
                  </div>

                  {/* {renderMoreInfoPopover()} */}
                </div>
              </div>
            </div>
          </div>

          <div className="createperview__review-container">
            <form onSubmit={this.handleSubmit} className="flexcolumn createperview__review-box">
              <div className="flexrow createperview__review-rating">
                <div className="flexrow createperview__review-rating-stars">
                  {this.renderReviewStars(this.state.rating)}
                </div>
              </div>

              <span className="createperview__needrating">
                {
                  this.state.lastRating < 1
                  ? 'Please select a rating bewtween 1 and 5 before submitting :)'
                  : ''
                }
              </span>

              <textarea
                onChange={this.update("tags")}
                className="createperview__review-input"
                value={this.state.tags}
                placeholder="What did you think of this product? #hashtag">
              </textarea>

              <button disabled={this.state.lastRating < 1} className="createperview__review-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )
    }
  }

  showRecommendationMessage() {
      if (this.props.perviewSolicitId) {
        return (
          <div className="createperview__search-msg">
            You are recommending {this.props.perviewSolicitTags} for {this.props.perviewSolicitFirstName}
          </div>
        )
      }
  }

  render() {
    console.log("this.state.show", this.state.show);
    return (
      <ButtonToolbar className="createperview__box">
        <button className="createperview__btn" onClick={this.handleShowModalClick}>
          Create Perview
        </button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="createperview__modal"
        >
          <Modal.Header className="createperview__modalhead" closeButton>

          <div className="createperview__title">
            Create Perview
          </div>

          <div className="flexcolumn createperview__search-container">
            { this.showRecommendationMessage() }
            <div className="createperview__search-background">
              <div className="createperview__search-box">
                <SearchItemBar
                  selectItem={this.selectItem}
                  results={this.props.itemResults}
                  fetchResults={this.props.fetchResults}
                />
              </div>
            </div>
          </div>

          <div className="createperview__section">
            { this.showReviewBox() }
          </div>
          </Modal.Header>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default CreatePerviewModal;
