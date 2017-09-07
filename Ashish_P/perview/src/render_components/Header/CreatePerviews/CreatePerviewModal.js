import "../../../styles/stylesheets/createperviewmodal.css";
import product from "../../../styles/assets/product.jpg";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import SearchItemBar from "./SearchItemBar";

class CreatePerviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      chosen: false,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      itemId: null,
      tags: '',
      rating: 0,
      ratingHover: 0,
      ratingTip: {
        0: "",
        1: "Hate It!",
        2: "Meh",
        3: "Just Okay",
        4: "Great",
        5: "Love It!"
      },
      asin: null,
      item: {},
      perviewers: []
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showReviewBox = this.showReviewBox.bind(this);
    this.renderReviewStars = this.renderReviewStars.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({
      show: false,
      chosen: false,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      itemId: null,
      tags: '',
      rating: 0,
      ratingHover: 0,
      ratingTip: {
        0: "",
        1: "Hate It!",
        2: "Meh",
        3: "Just Okay",
        4: "Great",
        5: "Love It!"
      },
      // asin: '',
      perviewers: []
    });
  }

  // renderRatingTip () {
  //   if (this.state.ratingTip && this.state.ratingHover) {
  //     console.log("render rating tip");
  //     return (
  //       <div className="createperview__ratingtipbox">
  //         <div className="createperview__ratingtip">{this.state.ratingTip[this.state.ratingHover]}</div>
  //         <div className="createperview__ratingtipbox-triangle"></div>
  //       </div>
  //     )
  //   }
  // }

// -${this.state.ratingHover === ele ? 'active' : ''}
  renderReviewStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={`star_rating_${ele}`} className={ele <= ratings ? 'active_star' : 'no_star'} onClick={() => {this.setState({ rating: ele })}}
        >
          <div className={`createperview__ratingtipbox ${this.state.ratingHover === ele ? 'active' : ''}`}>
            <div className="createperview__ratingtip">{this.state.ratingTip[ele]}</div>
            <div className="createperview__ratingtipbox-triangle"></div>
          </div>
          <i onMouseOver={()=>{ this.setState({ rating: ele, ratingHover: ele }) }}
            onMouseLeave={()=>{ this.setState({ rating: this.state.rating, ratingHover: 0 })}}
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
        price: item.data.lowestNewPrice.formattedAmount,
        itemId: item.id,
        chosen: true
      })
    })
  }

  update (field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.props.currentUser){
      let formData = new FormData();
      formData.append("itemId", this.state.itemId);
      formData.append("tags", this.state.tags);
      formData.append("rating", this.state.rating);
      // when submit fails prevent review lost
      if(!this.props.createPerview(formData)) {
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
        this.props.history.replace({ pathname: '/' });
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
                <div className="flexrow createperview__product-details">
                  <div className="createperview__product-price">
                    {this.state.price}
                  </div>
                  <div className="createperview__product-perviews">
                    8 perviews
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="createperview__review-container">
            <form className="flexcolumn createperview__review-box" action>
              <div className="flexrow createperview__review-rating">
                <div className="createperview__review-rating-msg">
                  Perview this Product!
                </div>
                <div className="flexrow createperview__review-rating-stars">
                  {this.renderReviewStars(this.state.rating)}
                </div>
              </div>

              <div className="createperview__review-msg">
                Tag it, comment or both!
              </div>
              <textarea className="createperview__review-input" value={this.state.tags} onChange={this.update("tags")} placeholder="#amazing #wow #almostlikeapet">
              </textarea>
              <button className="createperview__review-submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )
    }
  }

  render() {
    console.log(this.props);
    return (
      <ButtonToolbar>
        <button className="createperview__btn" onClick={this.showModal}>
          Create a Perview
        </button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="createperview__modal"
        >
          <Modal.Header className="createperview__modalhead" closeButton>

          <div className="createperview__title">Create a PerView</div>
          <div className="flexcolumn createperview__search-container">
            <div className="createperview__search-msg">Search a product to perview it</div>
            <div className="createperview__search-background">
              <div className="createperview__search-box">
                <SearchItemBar
                  selectItem={this.selectItem}
                  results={this.props.results}
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
