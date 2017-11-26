import "../../../styles/stylesheets/createperviewmodal.css";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import SearchItemBar from "./SearchItemBar";

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
    this.showReviewBox = this.showReviewBox.bind(this);
    this.renderReviewStars = this.renderReviewStars.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemResults !== this.props.itemResults) {
      this.setState({
        itemResults: nextProps.itemResults
      })
    }
  }

  showModal() {
    this.setState({show: true});
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

  renderReviewStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={`star_rating_${ele}`} className={ele <= ratings ? 'active_star' : 'no_star'}
          onClick={() => {this.setState({ rating: ele, lastRating: ele })}}>

          <div className={`createperview__ratingtipbox ${this.state.ratingHover === ele ? 'active' : ''}`}>
            <div className="createperview__ratingtip">{this.state.ratingTip[ele]}</div>
            <div className="createperview__ratingtipbox-triangle"></div>
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

  update (field) {
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

      console.log(submitPerviewObject);
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
                <div className="flexrow createperview__product-details">
                  <div className="createperview__product-price">
                    {this.state.price}
                  </div>
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

              <textarea
                onChange={this.update("tags")}
                className="createperview__review-input"
                value={this.state.tags}
                placeholder="What did you think of this product? #hashtag">
              </textarea>
              <button disabled={this.state.rating < 1} className="createperview__review-submit">
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
    return (
      <ButtonToolbar className="createperview__box">
        <button className="createperview__btn" onClick={this.showModal}>
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
                {this.props.results ?
                  (<SearchItemBar
                    selectItem={this.selectItem}
                    results={this.props.results}
                    fetchResults={this.props.fetchResults}
                  />)
                : (
                  <span></span>
                )
              }
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
