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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          onChange={this.updateInput("solicitTags")}
          value={this.state.solicitTags}
          placeholder="What kind of items do you want your friends to perview? #xmaspresents #babyshower #videogames"
        />

        <button type='submit'>
          Submit
        </button>
      </form>
    )
  }
}
//what is needed to create perview? I need to have rating, so should I have the rating at 0?

export default CreateSolicitForm;
