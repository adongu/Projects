import "../../styles/stylesheets/createperviewmodal.css";
import product from "../../styles/assets/product.jpg";
import React from 'react';
import { ButtonToolbar, Modal } from 'react-bootstrap';
import ItemSearchBarContainer from "../../containers/ItemSearchBarContainer.js";

class CreatePerview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      chosen: false,
      keywords: '',
      imgUrl: '',
      name: '',
      price: '',
      asin: '',
      perviewers: [],
      rating: 0
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showReviewBox = this.showReviewBox.bind(this);
    this.renderStars = this.renderStars.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.asin !== this.state.asin) {

    }
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  renderStars (ratings) {
    let stars = [1, 2, 3, 4, 5];
    return stars.map((ele)=>{
      return (
        <span key={ele} className={ele <= ratings ? 'active_star' : 'no_star'} >
          <i className="fa fa-star createperview__rating-star" aria-hidden="true"></i>
        </span>
      )
    })
  }

  selectItem( imgUrl, name, price, asin ) {
    if (asin) {
      this.setState({
        imgUrl: imgUrl,
        name: name,
        price: price,
        asin: asin,
        chosen: true
      })
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
                  {this.renderStars(3)}
                </div>
              </div>

              <div className="createperview__review-msg">
                Tag it, comment or both!
              </div>
              <textarea className="createperview__review-input" placeholder="#amazing #wow #almostlikeapet">
              </textarea>
              <button className="createperview__review-submit">
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

export default CreatePerview;
