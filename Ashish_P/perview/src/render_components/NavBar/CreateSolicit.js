import React from "react";

class CreateSolicitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      solicitTags: ""
    }
  }

  handleSubmt(e) {
    if (this.props.currentUser) {
      let formData = new FormData();
      let submitData = { 'data': null, isSolicit: true };

      formData.append("tags", this.state.solicitTags);

      submitData.data =

      if (!this.props.createPerview(submitData)) {

      }
    }
  }

}
