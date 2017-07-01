/* @flow */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class BottomNotification extends React.Component {
  static elementRef: ?BottomNotification = null;
  static showNotification: Function;
  state: {
    open: bool,
    message: string,
  } = {
    open: false,
    message: '',
  }

  componentWillMount() {
    BottomNotification.elementRef = this;
  }

  componentWillUnmount() {
    BottomNotification.elementRef = null;
  }

  handleRequestClose = () => this.setState({ open: false });
  showNotifiation = (msg: string) => this.setState({ open: true, message: msg });

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.state.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

BottomNotification.showNotification = showNotification;

export function showNotification(message: string) {
  if (BottomNotification.elementRef) {
    BottomNotification.elementRef.showNotifiation(message);
  }
}

export default BottomNotification;
