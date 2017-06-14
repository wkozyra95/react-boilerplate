/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { actionCreator } from '../reducer';


class GoogleAuthContainer extends React.Component {
  props: {
    onLogin: (loginData: mixed) => void,
  }

  render() {
    return (
      <GoogleLogin
        clientId="811801298924-8mg2j86274gmc47ppu35jo37aaqcvnie.apps.googleusercontent.com"
        onSuccess={this.props.onLogin}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: loginData => dispatch(actionCreator.googleLogin(loginData)),
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(GoogleAuthContainer);
