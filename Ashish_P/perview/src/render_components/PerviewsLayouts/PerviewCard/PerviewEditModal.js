import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/pervieweditmodal.css";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
// import {
//  renderMoreInfoPopover
// } from '../../SharedComponents/PricePopOver';

class PerviewEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      show: false,
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
    this.showReviewBox = this.showReviewBox.bind(this);
    this.renderReviewStars = this.renderReviewStars.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.item.data) {
      let item = this.props.item
      let perview = this.props.perview

      this.setState({
        id: perview.id,
        imgUrl: item.data.imageUrls.large.url,
        name: item.data.title,
        price: item.data.listPrice.formattedAmount,
        itemId: item.id
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item && nextProps.item.id !== this.state.itemId) {
      let item = nextProps.item
      let perview = this.props.perview

      if (item.data) {
        this.setState({
          id: perview.id,
          imgUrl: item.data.imageUrls.large.url,
          name: item.data.title,
          price: item.data.listPrice.formattedAmount,
          itemId: item.id
        })
      }
    }
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({
      id: null,
      show: false,
      keywords: '',
      // imgUrl: '',
      // name: '',
      // price: '',
      // itemId: null,
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

          <div className={`pervieweditmodal__ratingtipbox ${this.state.ratingHover === ele ? 'active' : ''}`}>
            <div className="pervieweditmodal__ratingtip">{this.state.ratingTip[ele]}</div>
            <div className="pervieweditmodal__ratingtipbox-triangle"></div>
          </div>

          <i onMouseOver={()=>{ this.setState({ rating: ele, ratingHover: ele }) }}
            onMouseLeave={()=>{ this.setState({ rating: this.state.lastRating, ratingHover: 0 })}}
            className="fa fa-star pervieweditmodal__rating-star" aria-hidden="true">
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
        itemId: item.id
      })
    })
  }

  update (field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.props.currentUserId){
      let formData = new FormData();
      formData.append("id", this.state.id);
      formData.append("itemId", this.state.itemId);
      formData.append("tags", this.state.tags);
      formData.append("rating", this.state.rating);
      // when submit fails prevent review lost
      if(!this.props.editPerview(formData)) {
        this.setState({
          id: this.state.id,
          itemId: this.state.itemID,
          tags: this.state.tags,
          rating: this.state.rating
        })
      } else {
        this.setState({
          id: null,
          itemId: null,
          tags: '',
          rating: 0

        })
        this.hideModal();
      }
    } else {
      // make user go back to signin
      this.props.history.replace({ pathname: '/signin' })
    }
  }

  showReviewBox() {
    return (
      <div className="flexcolumn pervieweditmodal__product-container">
        <div className="flexrow pervieweditmodal__product">
          <div className="pervieweditmodal__product-left">
            <img className="pervieweditmodal__product-img" src={this.state.imgUrl} alt="product"/>
          </div>
          <div className="pervieweditmodal__product-right">
            <div className="flextcolumn pervieweditmodal__product-info">
              <div className="pervieweditmodal__product-title">
                {this.state.name}
              </div>
              <div className="flexcolumn pervieweditmodal__product-edits">
                <div className="pervieweditmodal__product-price">
                  {this.state.price}
                </div>

                {/* {renderMoreInfoPopover()} */}
              </div>
            </div>
          </div>
        </div>

        <div className="pervieweditmodal__review-container">
          <form onSubmit={this.handleSubmit} className="flexcolumn pervieweditmodal__review-box">
            <div className="flexrow pervieweditmodal__review-rating">
              <div className="flexrow pervieweditmodal__review-rating-stars">
                {this.renderReviewStars(this.state.rating)}
              </div>
            </div>

            <span className="pervieweditmodal__needrating">
              {
                this.state.lastRating < 1
                ? 'Please select a rating between 1 and 5 before submitting :)'
                : ''
              }
            </span>

            <textarea
              onChange={this.update("tags")}
              className="pervieweditmodal__review-input"
              value={this.state.tags}
              placeholder="What did you think of this product? #hashtag">
            </textarea>

            <button disabled={this.state.lastRating < 1} className="pervieweditmodal__review-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <ButtonToolbar className="pervieweditmodal__container">
        <span className="pervieweditmodal__btn" onClick={this.showModal}>
          <i className="fa fa-pencil pervieweditmodal__edit-icon" aria-hidden="true"></i>
        </span>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="pervieweditmodal__modal"
        >
          <Modal.Header className="pervieweditmodal__header" closeButton>
            <div className="pervieweditmodal__title">
              <i className="fa fa-pencil pervieweditmodal__edit-icon" aria-hidden="true"></i>
              <span>Edit Perview</span>
            </div>
          </Modal.Header>

          <Modal.Body className="pervieweditmodal__body">
            <div className="pervieweditmodal__section">
              { this.showReviewBox() }
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default PerviewEditModal;
