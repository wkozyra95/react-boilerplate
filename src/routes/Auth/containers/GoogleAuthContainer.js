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
        style={styles.button}
      />
    );
  }
}

const styles = {
  button: {
    width: '100%',
    display: 'inline-block',
    background: 'rgb(209, 72, 54)',
    color: 'rgb(255, 255, 255)',
    marginTop: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '2px',
    border: '1px solid transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: loginData => dispatch(actionCreator.googleLogin(loginData)),
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(GoogleAuthContainer);
