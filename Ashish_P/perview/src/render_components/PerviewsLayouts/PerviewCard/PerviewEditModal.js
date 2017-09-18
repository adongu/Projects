import "../../../styles/stylesheets/PerviewLayouts/PerviewCard/perviewcarddetailmodal.css";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';

class PerviewEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
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

  componentWillMount() {
    if (this.props.item) {
      let item = this.props.item

      this.setState({
        imgUrl: item.data.imageUrls.large.url,
        name: item.data.title,
        price: item.data.lowestNewPrice.formattedAmount,
        itemId: item.id
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id !== this.props.item.id) {
      let item = nextProps.item

      this.setState({
        imgUrl: item.data.imageUrls.large.url,
        name: item.data.title,
        price: item.data.lowestNewPrice.formattedAmount,
        itemId: item.id
      })
    }
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({
      show: false,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      itemId: null,
      tags: '',
      rating: 0,
      lastRating: 0,
      ratingHover: 0,
      // asin: '',
      perviewers: []
    });
  }

  renderReviewStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={`star_rating_${ele}`} className={ele <= ratings ? 'active_star' : 'no_star'}
          onClick={() => {this.setState({ rating: ele, lastRating: ele })}}>

          <div className={`perviewdetailmodal__ratingtipbox ${this.state.ratingHover === ele ? 'active' : ''}`}>
            <div className="perviewdetailmodal__ratingtip">{this.state.ratingTip[ele]}</div>
            <div className="perviewdetailmodal__ratingtipbox-triangle"></div>
          </div>

          <i onMouseOver={()=>{ this.setState({ rating: ele, ratingHover: ele }) }}
            onMouseLeave={()=>{ this.setState({ rating: this.state.lastRating, ratingHover: 0 })}}
            className="fa fa-star perviewdetailmodal__rating-star" aria-hidden="true">
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
      formData.append("itemId", this.state.itemId);
      formData.append("tags", this.state.tags);
      formData.append("rating", this.state.rating);
      // when submit fails prevent review lost
      if(!this.props.editPerview(formData)) {
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
        // if (this.props.history.location.pathname !== '/' ) {
        //   this.props.history.replace({ pathname: '/' });
        // }
      }
    } else {
      // make user go back to signin
      this.props.history.replace({ pathname: '/signin' })
    }
  }

  showReviewBox() {
    return (
      <div className="flexcolumn perviewdetailmodal__product-container">
        <div className="flexrow perviewdetailmodal__product">
          <div className="perviewdetailmodal__product-left">
            <img className="perviewdetailmodal__product-img" src={this.state.imgUrl} alt="product"/>
          </div>
          <div className="perviewdetailmodal__product-right">
            <div className="flextcolumn perviewdetailmodal__product-info">
              <div className="perviewdetailmodal__product-title">
                {this.state.name}
              </div>
              <div className="flexrow perviewdetailmodal__product-details">
                <div className="perviewdetailmodal__product-price">
                  {this.state.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="perviewdetailmodal__review-container">
          <form onSubmit={this.handleSubmit} className="flexcolumn perviewdetailmodal__review-box">
            <div className="flexrow perviewdetailmodal__review-rating">
              <div className="flexrow perviewdetailmodal__review-rating-stars">
                {this.renderReviewStars(this.state.rating)}
              </div>
            </div>

            <textarea
              onChange={this.update("tags")}
              className="perviewdetailmodal__review-input"
              value={this.state.tags}
              placeholder="What did you think of this product? #hashtag">
            </textarea>
            <button disabled={this.state.rating < 1} className="perviewdetailmodal__review-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <ButtonToolbar className="perviewdetailmodal__container">
        <button className="perviewdetailmodal__btn" onClick={this.showModal}>
          <i className="fa fa-pencil narrowperviews__edit-icon" aria-hidden="true"></i>
        </button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="perviewdetailmodal__modal"
        >
          <Modal.Header className="perviewdetailmodal__modalhead" closeButton>

          <div className="perviewdetailmodal__title">
            Edit Perview
          </div>

          <div className="perviewdetailmodal__section">
            { this.showReviewBox() }
          </div>
          </Modal.Header>
        </Modal>
      </ButtonToolbar>
    );
  }
};

export default PerviewEditModal;
