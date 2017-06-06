/* @flow */

import React from 'react';
import AccountLayout from '../components/AccountLayout';
import ProfileEditorContainer from './ProfileEditorContainer';
import ChangePassEditorContainer from './ChangePassEditorContainer';

class AccountContainer extends React.Component {
  state: {
    username: string,
    email: string,
  } = {
    username: '',
    email: '',
  }

  render() {
    return (
      <AccountLayout>
        <ProfileEditorContainer />
        <ChangePassEditorContainer />
      </AccountLayout>
    );
  }
}

export default AccountContainer;
