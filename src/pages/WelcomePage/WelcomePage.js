/* @flow */

import React from 'react';
import AppLayout from '../AppLayout';

type Props = {
  location: {
    pathname: string,
  },
};

class WelcomePage extends React.Component {
  props: Props;

  render() {
    return (
      <AppLayout>
        WelcomePage
      </AppLayout>
    );
  }
}

export default WelcomePage;
