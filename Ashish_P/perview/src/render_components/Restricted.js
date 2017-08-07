import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
/**
 * Higher-order component (HOC) to wrap restricted pages
 */
function Restricted(BaseComponent) {
    class Authenticate extends React.Component {
      constructor(props) {
        super(props)
      }

      componentWillMount() {
        this.checkAuthentication(this.props);
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.checkAuthentication(nextProps);
        }
      }
      checkAuthentication(params) {
        console.log("check authetncaiton");
        const { history } = params;
        this.props.fetchuser()
          .catch(e => history.replace({ pathname: '/singin' }));
      }
      render() {
        console.log(this.props);
          return (
            <BaseComponent {...this.props} />
          )
      }
    }
    return withRouter(Authenticate);
}

export default Restricted;
