import React from "react";

class CreateSolicitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: 77,
      rating: 0,
      solicitTags: ''
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(field) {
    return (e) => {
      return this.setState({
        [field]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.currentUser) {
      let formData = new FormData();
      let submitPerviewObject = {
        'isSolicit': true
      };

      formData.append("itemId", this.state.itemId);
      formData.append("rating", this.state.rating);
      formData.append("tags", this.state.solicitTags);

      submitPerviewObject.formData = formData;

      if (this.props.createPerview(submitPerviewObject)) {
        this.setState({
          rating: 0,
          solicitTags: ''
        });
      }
    } else {
      this.props.history.replace({
        pathname: '/signin'
      });
    }
  }

  renderSolicitSuggestionTagsBar () {
    
  }

  renderSolicitSuggestionTags () {

  }

  render() {
    return (
      <div>
        <form
          className="solicithero"
          onSubmit={this.handleSubmit}
        >
          <label className="solicithero__label" for="solicit__tags">
            What kind of items do you want your friends to perview?
          </label>

          <textarea
            name="solicit__tags"
            className="solicithero__input"
            onChange={this.updateInput("solicitTags")}
            value={this.state.solicitTags}
            placeholder="Enter tags e.g. #xmaspresents #babyshower #videogames"
          />

          <button
            className="solicithero__submit"
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}
//what is needed to create perview? I need to have rating, so should I have the rating at 0?

export default CreateSolicitForm;
