/* @flow */

import React from 'react';
import AppLayout from 'pages/AppLayout';
import Style from 'styles';
import Paper from 'material-ui/Paper';

type Props = {
  children?: React.Element<*>,
}

class AccountLayout extends React.Component {
  props: Props
  render() {
    return (
      <AppLayout>
        {
          React.Children.map(this.props.children, child => (
            <div style={styles.formWrapper} >
              <Paper style={styles.paper} zDepth={3} >
                {child}
              </Paper>
            </div>
          ))
        }
      </AppLayout>
    );
  }
}

const styles = {
  formWrapper: {
    width: '700px',
    alignSelf: 'center',
    padding: Style.Dimens.spacing.normal,
  },
  paper: {
    padding: Style.Dimens.spacing.large,
  },
};


export default AccountLayout;
