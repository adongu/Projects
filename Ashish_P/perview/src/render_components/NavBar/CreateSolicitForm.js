import React from "react";

class CreateSolicitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      itemId: 77,
      rating: 0,
      SolicitTagsSuggestion: [
        {
          'title': '#xmaspresents', value: '#xmaspresents'
        },
        {
          'title': '#babyshower', value: '#babyshower'
        },
        {
          'title': '#xmaspresents', value: '#xmaspresents'
        },
        {
          'title': '#videogames', value: '#videogames'
        },
      ],
      solicitTags: ''
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectTagSuggestion = this.selectTagSuggestion.bind(this);
    this.renderSolicitTagSuggestionsBar = this.renderSolicitTagSuggestionsBar.bind(this);
    this.renderSolicitTagSuggestions = this.renderSolicitTagSuggestions.bind(this);
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

  selectTagSuggestion (tagSuggestion) {
    return (previousState, currentProps) => {
      if (this.state.SolicitTagsSuggestion && !this.state.solicitTags) {
        let newTags;
        if (this.state.solicitTags) {
          newTags = previousState.solicitTags + tagSuggestion;
        } else {
          newTags = previousState.solicitTags + '' + tagSuggestion;
        }

        return {
          ...previousState,
          solicitTags: newTags
        }
      }
    }
  }

  renderSolicitTagSuggestionsBar () {
    if (!this.state.solicitTags) {
      return (
        <div>
          {this.state.SolicitTagsSuggestion.map((suggestion, i) => {
            return (
              <span
                onClick={() => this.setState(this.selectTagSuggestion(suggestion.value))}
                key={`SolicitTagSuggestion-${i}`}
              >
                {suggestion.title}
              </span>
            )
          })}
        </div>
      )
    }
  }

  renderSolicitTagSuggestions () {

  }

  render() {
    return (
      <div>
        <form
          className="solicithero"
          onSubmit={this.handleSubmit}
        >
          <label className="solicithero__label" htmlFor="solicit__tags">
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

        <div>
          {this.renderSolicitTagSuggestionsBar()}
        </div>
      </div>
    )
  }
}
//what is needed to create perview? I need to have rating, so should I have the rating at 0?

export default CreateSolicitForm;
