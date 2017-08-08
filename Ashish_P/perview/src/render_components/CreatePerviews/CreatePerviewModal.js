import "../../styles/stylesheets/createperviewmodal.css";
import product from "../../styles/assets/product.jpg";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import ItemSearchBarContainer from "../../containers/ItemSearchBarContainer.js";

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
      // asin: '',
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.state.id) {

    }
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  renderReviewStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={ele} className={ele <= ratings ? 'active_star' : 'no_star'} onClick={() => {this.setState({ rating: ele })}}
        onMouseMove={()=>{ this.setState({ rating: ele }) }}
        onMouseLeave={()=>{ this.setState({ rating: this.state.rating })}}>
        <i className="fa fa-star createperview__rating-star" aria-hidden="true"></i>
        </span>
      )
    })
  }

  selectItem( imgUrl, name, price, itemId ) {
    if (itemId) {
      this.setState({
        imgUrl: imgUrl,
        name: name,
        price: price,
        itemId: itemId,
        // asin: asin,
        chosen: true
      })
    }
  }

  update (field) {
    console.log(this.state.tags);
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.props.currentUser){
      let formData = new FormData();
      formData.append("perview[itemID]", this.state.itemId);
      formData.append("perview[tags]", this.state.tags);
      formData.append("perview[rating]", this.state.rating);
      // when submit fails prevent review lost
      if(!this.props.createPeview(formData)) {
        this.setState({
          itemID: this.state.itemID,
          tags: this.state.tags,
          rating: this.state.rating
        })
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
                <div className="createperview__review-rating-stars">
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
                <ItemSearchBarContainer selectItem={this.selectItem}/>
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
