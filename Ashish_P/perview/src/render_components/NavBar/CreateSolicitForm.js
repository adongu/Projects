import React from "react";

class CreateSolicitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      solicitTags: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.currentUser) {
      let formData = new FormData();
      let submitData = { 'data': null, isSolicit: true };

      formData.append("tags", this.state.solicitTags);

      submitData.data = formData;

      // if (!this.props.createPerview(submitData)) {
      //
      // }
    }
  }

  render() {
    return (
      <form action={this.handleSubmit}>
        <textarea
          placeholder="What kind of items do you want your friends to perview? #chrismas presents #babyshower #wedding #videogames"
        />

        <button>
          Submit
        </button>
      </form>
    )
  }
}

export default CreateSolicitForm;
