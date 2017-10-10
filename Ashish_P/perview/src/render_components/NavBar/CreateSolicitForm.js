import React from "react";

class CreateSolicitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    debugger

    if (this.props.currentUser) {
      let formData = new FormData();
      let submitData = {
        data: null,
        isSolicit: true
      };

      formData.append("rating", this.state.rating);
      formData.append("tags", this.state.solicitTags);

      submitData.data = formData;

      if (this.props.createPerview(submitData)) {
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
